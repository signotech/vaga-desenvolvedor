import 'reflect-metadata'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import '../container'
import 'express-async-errors'
import { AppError } from '@presentation/errors/AppError'
import router from './routes/router'
import { errors } from 'celebrate'

const aṕp = express()

aṕp.use(cors())
aṕp.use(express.json())

aṕp.use(router)
aṕp.use(errors())

aṕp.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }

    console.log(err)

    return res.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor.'
    })

})

export default aṕp




