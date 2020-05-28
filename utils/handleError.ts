import { MiddlewareFunc } from "abc";

export class ErrorHandler extends Error {
  status: number;
  constructor(msg: string, status: number) {
    super(msg);
    this.status = status;
  }
}

export const ErrorMiddleware: MiddlewareFunc = (next) =>
  async (data) => {
    try {
      await next(data);
    } catch (err) {
      const error = err as ErrorHandler;
      data.response.status = error.status || 500;
      data.response.body = error.message;
    }
  };
