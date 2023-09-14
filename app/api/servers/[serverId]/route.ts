import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function PATCH(req: Request, { params }: {params: {serverId: string}}){
  try {
    const{name, imageUrl} = await req.json();
    const profile = await currentProfile()

    if(!profile){
      return new NextResponse("Unauthorized", {status: 401})
    }

    const server = await db.server.update({
      where: {
        id: params.serverId 
      },
      data: { 
        name,
        imageUrl, 
      }
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log("[SERVERS_PATCH]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}