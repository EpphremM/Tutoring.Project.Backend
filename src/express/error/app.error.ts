export class AppError extends Error {
  public statusCode: number;
  public error?: Error;
  
  constructor(message: string, status: number, name: string, error?: Error) {
    super(message);
    this.statusCode = status;
    this.error = error;
    this.name = name;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
