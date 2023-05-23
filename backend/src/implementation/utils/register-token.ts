import jwt from 'jsonwebtoken'

export const registerToken = (login:string) => {

    const token = jwt.sign({login}, process.env.JWT_SECRET!)
    return token

}