"use client";

import { ButtonHTMLAttributes, FC, useState } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const router: AppRouterInstance = useRouter();
  const [isSigninOut, setIsSigningOut] = useState<boolean>(false);

  return (
    <Button
      {...props}
      variant="outline"
      onClick={async () => {
        setIsSigningOut(true);
        try {
          await signOut();
        } catch (err) {
          console.log(err);
        } finally {
          setIsSigningOut(false);
          router.push("/login");
        }
      }}
    >
      {isSigninOut ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </Button>
  );
};

export default SignOutButton;
