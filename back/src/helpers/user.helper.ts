import { BadRequestException} from '@nestjs/common';


export function validateCreateuser(createUser){
    console.log(createUser,'create uuser')
    if(Object.keys(createUser).length === 0){
        throw new BadRequestException('Obrigatorio o envio de parametros')
    }
    if(!createUser.nome){
        throw new BadRequestException('Obrigatorio o envio de parametros')
    }
}

