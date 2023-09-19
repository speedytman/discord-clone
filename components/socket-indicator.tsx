"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 border-none">
        Fallback: Polling every 1s
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="bg-emerald-500 dark:bg-emerald-600 border-none"
    >
      Live: Realtime updates
    </Badge>
  );
};

export default SocketIndicator;
