import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextResponse,NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';


connectDB();

export async function POST(req:NextRequest, res: NextResponse){
    try{
        const userBody = await req.json();
        const {email, password} = userBody;
        console.log(userBody);

        const userData = await User.findOne({email});
        if(!userData){
            return NextResponse.json({error: "Invalid Credentials",status: 400});
        }

        const isMatched = await bcryptjs.compareSync(password,userData.password);

        if(!isMatched){
            return NextResponse.json({error: "Invalid credentials",status: 400});
        }

        const tokenData ={
            id: userData._id,
            username: userData.username,
            email: userData.email
        }
        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY!,{expiresIn: '1d'});
        const response = NextResponse.json({message: "login successful",success: true});

        response.cookies.set("token",token,
        {
            httpOnly: true,
        });

        return response;
    }
    catch(error:any){
        console.log(error);
        return NextResponse.json({error: error.message},{status:500});
    }
}