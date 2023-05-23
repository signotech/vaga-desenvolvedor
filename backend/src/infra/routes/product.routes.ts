import { authMiddleware } from "@infra/middlewares/auth.middleware";
import { Router } from "express";

const productRouter = Router()

productRouter.use(authMiddleware)

export default productRouter