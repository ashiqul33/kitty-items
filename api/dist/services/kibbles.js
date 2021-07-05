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
exports.KibblesService = void 0;
const t = __importStar(require("@onflow/types"));
const fcl = __importStar(require("@onflow/fcl"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const fungibleTokenPath = '"../../contracts/FungibleToken.cdc"';
const kibblePath = '"../../contracts/Kibble.cdc"';
class KibblesService {
    constructor(flowService, fungibleTokenAddress, kibbleAddress) {
        this.flowService = flowService;
        this.fungibleTokenAddress = fungibleTokenAddress;
        this.kibbleAddress = kibbleAddress;
        this.setupAccount = () => __awaiter(this, void 0, void 0, function* () {
            const authorization = this.flowService.authorizeMinter();
            const transaction = fs
                .readFileSync(path.join(__dirname, "../../../cadence/transactions/kibble/setup_account.cdc"), "utf8")
                .replace(fungibleTokenPath, fcl.withPrefix(this.fungibleTokenAddress))
                .replace(kibblePath, fcl.withPrefix(this.kibbleAddress));
            return this.flowService.sendTx({
                transaction,
                args: [],
                authorizations: [authorization],
                payer: authorization,
                proposer: authorization,
            });
        });
        this.mint = (recipient, amount) => __awaiter(this, void 0, void 0, function* () {
            const authorization = this.flowService.authorizeMinter();
            const transaction = fs
                .readFileSync(path.join(__dirname, "../../../cadence/transactions/kibble/mint_tokens.cdc"), "utf8")
                .replace(fungibleTokenPath, fcl.withPrefix(this.fungibleTokenAddress))
                .replace(kibblePath, fcl.withPrefix(this.kibbleAddress));
            return this.flowService.sendTx({
                transaction,
                args: [
                    fcl.arg(recipient, t.Address),
                    fcl.arg(amount.toFixed(8).toString(), t.UFix64),
                ],
                authorizations: [authorization],
                payer: authorization,
                proposer: authorization,
            });
        });
        this.burn = (amount) => __awaiter(this, void 0, void 0, function* () {
            const authorization = this.flowService.authorizeMinter();
            const transaction = fs
                .readFileSync(path.join(__dirname, "../../../cadence/transactions/kibble/burn_tokens.cdc"), "utf8")
                .replace(fungibleTokenPath, fcl.withPrefix(this.fungibleTokenAddress))
                .replace(kibblePath, fcl.withPrefix(this.kibbleAddress));
            return this.flowService.sendTx({
                transaction,
                args: [fcl.arg(amount.toFixed(8).toString(), t.UFix64)],
                authorizations: [authorization],
                payer: authorization,
                proposer: authorization,
            });
        });
        this.transfer = (recipient, amount) => __awaiter(this, void 0, void 0, function* () {
            const authorization = this.flowService.authorizeMinter();
            const transaction = fs
                .readFileSync(path.join(__dirname, "../../../cadence/transactions/kibble/burn_tokens.cdc"), "utf8")
                .replace(fungibleTokenPath, fcl.withPrefix(this.fungibleTokenAddress))
                .replace(kibblePath, fcl.withPrefix(this.kibbleAddress));
            return this.flowService.sendTx({
                transaction,
                args: [
                    fcl.arg(amount.toFixed(8).toString(), t.UFix64),
                    fcl.arg(recipient, t.Address),
                ],
                authorizations: [authorization],
                payer: authorization,
                proposer: authorization,
            });
        });
        this.getBalance = (account) => __awaiter(this, void 0, void 0, function* () {
            const script = fs
                .readFileSync(path.join(__dirname, "../../../cadence/scripts/kibble/get_balance.cdc"), "utf8")
                .replace(fungibleTokenPath, fcl.withPrefix(this.fungibleTokenAddress))
                .replace(kibblePath, fcl.withPrefix(this.kibbleAddress));
            return this.flowService.executeScript({
                script,
                args: [fcl.arg(account, t.Address)],
            });
        });
        this.getSupply = () => __awaiter(this, void 0, void 0, function* () {
            const script = fs
                .readFileSync(path.join(__dirname, "../../../cadence/scripts/kibble/get_supply.cdc"), "utf8")
                .replace(fungibleTokenPath, fcl.withPrefix(this.fungibleTokenAddress))
                .replace(kibblePath, fcl.withPrefix(this.kibbleAddress));
            return this.flowService.executeScript({ script, args: [] });
        });
    }
}
exports.KibblesService = KibblesService;
