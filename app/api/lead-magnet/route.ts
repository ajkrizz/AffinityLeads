import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const user = await currentUser();

    console.log(" User", user);
   
    
    return NextResponse.json({message : "Hello World"});
}