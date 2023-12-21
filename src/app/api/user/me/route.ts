import { NextResponse,NextRequest } from "next/server";
import User from '@/models/userModel';
import {getUserDataFromToken}  from '@/helpers/getDatafromToken'
import connectDB from "@/dbConfig/dbConfig";

connectDB();
export async function GET(request:NextRequest){

    try{
        const UserId = await getUserDataFromToken(request);
        const UserData = await User.findOne({_id: UserId}).select("-password");

        return NextResponse.json(UserData);

    }
    catch(error:any){
        return NextResponse.json({error: error.message,status: 400})
    }


}