export abstract class AbstractValidateToken {

    abstract execute(token:string):Promise<boolean>

}