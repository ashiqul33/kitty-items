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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCursorService = void 0;
const block_cursor_1 = require("../models/block-cursor");
class BlockCursorService {
    findOrCreateLatestBlockCursor(latestBlockHeight, eventName) {
        return __awaiter(this, void 0, void 0, function* () {
            let blockCursor = yield block_cursor_1.BlockCursor.query().findOne({
                event_name: eventName,
            });
            if (!blockCursor) {
                blockCursor = yield block_cursor_1.BlockCursor.query().insertAndFetch({
                    event_name: eventName,
                    current_block_height: latestBlockHeight,
                });
            }
            return blockCursor;
        });
    }
    updateBlockCursorById(id, currentBlockHeight) {
        return __awaiter(this, void 0, void 0, function* () {
            return block_cursor_1.BlockCursor.query().updateAndFetchById(id, {
                current_block_height: currentBlockHeight,
            });
        });
    }
}
exports.BlockCursorService = BlockCursorService;
