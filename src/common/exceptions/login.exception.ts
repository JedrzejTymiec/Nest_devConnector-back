import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailException extends HttpException {
    constructor() {
        super('User not found', HttpStatus.UNAUTHORIZED);
    }
}

export class PasswordException extends HttpException {
    constructor() {
        super('Invalid Password', HttpStatus.UNAUTHORIZED)
    }
}