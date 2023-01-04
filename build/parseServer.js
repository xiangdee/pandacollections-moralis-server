"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseServer = void 0;
// @ts-ignore
const parse_server_1 = require("parse-server");
const config_1 = __importDefault(require("./config"));
const MoralisAuthAdapter_1 = __importDefault(require("./auth/MoralisAuthAdapter"));
exports.parseServer = new parse_server_1.ParseServer({
    databaseURI: config_1.default.DATABASE_URI,
    cloud: config_1.default.CLOUD_PATH,
    appId: config_1.default.APPLICATION_ID,
    masterKey: config_1.default.MASTER_KEY,
    serverURL: config_1.default.SERVER_URL,
    auth: {
        moralis: {
            module: MoralisAuthAdapter_1.default,
        },
    },
});
//# sourceMappingURL=parseServer.js.map