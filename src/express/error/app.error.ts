export class AppError extends Error {
  public statusCode: number;
  public error?: Error | undefined;
  constructor(message: string, status: number, name: string, error?: Error) {
    super(message);
    this.statusCode = status;
    this.error = error ? undefined : error;
    this.name = name;
  }
}
