"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const common_core_1 = require("@moralisweb3/common-core");
const axios_1 = require("axios");
const makeMoralisErrorMessage = (error) => {
    var _a, _b;
    let message = error.message || 'Unknown error';
    const errorResponse = (_a = error.details) === null || _a === void 0 ? void 0 : _a.response;
    const errorResponseData = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof errorResponse === 'object' ? ((_b = error.details) === null || _b === void 0 ? void 0 : _b.response).data : null;
    if (errorResponseData) {
        // Handle MoralisError
        if (errorResponseData && (errorResponseData === null || errorResponseData === void 0 ? void 0 : errorResponseData.message)) {
            message = `${(errorResponseData === null || errorResponseData === void 0 ? void 0 : errorResponseData.name) ? `${errorResponseData.name}: ` : ''}${errorResponseData.message}`;
        }
        else if (errorResponseData.error) {
            // Handle ParseError
            message = errorResponseData.error;
        }
    }
    return message;
};
function errorHandler(error, req, res, _next) {
    var _a, _b, _c, _d, _e, _f, _g;
    // eslint-disable-next-line no-console
    console.error('ErrorHandler', error);
    if ((0, common_core_1.isMoralisError)(error)) {
        const status = typeof ((_a = error.details) === null || _a === void 0 ? void 0 : _a.status) === 'number' ? (_b = error.details) === null || _b === void 0 ? void 0 : _b.status : 500;
        const errorMessage = makeMoralisErrorMessage(error);
        res.status(status).json({ error: errorMessage });
    }
    else if ((0, axios_1.isAxiosError)(error)) {
        res.status(((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500).json({
            data: ((_d = error.response) === null || _d === void 0 ? void 0 : _d.data) || 'Unknown error',
            method: (_f = (_e = error.config) === null || _e === void 0 ? void 0 : _e.method) === null || _f === void 0 ? void 0 : _f.toUpperCase(),
            url: (_g = error.config) === null || _g === void 0 ? void 0 : _g.url,
        });
    }
    else {
        res.status(500).json({ error: error.message });
    }
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map