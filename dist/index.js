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
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const openapispec_1 = require("./openapispec");
const cors = require('cors');
const { connect } = require('./db/connection');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
const port = 4005;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(express_1.default.json());
        app.get("/api", (req, res) => {
            res.status(200).json("hello message");
        });
        app.use('/user', require('./routes/userRoutes'));
        app.use('/account', require('./routes/acountRoutes'));
        app.use('/payment', require('./routes/paymentRoutes'));
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
        app.use('/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapispec_1.openApi));
    });
}
main();
connect();
