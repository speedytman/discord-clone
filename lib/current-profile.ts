import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  const session = await auth();

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