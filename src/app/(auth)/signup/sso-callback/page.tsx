import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

const SSOCallback = () => {
  return (
    <AuthenticateWithRedirectCallback
      redirectUrl="/tasks"
      continueSignUpUrl="/signup?activated=false"
    />
  );
};

export default SSOCallback;
