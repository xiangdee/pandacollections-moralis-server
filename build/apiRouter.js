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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const proxyGenerator_1 = require("./api/proxyGenerator");
const authRouter_1 = require("./auth/authRouter");
const config_1 = __importDefault(require("./config"));
const express_rate_limit_1 = __importStar(require("express-rate-limit"));
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    store: new express_rate_limit_1.MemoryStore(),
});
const evmProxyRouter = new proxyGenerator_1.ProxyGenerator('evm', {
    apiKey: config_1.default.MORALIS_API_KEY,
});
const solanaProxyRouter = new proxyGenerator_1.ProxyGenerator('solana', {
    apiKey: config_1.default.MORALIS_API_KEY,
});
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use('/auth', authRouter_1.authRouter);
exports.apiRouter.use('/evm-api-proxy', apiLimiter, evmProxyRouter.getRouter());
exports.apiRouter.use('/solana-api-proxy', apiLimiter, solanaProxyRouter.getRouter());
//# sourceMappingURL=apiRouter.js.map