"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDashboard = void 0;
// @ts-ignore
const parse_dashboard_1 = __importDefault(require("parse-dashboard"));
const config_1 = __importDefault(require("./config"));
exports.parseDashboard = new parse_dashboard_1.default({
    apps: [
        {
            appId: config_1.default.APPLICATION_ID,
            masterKey: config_1.default.MASTER_KEY,
            serverURL: config_1.default.SERVER_URL,
            appName: config_1.default.APP_NAME,
        },
    ],
}, config_1.default.ALLOW_INSECURE_HTTP);
//# sourceMappingURL=parseDashboard.js.map