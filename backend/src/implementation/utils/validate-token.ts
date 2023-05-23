import jwt from 'jsonwebtoken'

export const validateToken = (token: string): boolean => {
    try {
        jwt.verify(token, process.env.JWT_SECRET!)
        return true
    } catch (err) {
        return false
    }
}
