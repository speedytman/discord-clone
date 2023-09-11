import { db } from "@/lib/db"
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const initialProfile = async () => {
  const session = await auth();

  if(!session){
    return redirect("/login")
  }

  const user = session.user

  if(user.image === null){
    
  }


  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  })

  if(profile){
    return profile
  }
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,

    }
  })
  return newProfile
}