import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types/server";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if(req.method !== "DELETE" && req.method !=="PATCH"){
    return res.status(405).json({messsage: "Method not allowed"})
  }

  try {
    const profile = await currentProfilePages(req, res);
    const { content } = req.body
    const { messageId, serverId, channelId } = req.query

    if(!profile) {
      return res.status(401).json({message: "Unauthorized"})
    }
    if(!serverId) {
      return res.status(400).json({message: "Server ID Missing"})
    }
    if(!channelId) {
      return res.status(400).json({message: "Channel ID Missing"})
    }
    if(!messageId) {
      return res.status(400).json({message: "Message ID Missing"})
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      include: {
        members: true
      }
    })

    if(!server) {
      return res.status(404).json({ message: "Server not found"})
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string
      }
    })

    if(!channel) {
      return res.status(404).json({ message: "Channel not found"})
    }
    
    const member = server.members.find((member) => member.profileId === profile.id)

    if(!member) {
      return res.status(404).json({ message: "Member not found"})
    }

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channelId as string,
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    if(!message || message.deleted) {
      return res.status(404).json({ message: "Message not found"})
    }

    const isMessageOwner = message.memberId === member.id
    const isAdmin = member.role === MemberRole.ADMIN
    const isModerator = member.role === MemberRole.MODERATOR
    const canModify = isMessageOwner || isAdmin || isModerator

    if(!canModify) {
      return res.status(401).json({message: "Unauthorized"})
    }

    if(req.method ==="DELETE") {
      message = await db.message.update({
        where: {
          id: messageId as string
        },
        data: {
          fileUrl: null,
          content: "This message has been deleted.",
          deleted: true,
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        }
      })
    }

    if(req.method ==="PATCH") {
      if(!isMessageOwner){
        return res.status(401).json({message: "Unauthorized"})
      }
      message = await db.message.update({
        where: {
          id: messageId as string
        },
        data: {
          content: content,
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        }
      })
    }

    const updateKey = `chat:${channelId}:messages:update`

    res?.socket?.server?.io?.emit(updateKey, message)

    return res.status(200).json(message)
  } catch (error) {
    console.log("[MESSAGE_ID]", error)
    return res.status(500).json({error: "Internal Error"})

  }
}