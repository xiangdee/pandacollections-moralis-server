"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const envalid_1 = require("envalid");
dotenv.config();
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.num)(),
    MORALIS_API_KEY: (0, envalid_1.str)(),
    DATABASE_URI: (0, envalid_1.str)(),
    CLOUD_PATH: (0, envalid_1.str)(),
    APP_NAME: (0, envalid_1.str)(),
    SERVER_ENDPOINT: (0, envalid_1.str)(),
    MASTER_KEY: (0, envalid_1.str)(),
    APPLICATION_ID: (0, envalid_1.str)(),
    SERVER_URL: (0, envalid_1.str)(),
    ALLOW_INSECURE_HTTP: (0, envalid_1.bool)({ default: false }),
});
//# sourceMappingURL=config.js.map