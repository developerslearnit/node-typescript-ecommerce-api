import { Response } from 'express';
import { HttpError, HttpCode } from '../exceptions/http-error';

class ErrorHandler {
  public handleError(error: Error | HttpError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as HttpError, response);
    } else {
      this.handleUntrustedError(error, response);
    }
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof HttpError) {
      return error.isOperational;
    }
    return false;
  }

  private handleTrustedError(error: HttpError, response: Response): void {
    response.status(error.httpCode).json({
      hasError: true,
      message: error.message,
    });
  }

  private handleUntrustedError(
    error: Error | HttpError,
    response?: Response
  ): void {
    if (response) {
      response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        hasError: true,
      });
    }

    console.log('Application encountered an untrusted error.');
    console.log(error);
  }
}

export const errorHandler = new ErrorHandler();
