"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowService = void 0;
const fcl = __importStar(require("@onflow/fcl"));
const elliptic_1 = require("elliptic");
const sha3_1 = require("sha3");
const ec = new elliptic_1.ec("p256");
class FlowService {
    constructor(minterFlowAddress, minterPrivateKeyHex, minterAccountIndex) {
        this.minterFlowAddress = minterFlowAddress;
        this.minterPrivateKeyHex = minterPrivateKeyHex;
        this.minterAccountIndex = minterAccountIndex;
        this.authorizeMinter = () => {
            return (account = {}) => __awaiter(this, void 0, void 0, function* () {
                const user = yield this.getAccount(this.minterFlowAddress);
                const key = user.keys[this.minterAccountIndex];
                const sign = this.signWithKey;
                const pk = this.minterPrivateKeyHex;
                return Object.assign(Object.assign({}, account), { tempId: `${user.address}-${key.index}`, addr: fcl.sansPrefix(user.address), keyId: Number(key.index), signingFunction: (signable) => {
                        return {
                            addr: fcl.withPrefix(user.address),
                            keyId: Number(key.index),
                            signature: sign(pk, signable.message),
                        };
                    } });
            });
        };
        this.getAccount = (addr) => __awaiter(this, void 0, void 0, function* () {
            const { account } = yield fcl.send([fcl.getAccount(addr)]);
            return account;
        });
        this.signWithKey = (privateKey, msg) => {
            const key = ec.keyFromPrivate(Buffer.from(privateKey, "hex"));
            const sig = key.sign(this.hashMsg(msg));
            const n = 32;
            const r = sig.r.toArrayLike(Buffer, "be", n);
            const s = sig.s.toArrayLike(Buffer, "be", n);
            return Buffer.concat([r, s]).toString("hex");
        };
        this.hashMsg = (msg) => {
            const sha = new sha3_1.SHA3(256);
            sha.update(Buffer.from(msg, "hex"));
            return sha.digest();
        };
        this.sendTx = ({ transaction, args, proposer, authorizations, payer, }) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fcl.send([
                fcl.transaction `
        ${transaction}
      `,
                fcl.args(args),
                fcl.proposer(proposer),
                fcl.authorizations(authorizations),
                fcl.payer(payer),
                fcl.limit(9999),
            ]);
            return yield fcl.tx(response).onceSealed();
        });
    }
    executeScript({ script, args }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fcl.send([fcl.script `${script}`, fcl.args(args)]);
            return yield fcl.decode(response);
        });
    }
    getLatestBlockHeight() {
        return __awaiter(this, void 0, void 0, function* () {
            const block = yield fcl.send([fcl.getBlock(true)]);
            const decoded = yield fcl.decode(block);
            return decoded.height;
        });
    }
}
exports.FlowService = FlowService;
