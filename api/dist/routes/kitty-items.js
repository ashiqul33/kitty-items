"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middlewares/validate-request");
function initKittyItemsRouter(kittyItemsService) {
    const router = express_1.default.Router();
    router.post("/kitty-items/mint", [express_validator_1.body("recipient").exists(), express_validator_1.body("typeID").isInt()], validate_request_1.validateRequest, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { recipient, typeID } = req.body;
        const tx = yield kittyItemsService.mint(recipient, typeID);
        return res.send({
            transaction: tx,
        });
    }));
    router.post("/kitty-items/setup", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const transaction = yield kittyItemsService.setupAccount();
        return res.send({
            transaction,
        });
    }));
    router.post("/kitty-items/transfer", [express_validator_1.body("recipient").exists(), express_validator_1.body("itemID").isInt()], validate_request_1.validateRequest, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { recipient, itemID } = req.body;
        const tx = yield kittyItemsService.transfer(recipient, itemID);
        return res.send({
            transaction: tx,
        });
    }));
    router.get("/kitty-items/collection/:account", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const collection = yield kittyItemsService.getCollectionIds(req.params.account);
        return res.send({
            collection,
        });
    }));
    router.get("/kitty-items/item/:itemID", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const item = yield kittyItemsService.getKittyItemType(parseInt(req.params.itemID));
        return res.send({
            item,
        });
    }));
    router.get("/kitty-items/supply", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const supply = yield kittyItemsService.getSupply();
        return res.send({
            supply,
        });
    }));
    return router;
}
exports.default = initKittyItemsRouter;
