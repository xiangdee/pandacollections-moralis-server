"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.request = void 0;
const authService_1 = require("./authService");
async function request(req, res, next) {
    try {
        const { address, chain, networkType } = req.body;
        const message = await (0, authService_1.requestMessage)({
            address,
            chain,
            networkType,
        });
        res.status(200).json({ message });
    }
    catch (err) {
        next(err);
    }
}
exports.request = request;
async function verify(req, res, next) {
    try {
        const { network, message, signature } = req.body;
        const user = await (0, authService_1.verifyMessage)({
            network,
            message,
            signature,
        });
        res.status(200).json({ user });
    }
    catch (err) {
        next(err);
    }
}
exports.verify = verify;
//# sourceMappingURL=authController.js.map