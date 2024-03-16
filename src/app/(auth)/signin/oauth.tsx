import { Icons } from "@/components/Icons";
import { Button } from "@nextui-org/react";

import { OAuthStrategy } from "@clerk/types";
import { useSignIn } from "@clerk/nextjs";

export default function Oauth() {
  const { isLoaded, signIn } = useSignIn();

  async function OauthSigninHandler(strategy: OAuthStrategy) {
    if (!isLoaded) return;

    signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/signup/sso-callback",
      redirectUrlComplete: "/tasks",
    });
  }

  return (
    <div className="flex justify-between w-full gap-6">
      <Button
        onClick={() => OauthSigninHandler("oauth_github")}
        variant="bordered"
        className="w-full gap-2 rounded-[8px] border border-border text-nav-primary"
      >
        <Icons.Github className="h-4 w-4" />
        Sign in with GitHub
      </Button>
      <Button
        onClick={() => OauthSigninHandler("oauth_google")}
        variant="bordered"
        className="w-full gap-2 rounded-[8px] border border-border text-nav-primary"
      >
        <Icons.Google className="h-4 w-4" />
        Sign in with Google
      </Button>
    </div>
  );
}
