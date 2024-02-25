import { Toaster } from "@/components/ui/sonner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (userId) {
    return redirect("/");
  }

  return (
    <div className="grid min-h-screen overflow-hidden">
      <Toaster position="bottom-center" richColors />
      <main className="flex items-center justify-center">{children}</main>
    </div>
  );
}
