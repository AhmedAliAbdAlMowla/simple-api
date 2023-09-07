import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionBindFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = 'Internal Server Error';
    let message : string[], exRes: any;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage = exception.message;
      exRes = exception.getResponse();
    }



    if (status >= 500 && status <= 599) {
      const RESET = '\x1b[0m';
      const RED = '\x1b[31m';
      const BLUE = '\x1b[34m';
    
      console.log(RED + `[ ☠️ ☠️  ] Error: message:  ${errorMessage} ${BLUE} status: ${status}` + RESET); // log in audit in db if u want
      // fun xd
      errorMessage = 'Unprocessable Entity Exception';
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = ['something wrong happened.🥹😭'];
    }
    else {
      message = exRes.message;
    }

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: status,
      message,
      error : errorMessage
    });
  }
}
