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
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.raw('create extension if not exists "uuid-ossp"');
        yield knex.schema.createTable("block_cursor", (table) => __awaiter(this, void 0, void 0, function* () {
            table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.text("flow_event_name").unique().notNullable();
            table.bigInteger("current_block_height");
            table.timestamps(true, true);
        }));
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable("block_cursor");
        yield knex.raw('drop extension if exists "uuid-ossp"');
    });
}
exports.down = down;
