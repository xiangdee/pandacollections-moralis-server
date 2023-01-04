"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyGenerator = void 0;
const moralis_1 = __importDefault(require("moralis"));
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const errorHandler_1 = require("../middlewares/errorHandler");
const common_sol_utils_1 = require("moralis/common-sol-utils");
const common_evm_utils_1 = require("moralis/common-evm-utils");
const api_utils_1 = require("@moralisweb3/api-utils");
const proxyRouter = express_1.default.Router();
class ProxyGenerator {
    constructor(api, options) {
        this.options = options;
        this.api = api;
    }
    getRouter() {
        let descriptors;
        let baseUrl;
        switch (this.api) {
            case 'evm':
                descriptors = common_evm_utils_1.operations.map(api_utils_1.convertOperationToDescriptor);
                baseUrl = moralis_1.default.EvmApi.baseUrl;
                break;
            case 'solana':
                descriptors = common_sol_utils_1.operations.map(api_utils_1.convertOperationToDescriptor);
                baseUrl = moralis_1.default.SolApi.baseUrl;
                break;
            default:
                throw new Error('invalid api');
        }
        for (const descriptor of descriptors) {
            const urlPattern = descriptor.urlPattern.replace(/\{/g, ':').replace(/\}/g, '');
            proxyRouter.route(urlPattern)[descriptor.method](async (req, res, next) => {
                let url = descriptor.urlPattern;
                for (const param in req.params) {
                    if (Object.prototype.hasOwnProperty.call(req.params, param)) {
                        url = url.replace(`{${param}}`, req.params[param]);
                    }
                }
                const body = Object.keys(req.body).reduce((result, key) => {
                    if (descriptor.bodyParamNames.includes(key)) {
                        return Object.assign(Object.assign({}, result), { [key]: req.body[key] });
                    }
                    return result;
                }, {});
                const params = Object.keys(req.body).reduce((result, key) => {
                    if (!req.body[key] || key in body || descriptor.urlPatternParamNames.includes(key)) {
                        return result;
                    }
                    return Object.assign(Object.assign({}, result), { [key]: req.body[key] });
                }, {});
                try {
                    const response = await axios_1.default.request({
                        method: descriptor.method,
                        params: Object.assign(Object.assign({}, params), req.query),
                        url: `${baseUrl}${url}`,
                        data: body,
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': this.options.apiKey,
                        },
                    });
                    return res.send(response.data);
                }
                catch (error) {
                    return (0, errorHandler_1.errorHandler)(error, req, res, next);
                }
            });
        }
        return proxyRouter;
    }
}
exports.ProxyGenerator = ProxyGenerator;
//# sourceMappingURL=proxyGenerator.js.map