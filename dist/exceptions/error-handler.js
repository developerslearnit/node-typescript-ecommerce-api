"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_error_1 = require("../exceptions/http-error");
class ErrorHandler {
    handleError(error, response) {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error, response);
        }
        else {
            this.handleUntrustedError(error, response);
        }
    }
    isTrustedError(error) {
        if (error instanceof http_error_1.HttpError) {
            return error.isOperational;
        }
        return false;
    }
    handleTrustedError(error, response) {
        response.status(error.httpCode).json({
            hasError: true,
            message: error.message,
        });
    }
    handleUntrustedError(error, response) {
        if (response) {
            response.status(http_error_1.HttpCode.INTERNAL_SERVER_ERROR).json({
                message: 'Internal server error',
                hasError: true,
            });
        }
        console.log('Application encountered an untrusted error.');
        console.log(error);
    }
}
exports.errorHandler = new ErrorHandler();
//# sourceMappingURL=error-handler.js.map