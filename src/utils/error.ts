export class ClientError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
};

export class ValidationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 422) { 
    super(message);
    this.statusCode = statusCode;
  }
}

