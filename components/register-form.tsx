"use client";

import { FaSpinner as Spinner } from "react-icons/fa";
import { FcGoogle as Google } from "react-icons/fc";
import { useState } from "react";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z
  .object({
    name: z.string().min(3).max(30),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, {
        message: "Password mush have at least 8 characters",
      })
      .max(50, {
        message: "Password mush have at most 50 characters",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password mush have at least 8 characters",
      })
      .max(50, {
        message: "Password mush have at most 50 characters",
      }),
  })
  .required();

type RegisterFormValues = z.infer<typeof formSchema>;

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      setIsLoading(true);
      if (data.password !== data.confirmPassword) {
        return toast({
          title: "Passwords must match",
          variant: "destructive",
        });
      }
      const res = await axios.post("/api/auth/register", data);

      if (!res) return null;

      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });

      console.log(res);
    } catch (error) {
      console.log("Sign Up Form", error);
    } finally {
      setIsLoading(false);
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      // toast notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p>Name</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Smith"
                        type="text"
                        disabled={isLoading}
                        {...field}
                        className="bg-stone-900"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p>Email</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        disabled={isLoading}
                        {...field}
                        className="bg-stone-900"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p>Password</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        disabled={isLoading}
                        {...field}
                        className="bg-stone-900"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p>Confirm Password</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        disabled={isLoading}
                        {...field}
                        className="bg-stone-900"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={loginWithGoogle}
      >
        {isLoading ? (
          <Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
