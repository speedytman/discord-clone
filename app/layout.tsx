import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import ModalProvider from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { SocketProvider } from "@/components/providers/socket-provider";
import QueryProvider from "@/components/providers/query-provider";
import ClientSessionProvider from "@/components/providers/client-session-provider";
import { auth } from "@/lib/auth";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ClientSessionProvider session={session}>
          <SocketProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="discord-theme"
            >
              <ModalProvider />
              <Toaster />
              <QueryProvider>{children}</QueryProvider>
            </ThemeProvider>
          </SocketProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
