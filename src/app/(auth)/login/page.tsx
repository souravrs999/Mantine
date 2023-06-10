"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { userAuthSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = Zod.infer<typeof userAuthSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { remember: false },
    resolver: zodResolver(userAuthSchema),
  });

  const isRemember = watch("remember");

  const onSubmit = async (data: FormData) => {
    // setIsLoading(true);
    console.log(data);
  };

  const handleRememberMeClick = () => {
    setValue("remember", !isRemember);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid place-items-center w-full min-h-screen bg-slate-200">
      <div className="bg-white rounded-lg p-3 flex gap-2">
        <div className="flex flex-col w-96">
          <p className="uppercase font-bold text-sm text-secondary">mantine</p>
          <div className="flex flex-col items-center w-full mt-7">
            <div>
              <h3 className="font-bold text-3xl text-secondary">
                Welcome back
              </h3>
              <p className="text-xs text-gray-400 max-w-[16rem] mt-3">
                Welcome back! Please enter your details.
              </p>
              <Button
                variant="outline"
                onClick={loginWithGoogle}
                className="mt-5 w-full text-secondary hover:bg-secondary hover:text-white focus-visible:ring-secondary"
              >
                <Icons.google className="w-5 h-5 mr-3" /> Log in with Google
              </Button>
            </div>
            <div className="max-w-[15rem] w-full h-[1px] bg-gray-200 mt-5 relative">
              <span className="absolute -top-2 left-[45%] text-xs text-gray-500 px-2 bg-white">
                or
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center w-full max-w-[16rem] mt-7 mx-auto">
            <form
              role="form"
              className="w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  role="input"
                  id="email"
                  placeholder="Email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="border-0 border-b-[1px] border-gray-300 focus:ring-secondary"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="px-1 text-[10px] text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="w-full mt-3">
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
                  className="border-0 border-b-[1px] border-gray-300 focus:ring-secondary"
                  {...register("password")}
                />
                {errors?.password && (
                  <p className="px-1 text-[10px] text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center mt-5 w-full">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    role="checkbox"
                    type="button"
                    id="remember"
                    disabled={isLoading}
                    onClick={handleRememberMeClick}
                    {...register("remember")}
                    className="text-white border-gray-300 focus:ring-secondary rounded-[4px]"
                  />
                  <label htmlFor="remember" className="text-xs text-gray-500">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password">
                  <p className="text-xs underline text-gray-500">
                    Forgot password
                  </p>
                </Link>
              </div>
              <div className="flex flex-col mt-5 w-full gap-5">
                <Button
                  className="text-white focus:ring-secondary"
                  disabled={isLoading}
                >
                  Log In
                </Button>
                <p className="text-xs text-gray-500">
                  Don&apos;t have an account?{" "}
                  <Link href="/signin">
                    <span className="text-primary underline">
                      Sign up for free
                    </span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden">
          <Image
            src="/images/login_cover.jpg"
            alt="cover image"
            width={320}
            height={520}
          />
        </div>
      </div>
    </div>
  );
}
