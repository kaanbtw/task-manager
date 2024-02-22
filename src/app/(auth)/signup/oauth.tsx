import { Icons } from "@/components/Icons";
import { Button } from "@nextui-org/react";

import { OAuthStrategy } from "@clerk/types";
import { useSignUp } from "@clerk/nextjs";

export default function Oauth() {
  const { isLoaded, signUp } = useSignUp();

  async function OauthSignupHandler(strategy: OAuthStrategy) {
    if (!isLoaded) return;

    signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/signup/sso-callback",
      redirectUrlComplete: "/",
    });
  }

  return (
    <div className="flex justify-between w-full gap-6">
      <Button
        onClick={() => OauthSignupHandler("oauth_github")}
        variant="bordered"
        className="w-full gap-2 rounded-[8px] border border-border"
      >
        <Icons.Github className="h-4 w-4" />
        Sign up with GitHub
      </Button>
      <Button
        onClick={() => OauthSignupHandler("oauth_google")}
        variant="bordered"
        className="w-full gap-2 rounded-[8px] border border-border"
      >
        <Icons.Google className="h-4 w-4" />
        Sign up with Google
      </Button>
    </div>
  );
}
