export class AppError extends Error {
  public statusCode: number;
  public error:Error
  constructor(message: string, status: number,error:Error, name: string) {
    super(message);
    this.statusCode = status;
    this.error=error;
    this.name=name;
  }
}
