import authRouter from "@infra/routes/auth.routes";
import clientRouter from "@infra/routes/client.routes";
import orderRouter from "@infra/routes/order.routes";
import productRouter from '@infra/routes/product.routes'

import { Router } from "express";

const router = Router()

router.use("/auth", authRouter)
router.use("/client", clientRouter)
router.use("/product", productRouter)
router.use("/order", orderRouter)

export default router