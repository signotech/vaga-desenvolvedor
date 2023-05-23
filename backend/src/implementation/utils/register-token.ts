import jwt from 'jsonwebtoken'

export const registerToken = (login:string) => {

    const token = jwt.sign({login}, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN!
    })
    return token

}