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
function initKibblesRouter(kibblesService) {
    const router = express_1.default.Router();
    router.post("/kibbles/mint", [express_validator_1.body("recipient").exists(), express_validator_1.body("amount").isDecimal()], validate_request_1.validateRequest, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { recipient, amount } = req.body;
        const transaction = yield kibblesService.mint(recipient, amount);
        return res.send({
            transaction,
        });
    }));
    router.post("/kibbles/setup", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const transaction = yield kibblesService.setupAccount();
        return res.send({
            transaction,
        });
    }));
    router.post("/kibbles/burn", [
        express_validator_1.body("amount").isInt({
            gt: 0,
        }),
    ], validate_request_1.validateRequest, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { amount } = req.body;
        const transaction = yield kibblesService.burn(amount);
        return res.send({
            transaction,
        });
    }));
    router.post("/kibbles/transfer", [
        express_validator_1.body("recipient").exists(),
        express_validator_1.body("amount").isInt({
            gt: 0,
        }),
    ], validate_request_1.validateRequest, (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { recipient, amount } = req.body;
        const transaction = yield kibblesService.transfer(recipient, amount);
        return res.send({
            transaction,
        });
    }));
    router.get("/kibbles/balance/:account", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const balance = yield kibblesService.getBalance(req.params.account);
        return res.send({
            balance,
        });
    }));
    router.get("/kibbles/supply", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const supply = yield kibblesService.getSupply();
        return res.send({
            supply,
        });
    }));
    return router;
}
exports.default = initKibblesRouter;
