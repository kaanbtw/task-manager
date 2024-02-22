"use client";

import { useTransition, Dispatch, SetStateAction } from "react";
import { useSignUp, isClerkAPIResponseError } from "@clerk/nextjs";
import { toast } from "sonner";

// Validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/lib/validations/auth";

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
  setUserEmail: Dispatch<SetStateAction<string>>;
}

export default function SignUpForm({ setUserEmail }: Props) {
  const { isLoaded, signUp } = useSignUp();
  const [isPending, startTransition] = useTransition();

  // react-hook-form
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        await signUp
          .create({
            emailAddress: values.email,
            username: values.username,
          })
          .then(async () => {
            await signUp.prepareEmailAddressVerification({
              strategy: "email_code",
            });
          });

        setUserEmail(values.email);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
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
                    className="rounded-lg h-10"
                    type="email"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="username"
                    className="rounded-lg h-10"
                    type="text"
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
          className="w-full rounded-lg h-10 bg-foreground font-normal"
        >
          {isPending ? (
            <Icons.Spinner className="h-5 w-5 animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
