import { HttpStatus } from "./global-enum";


export class ApiResponse {
  public static success(data: any, message: string = 'successful') {
    return {
      statusCode: HttpStatus.SUCCESS,
      message,
      data,
    };
  }

  public static error( message: string = 'failed', statusCode: number = HttpStatus.ERROR) {
    return {
      statusCode,
      message,
    };
  }
}