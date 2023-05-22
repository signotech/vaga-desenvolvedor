import express from 'express'
import cors from 'cors'
import 'reflect-metadata'

const aṕp = express()

aṕp.use(cors())
aṕp.use(express.json())

export default aṕp




