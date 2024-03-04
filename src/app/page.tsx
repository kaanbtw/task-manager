import Image from "next/image";

import Navbar from "@/components/Navbar";
import NewTaskModal from "@/components/NewTaskModal";
import TaskList from "@/components/TaskList";

import { Toaster } from "@/components/ui/sonner";
import { Icons } from "@/components/Icons";
import AbstractShape from "../../public/abstract.svg";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (!user?.username) return redirect("/signin");

  return (
    <main className="dark flex flex-col relative bg-background h-full w-full items-center justify-center overflow-hidden">
      <Toaster position="top-center" richColors />

      <div className="relative flex justify-between items-center min-[800px]:w-[746px] min-[1400px]:w-[1130px] min-[1800px]:w-[1514px] h-[11%]">
        <h1 className="text-3xl">All Tasks</h1>
        <NewTaskModal buttonType="small" />
      </div>

      <TaskList username={user.username} />

      <Navbar username={user.username} />

      <Image
        className="absolute -right-[300px] -bottom-[700px] w-1/2 rotate-90 blur-md animate-pulse-slow"
        src={AbstractShape}
        alt="Abstract Shape"
      />
      <Image
        className="absolute -left-[300px] -bottom-[500px] w-1/2 rotate-90 blur-md animate-pulse-slow"
        src={AbstractShape}
        alt="Abstract Shape"
      />
    </main>
  );
}
