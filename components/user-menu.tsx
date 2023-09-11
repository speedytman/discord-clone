"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RxAvatar as AvatarPlaceholder } from "react-icons/rx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={image} />
              <AvatarFallback>
                <AvatarPlaceholder size={40} />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-white rounded-xl"
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
          <DropdownMenuSeparator className="bg-slate-200" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="hover:cursor-pointer border border-transparent rounded-xl hover:border-slate-600"
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
          <DropdownMenuSeparator className="bg-slate-200" />
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
