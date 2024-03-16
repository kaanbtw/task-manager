import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// UI Components
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (userId) {
    return redirect("/tasks");
  }

  return (
    <div className="grid min-h-screen overflow-hidden">
      <Toaster position="bottom-center" richColors />
      <main className="flex items-center justify-center">{children}</main>
    </div>
  );
}
