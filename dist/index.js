"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routers_1 = __importDefault(require("./routers"));
const middleware_1 = require("./middleware");
const http_error_1 = require("./exceptions/http-error");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const PORT = parseInt(process.env.SERVER_PORT || '3000');
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
app.use((0, routers_1.default)());
app.use('*', (req, res, next) => {
    const err = new http_error_1.HttpError({
        httpCode: http_error_1.HttpCode.NOT_FOUND,
        description: 'API endpoint not found',
    });
    next(err);
});
app.use(middleware_1.handleErrors);
//# sourceMappingURL=index.js.map