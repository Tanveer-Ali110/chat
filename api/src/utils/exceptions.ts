
import HttpStatusCodes from 'http-status-codes';

export abstract class HttpException extends Error {
    public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;
    constructor(msg: string, httpStatus: number) {
        super(msg);
        this.HttpStatus = httpStatus;
    }
}
export class BadRequestException extends HttpException {
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;
    constructor(msg: string) {
        super(msg, BadRequestException.HttpStatus);
    }
}
export class NotFoundException extends HttpException {
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;
    constructor(msg: string) {
        super(msg, NotFoundException.HttpStatus);
    }
}
export class UnAuthorizedException extends HttpException {
    public static readonly HttpStatus = HttpStatusCodes.UNAUTHORIZED;
    constructor(msg: string) {
        super(msg, UnAuthorizedException.HttpStatus);
    }
}
export class ValidationException extends HttpException {
    public static readonly HttpStatus = HttpStatusCodes.FORBIDDEN;
    constructor(msg: string) {
        super(msg, ValidationException.HttpStatus);
    }
}


