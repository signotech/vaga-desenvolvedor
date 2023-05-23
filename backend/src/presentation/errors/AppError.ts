export class AppError{

    constructor(
        public readonly message:string,
        public readonly statusCode:number
    ){
        this.message = message
        this.statusCode = statusCode
    }

}