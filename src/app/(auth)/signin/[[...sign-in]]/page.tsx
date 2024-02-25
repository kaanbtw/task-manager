"use client";

import Link from "next/link";
import { useState } from "react";

import SignInForm from "../signin-form";
import Oauth from "../oauth";
import VerifyEmail from "../verify-email";

import FadeIn from "@/components/Fade-in";

export default function SignInPage() {
  const [verifying, setVerifying] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-4 w-[28rem]">
      {!verifying ? (
        <FadeIn y={24} className="w-full">
          <div className="flex flex-col gap-8 w-full items-center">
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-3xl text-nav-primary">Sign In</h2>
              <p className="font-normal text-muted-foreground">
                Enter your details to sign in
              </p>
            </div>
            <Oauth />

            <div className="relative w-full h-fit flex items-center justify-center">
              <hr className="border-muted-foreground border-t-1 w-[98%]" />
              <p className="absolute bg-background w-12 text-center text-sm font-medium text-muted-foreground">
                OR
              </p>
            </div>

            <SignInForm setVerifying={setVerifying} />
            <div className="flex gap-2 font-light text-sm">
              <p className="text-muted-foreground">
                {"Don't have an account?"}
              </p>
              <Link href="/signup" className="text-nav-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </FadeIn>
      ) : (
        <FadeIn transition={0.2} className="w-full h-full">
          <VerifyEmail />
        </FadeIn>
      )}
    </div>
  );
}
