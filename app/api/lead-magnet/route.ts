import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { leadMagnetCreateRequest } from "./schema";
import { prismadb } from "@/lib/prismadb";
import { error } from "console";

export async function POST(request:Request) {
   // const user = await currentUser();

    //console.log(" user", user);
   
    //if (!user?.id){
    //    return NextResponse.json({message:"Unauthorized !!"},{status:401});
   // }

    const userId = "user_2b7bqAe3GP3KFcGsxnCNESBTlnt" ;
    
    // Parse & validate the data the  user sent us
    const requestData = await request.json(); 
    const parsed = leadMagnetCreateRequest.safeParse(requestData); 

    if(!parsed.success){
        return NextResponse.json(
            {message: parsed.error.message},
             {status :400}
        );
    }
    const newLead= parsed.data;

    // Create a new lead Magnet in our database with Prisma
    const newLeadMagnet = await prismadb.leadMagnet.create({
        data:{...newLead,userId},
    });
    //Return the new Leadmagnet to the user
    try {
        return NextResponse.json(
          {
            message: "New Lead Magnet Created!",
            data: newLeadMagnet,
            success:true,
          },
          { status: 201}
        );
      } catch (error) {
        return NextResponse.json(
          {
            message: "New Lead Magnet Created!",
            data: null,
            success:true,
          },
          { status: 500}
        );
      }
    }

    
    
