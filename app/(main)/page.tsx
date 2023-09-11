import { buttonVariants } from "@/components/ui/button";
import UserMenu from "@/components/user-menu";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div>
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <UserMenu
        image={session.user.image!}
        name={session.user.name!}
        email={session.user.email!}
      />
    </div>
  );
}
