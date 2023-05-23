import clientRouter from "@infra/routes/client.routes";
import { Router } from "express";

const router = Router()

router.use("/client", clientRouter)

export default router