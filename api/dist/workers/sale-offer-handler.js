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
exports.SaleOfferHandler = void 0;
const fcl = __importStar(require("@onflow/fcl"));
const base_event_handler_1 = require("./base-event-handler");
class SaleOfferHandler extends base_event_handler_1.BaseEventHandler {
    constructor(marketService, blockCursorService, flowService) {
        super(blockCursorService, flowService, []);
        this.marketService = marketService;
        this.eventCollectionInsertedSaleOffer = `A.${fcl.sansPrefix(marketService.marketAddress)}.KittyItemsMarket.CollectionInsertedSaleOffer`;
        this.eventCollectionRemovedSaleOffer = `A.${fcl.sansPrefix(marketService.marketAddress)}.KittyItemsMarket.CollectionRemovedSaleOffer`;
        this.eventNames = [
            this.eventCollectionInsertedSaleOffer,
            this.eventCollectionRemovedSaleOffer,
        ];
    }
    onEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (event.type) {
                case this.eventCollectionInsertedSaleOffer:
                    yield this.marketService.addSaleOffer(event);
                    break;
                case this.eventCollectionRemovedSaleOffer:
                    yield this.marketService.removeSaleOffer(event);
                    break;
                default:
                    return;
            }
        });
    }
}
exports.SaleOfferHandler = SaleOfferHandler;
