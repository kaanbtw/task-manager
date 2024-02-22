import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/signin", "/signup"],
});

export const config = {
  // Protects all routes, including api/trpc.
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
