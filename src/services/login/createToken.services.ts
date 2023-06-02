import { TLoginRequest, Ttoken } from "../../interfaces/login/login.interfaces"
import { AppError } from "../../error/error"
import { compare } from "bcryptjs"
import jwt from 'jsonwebtoken'
import Admin from "../../../models/adminModel"

const createToken = async (bodyData:TLoginRequest):Promise<Ttoken> =>{

   const email:string = bodyData.email_user

   const user = await Admin.findOne({ where: { email_user: email } })

   if (!user) {
      throw new AppError('Invalid credentials', 401)
   }

   const passwordCompare = await compare(bodyData.password_user, user.password_user)

   if(!passwordCompare){
      throw new AppError('Invalid credentials', 401)
   }

   const token = jwt.sign(
      {
         userAdmin:user.is_admin
      },
      process.env.SECRET_KEY!,
      {
         expiresIn:'24h',
         subject:String(user.id)
      }
   )

   return token
}

export default createToken