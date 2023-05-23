import authRouter from "@infra/routes/auth.routes";
import clientRouter from "@infra/routes/client.routes";
import { Router } from "express";

const router = Router()

router.use("/auth", authRouter)
router.use("/client", clientRouter)

export default router