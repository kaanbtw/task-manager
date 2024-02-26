import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

const SSOCallback = () => {
  return (
    <AuthenticateWithRedirectCallback
      redirectUrl="/"
      continueSignUpUrl="/signup?activated=false"
    />
  );
};

export default SSOCallback;
