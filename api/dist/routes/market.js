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
function initMarketRouter(marketService) {
    const router = express_1.default.Router();
    router.post("/market/buy", [express_validator_1.body("account").exists(), express_validator_1.body("itemID").isInt()], validate_request_1.validateRequest, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { account, itemID } = req.body;
        const tx = yield marketService.buy(account, itemID);
        return res.send({
            transactionId: tx,
        });
    }));
    router.post("/market/setup", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const tx = yield marketService.setupAccount();
        return res.send({
            transactionId: tx,
        });
    }));
    router.post("/market/sell", [express_validator_1.body("itemID").isInt(), express_validator_1.body("price").isDecimal()], validate_request_1.validateRequest, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { itemID, price } = req.body;
        const tx = yield marketService.sell(itemID, price);
        return res.send({
            transactionId: tx,
        });
    }));
    router.get("/market/collection/:account", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const items = yield marketService.getItems(req.params.account);
        return res.send({
            items,
        });
    }));
    router.get("/market/collection/:account/:item", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const item = yield marketService.getItem(req.params.account, parseInt(req.params.item));
        return res.send({
            item,
        });
    }));
    router.get("/market/latest", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const latestSaleOffers = yield marketService.findMostRecentSales();
        return res.send({
            latestSaleOffers,
        });
    }));
    return router;
}
exports.default = initMarketRouter;
