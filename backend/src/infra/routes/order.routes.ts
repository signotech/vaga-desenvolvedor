import { authMiddleware } from "@infra/middlewares/auth.middleware";
import { Router } from "express";

const orderRouter = Router()

orderRouter.use(authMiddleware)

export default orderRouter