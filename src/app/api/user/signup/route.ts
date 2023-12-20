import connectDB from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';


connectDB();

export async function POST(req: NextRequest, res:NextResponse){

    try{
        const reqBody = await req.json();
        const {username, email, password} = reqBody;

        const userData = await User.findOne({email});
        if(userData){
            return NextResponse.json({error: "User already exists",status: 400});
        }

        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password,salt);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        const userCreated = await user.save();
        console.log(userCreated);

        return NextResponse.json({message: "User created successfully",success:true, userCreated})

    }
    catch(error:any){
        console.log(error);
        return NextResponse.json({error: error.message},{status:500});
    }
}