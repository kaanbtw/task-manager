import { useSignUp, isClerkAPIResponseError } from "@clerk/nextjs";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Validations
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usernameSchema } from "@/lib/validations/auth";

// UI Components
import { Button } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Icons } from "@/components/Icons";

export default function UpdateUsername() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // react-hook-form
  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof usernameSchema>) {
    if (!isLoaded) return;

    startTransition(async () => {
      try {
        const setUsername = await signUp.update({
          username: values.username,
        });

        if (setUsername.status === "complete") {
          if (setUsername.createdSessionId) {
            await setActive({ session: setUsername.createdSessionId }).then(
              () => {
                router.push("/");
              }
            );
          }
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
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center space-y-2 z-10">
          <h2 className="font-bold text-3xl text-foreground">Welcome!</h2>
          <p className="font-normal text-foreground/90">
            Set up your username to get started.
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full text-nav-primary"
        >
          <div className="space-y-3">
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
                      className="rounded-lg h-10 border-border"
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
            className="w-full rounded-lg h-10 bg-secondary text-nav-primary border font-normal"
          >
            {isPending ? (
              <Icons.Spinner className="h-5 w-5 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
