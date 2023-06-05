"use client";

import { Metadata } from "next";

import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Inputs = {
  email: string;
  password: string;
};

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  async function loginWithGoogle() {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid place-items-center w-full min-h-screen bg-slate-200">
      <div className="bg-white rounded-lg p-2 flex gap-3">
        <div className="flex flex-col p-5 justify-between bg-secondary rounded-lg gap-16 max-w-xs min-h-full">
          <p className="text-xs font-semibold text-white">MANTINE</p>
          <div className="flex flex-col gap-3 text-white">
            <h3 className="text-4xl">Welcome back</h3>
            <p className="text-xs text-slate-300">
              Welcome back! Please enter your details.
            </p>
          </div>
          <div className="flex flex-col bg-primary rounded-lg p-3 gap-3">
            <p className="text-xs text-white">
              Simply unbelievable! I am really satisfied with my projects and
              business. This is Absolutely wonderful!
            </p>
            <div className="flex gap-3 items-center">
              <div className="w-11 h-11 rounded-lg bg-slate-700" />
              <div className="flex flex-col gap-1">
                <p className="text-sm text-white">Timson K</p>
                <p className="text-xs text-slate-400">Freelancer</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-primary text-xl font-bold">Login</h3>
            <p className="text-xs text-secondary">
              Don&apos;t have an account?
              <Link href="/register">
                <span className="text-blue-600"> Register</span>
              </Link>
            </p>
          </div>
          <div>
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  role="input"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  role="input"
                  id="password"
                  placeholder="password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("password")}
                />
                {errors?.password && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button className={cn(buttonVariants())} disabled={isLoading}>
                Log In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
