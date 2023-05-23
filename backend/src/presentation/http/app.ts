import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import '../container'

const aṕp = express()

aṕp.use(cors())
aṕp.use(express.json())

export default aṕp




