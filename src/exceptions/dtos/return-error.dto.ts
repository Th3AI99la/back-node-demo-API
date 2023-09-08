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
      this.errorCode = errorCode;
    }

    this.errorCode = errorCode;

    res.status(this.errorCode || 500).send(this);
  }
}
