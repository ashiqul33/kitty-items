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
require("express-async-errors");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const kibbles_1 = __importDefault(require("./routes/kibbles"));
const kitty_items_1 = __importDefault(require("./routes/kitty-items"));
const market_1 = __importDefault(require("./routes/market"));
const V1 = "/v1/";
// Init all routes, setup middlewares and dependencies
const initApp = (kibblesService, kittyItemsService, marketService) => {
    const app = express_1.default();
    // @ts-ignore
    app.use(cors_1.default());
    app.use(body_parser_1.json());
    app.use(body_parser_1.urlencoded({ extended: false }));
    app.use(V1, kibbles_1.default(kibblesService));
    app.use(V1, kitty_items_1.default(kittyItemsService));
    app.use(V1, market_1.default(marketService));
    const serveReactApp = () => {
        app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../web/build")));
        app.get("*", function (req, res) {
            res.sendFile(path_1.default.resolve(__dirname, "../../web/build/index.html"));
        });
    };
    if (process.env.IS_HEROKU) {
        // Serve React static site using Express when deployed to Heroku.
        serveReactApp();
    }
    app.all("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.sendStatus(404);
    }));
    return app;
};
exports.default = initApp;