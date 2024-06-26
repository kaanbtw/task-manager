import Image from "next/image";

import NewTaskModal from "./new-task-modal";
import TasksList from "./tasks-list";

import { Toaster } from "@/components/ui/sonner";
import AbstractShape from "../../../public/abstract.svg";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getAllTasks } from "@/app/actions";

export default async function Tasks() {
  const user = await currentUser();

  if (!user?.username) return redirect("/signin");

  const tasks = await getAllTasks();

  return (
    <main className="dark flex flex-col relative bg-background h-full w-full items-center justify-center overflow-hidden">
      <Toaster position="top-center" richColors />

      <TasksList tasks={tasks} username={user.username} />

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
