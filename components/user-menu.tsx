"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";

interface UserMenuProps {
  image: string;
  name: string;
  email: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ image, name, email }) => {
  const router = useRouter();
  const handleSignout = async () => {
    await signOut();
    router.refresh();
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="h-[48px] w-[48px] rounded-[24px] hover:rounded-[16px] data-[state=open]:rounded-[16px] overflow-hidden"
        >
          <button className="outline-none">
            <Avatar className="h-full w-full rounded-none">
              <Image fill src={image} alt="avatar" />
              <AvatarFallback>
                {name.split("").at(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-white dark:bg-stone-700 rounded-xl m-2"
          side="right"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal cursor-default">
            <div className="flex flex-col gap-y-2">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-700 dark:bg-slate-200" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="hover:cursor-pointer border border-transparent rounded-xl hover:border-slate-500"
              onSelect={() => router.push("/profile")}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer border border-transparent rounded-xl hover:border-slate-600"
              onSelect={() => router.push("/billing")}
            >
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer border border-transparent rounded-xl hover:border-slate-600"
              onSelect={() => router.push("/settings")}
            >
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-slate-700 dark:bg-slate-200" />
          <DropdownMenuGroup className="p-2">
            <ModeToggle />
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-slate-700 dark:bg-slate-200" />
          <DropdownMenuItem
            className="hover:cursor-pointer border border-transparent rounded-xl hover:border-slate-600"
            onSelect={handleSignout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
