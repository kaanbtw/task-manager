"use client";

import AuthCode from "react-auth-code-input";
import { motion } from "framer-motion";
import { useSignUp, isClerkAPIResponseError } from "@clerk/nextjs";
import { useTransition, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Validations
import { z } from "zod";
import { verifyEmailSchema } from "@/lib/validations/auth";

// UI Components
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

interface Props {
  userEmail: string;
}

export default function VerifyEmail({ userEmail }: Props) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isPending, startTransition] = useTransition();
  const [code, setCode] = useState<string>("");
  const router = useRouter();

  async function verifyCode(values: z.infer<typeof verifyEmailSchema>) {
    if (!isLoaded) return;

    const validated = verifyEmailSchema.safeParse({ code: values.code });
    if (!validated.success) {
      const unknownError = "Something went wrong, please try again.";
      validated?.error?.errors
        ? toast.error(validated.error.errors[0].message)
        : toast.error(unknownError);
      return;
    }

    startTransition(async () => {
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.code,
        });
        console.log("test1");
        console.log("status > ", completeSignUp);
        if (completeSignUp.status === "complete") {
          console.log("test2");
          await setActive({ session: completeSignUp.createdSessionId }).then(
            () => {
              router.push("/");
            }
          );
        }
      } catch (error) {
        const unknownError = "Something went wrong, please try again.";

        isClerkAPIResponseError(error)
          ? toast.error(error.errors[0]?.longMessage ?? unknownError)
          : toast.error(unknownError);
      }
    });
  }

  return (
    <motion.div
      initial={{ y: 128 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.8, duration: 1 }}
      className="space-y-5 w-fit flex flex-col items-center"
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="w-12 h-12 flex items-center justify-center border rounded-xl box-border z-0">
          <Icons.Mail className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-center space-y-2 z-10">
          <h2 className="font-bold text-3xl text-foreground">Verify Email</h2>
          <p className="font-normal text-foreground/90">
            We sent a code to
            <span className="font-medium text-foreground"> {userEmail}</span>
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="space-y-4 z-10"
      >
        <AuthCode
          onChange={(code) => setCode(code)}
          allowedCharacters="numeric"
          containerClassName="flex gap-2 w-fit"
          length={6}
          disabled={isPending}
          inputClassName="relative w-12 h-12 sm:w-16 sm:h-16 bg-background outline-none border border-muted-background focus:border-foreground/50 rounded-xl text-center text-xl font-medium"
        />
        <Button
          onClick={() => verifyCode({ code: code })}
          disabled={isPending}
          variant="default"
          className="w-full h-11 rounded-[8px]"
        >
          {isPending ? (
            <Icons.Spinner className="h-5 w-5 animate-spin" />
          ) : (
            "Verify Email"
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
