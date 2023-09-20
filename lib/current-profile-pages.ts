"use server"

import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const currentProfilePages = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if(!session?.user){
    return null;
  }

  const userId = session.user.id

  const profile = await db.profile.findUnique({
    where: {
      userId: userId
    }
  })

  return profile;
}