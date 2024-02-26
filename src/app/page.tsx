import Image from "next/image";
import TaskItem from "@/components/TaskItem";
import NewTaskModal from "@/components/NewTaskModal";

import { Icons } from "@/components/Icons";
import Navbar from "@/components/Navbar";
import AbstractShape from "../../public/abstract.svg";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (!user) return redirect("/");

  return (
    <main className="dark flex flex-col relative bg-background h-full w-full items-center justify-center overflow-hidden">
      {/* <Sidebar /> */}
      <div className="relative flex justify-between items-center min-[800px]:w-[746px] min-[1400px]:w-[1130px] min-[1800px]:w-[1514px] h-[11%]">
        <h1 className="text-3xl">All Tasks</h1>

        <NewTaskModal buttonType="small" />
      </div>
      <section className="flex justify-center relative w-full h-full min-[800px]:h-[78%] overflow-x-hidden">
        <div className="flex w-fit overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border justify-center items-center">
          <div className="grid grid-cols-1 gap-6 min-[800px]:grid-cols-2 min-[1400px]:grid-cols-3 min-[1800px]:grid-cols-4 justify-items-center relative w-full h-fit px-2 sm:px-10">
            <TaskItem
              title="Lorem ipsum dolor sit."
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, doloremque."
              date="13/07/2024"
            />
            <TaskItem
              title="Lorem ipsum dolor sit."
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, doloremque."
              date="13/07/2024"
            />
            <TaskItem
              title="Lorem ipsum dolor sit."
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, doloremque."
              date="13/07/2024"
            />
            <TaskItem
              title="Lorem ipsum dolor sit."
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, doloremque."
              date="13/07/2024"
            />
            <TaskItem
              title="Lorem ipsum dolor sit."
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, doloremque."
              date="13/07/2024"
            />
            <TaskItem
              title="Lorem ipsum dolor sit."
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, doloremque."
              date="13/07/2024"
            />

            <TaskItem
              title="Lorem ipsum dolor sit."
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, doloremque."
              date="13/07/2024"
            />
            <TaskItem
              title="Lorem ipsum dolor sit."
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, doloremque."
              date="13/07/2024"
            />
            <TaskItem
              title="Lorem ipsum dolor sit."
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, doloremque."
              date="13/07/2024"
            />

            <TaskItem
              title="Lorem ipsum dolor sit."
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, doloremque."
              date="13/07/2024"
            />
            <NewTaskModal buttonType="big" />
          </div>
        </div>
      </section>
      <Navbar username={user.username as string} />
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
