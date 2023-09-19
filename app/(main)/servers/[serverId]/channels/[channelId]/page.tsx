import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import ChatHeader from "@/components/chat/chat-header";

interface ChannelIDPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIDPage: React.FC<ChannelIDPageProps> = async ({ params }) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/login");
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
    </div>
  );
};

export default ChannelIDPage;
