import jwt from 'jsonwebtoken'
import { NextRequest} from 'next/server'

export const  getUserDataFromToken = (request:NextRequest)=>{

    try{

        const token = request.cookies.get("token")?.value || "";

        const user = jwt.verify(token,process.env.TOKEN_SECRET_KEY!)

        return user.id;

    }
    catch(error:any){
        throw new Error(error.message);
    }
}