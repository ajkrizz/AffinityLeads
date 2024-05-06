import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/account", 
    "/api/account/components",
    "/api/lead-magnet",
    "/api/webhook/stripe",
    "/api/lead-magnet/publish",
    "/api/lead-magnet/unpublish",

  ],
  ignoredRoutes: [
    "/((?!api|trpc))(_next.*|.+\.[\w]+$)",
    "/api/webhooks/stripe",
    "/api/account", 
    "/api/account/components",  // Added here
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};