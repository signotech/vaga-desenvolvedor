import { SignInController } from "@infra/controllers/auth/SignInController";
import { SignUpController } from "@infra/controllers/auth/SignUpController";
import { ValidateTokenController } from "@infra/controllers/auth/ValidateTokenController";
import { Segments, celebrate } from "celebrate";
import { Router } from "express";
import Joi from "joi";

const authRouter = Router()

//Controllers
const signInController = new SignInController()
const signUpController = new SignUpController()
const validateTokenController = new ValidateTokenController()

authRouter.post("/sign-in", 
celebrate({
    [Segments.BODY]: {
        login: Joi.string().required(),
        senha: Joi.string().required()
    }
}), signInController.handle)

authRouter.post("/sign-up", 
celebrate({
    [Segments.BODY]: {
        login: Joi.string().required(),
        senha: Joi.string().required(),
        confirmar_senha: Joi.string().required(),
    }
}), signUpController.handle)

authRouter.post("/validate", 
celebrate({
    [Segments.BODY]:{
        token: Joi.string().required()
    }
}),validateTokenController.handle )

export default authRouter