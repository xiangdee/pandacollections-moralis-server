"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moralis_1 = __importDefault(require("moralis"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const parseDashboard_1 = require("./parseDashboard");
const parseServer_1 = require("./parseServer");
const errorHandler_1 = require("./middlewares/errorHandler");
const config_1 = __importDefault(require("./config"));
const apiRouter_1 = require("./apiRouter");
const app = (0, express_1.default)();
moralis_1.default.start({
    apiKey: config_1.default.MORALIS_API_KEY,
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(`/${config_1.default.SERVER_ENDPOINT}`, parseServer_1.parseServer);
app.use('/dashboard', parseDashboard_1.parseDashboard);
app.use('/api', apiRouter_1.apiRouter);
app.use(errorHandler_1.errorHandler);
app.use(express_1.default.static('public'));
app.listen(config_1.default.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`${config_1.default.APP_NAME} is running on port ${config_1.default.PORT}`);
});
//# sourceMappingURL=index.js.map