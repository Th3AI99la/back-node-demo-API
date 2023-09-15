import { AppException } from '@exceptions/app.exception';
import { Response } from 'express';

export class ReturnError {
  error: boolean;
  message: string;
  errorCode?: number;

  constructor(res: Response, error: Error, errorCode?: number) {
    this.error = true;
    this.message = error.message;

    if (error instanceof AppException) {
      this.errorCode = error.errorCode;
    } else {
      this.errorCode = errorCode || 500;
    }

    res.status(this.errorCode).send(this);
  }
}
