"use client";

import { useTransition, Dispatch, SetStateAction } from "react";
import { useSignIn, isClerkAPIResponseError } from "@clerk/nextjs";
import { EmailCodeFactor, SignInFirstFactor } from "@clerk/types";
import { toast } from "sonner";

// Validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/lib/validations/auth";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Icons } from "@/components/Icons";

interface Props {
  setVerifying: Dispatch<SetStateAction<boolean>>;
}

export default function SignInForm({ setVerifying }: Props) {
  const { isLoaded, signIn } = useSignIn();
  const [isPending, startTransition] = useTransition();

  // react-hook-form
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        const { supportedFirstFactors } = await signIn.create({
          identifier: values.email,
        });

        // Filter the returned array to find the 'email_code' entry
        const isEmailCodeFactor = (
          factor: SignInFirstFactor
        ): factor is EmailCodeFactor => {
          return factor.strategy === "email_code";
        };
        const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor);

        if (emailCodeFactor) {
          const { emailAddressId } = emailCodeFactor;

          await signIn.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId,
          });

          setVerifying(true);
        }

        form.reset();
      } catch (error) {
        const unknownError = "Something went wrong, please try again.";

        isClerkAPIResponseError(error)
          ? toast.error(error.errors[0]?.longMessage ?? unknownError)
          : toast.error(unknownError);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full text-nav-primary"
      >
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="example@mail.com"
                    className="rounded-lg h-10 border-border"
                    type="email"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          variant="solid"
          disabled={isPending}
          className="w-full rounded-lg h-10 bg-secondary text-nav-primary border font-normal"
        >
          {isPending ? (
            <Icons.Spinner className="h-5 w-5 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}
