import authRouter from "@infra/routes/auth.routes";
import clientRouter from "@infra/routes/client.routes";
import productRouter from '@infra/routes/product.routes'

import { Router } from "express";

const router = Router()

router.use("/auth", authRouter)
router.use("/client", clientRouter)
router.use("/product", productRouter)

export default router