import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

const SSOCallback = () => {
  return (
    <AuthenticateWithRedirectCallback continueSignUpUrl="/signup?activated=false" />
  );
};

export default SSOCallback;
