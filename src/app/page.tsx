"use client";

import Image from "next/image";
import TaskItem from "@/components/TaskItem";
import NewTaskItem from "@/components/NewTaskItem";

import { Button, ButtonGroup } from "@nextui-org/react";

import { Icons } from "@/components/Icons";

import Sidebar from "@/components/Sidebar";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <main className="dark bg-background overflow-hidden flex w-full">
      <Sidebar />
      <section className="flex justify-center w-full h-full overflow-scroll overflow-x-hidden">
        <div className="w-fit">
          <div className="flex items-center w-full h-fit py-12 px-2 sm:px-10 justify-between">
            <h1 className="text-3xl">All Tasks</h1>

            <Button
              className="hidden md:flex bg-foreground font-normal"
              color="primary"
              variant="solid"
              startContent={<Icons.Plus />}
            >
              Create New Task
            </Button>

            <ButtonGroup className="flex md:hidden">
              <Button
                isIconOnly
                className="min-w-unit-10 w-10 h-8 hover:bg-muted cursor-pointer z-50 bg-muted data-[hover=true]:bg-muted text-muted-foreground"
              >
                <Icons.Plus />
              </Button>
              <Button
                isIconOnly
                className="min-w-unit-10 w-10 h-8 hover:bg-muted cursor-pointer z-50 bg-muted data-[hover=true]:bg-muted"
              >
                <div className="flex items-center justify-center gap-[4px]">
                  <span className="h-[4px] w-[4px] bg-muted-foreground rounded-full"></span>
                  <span className="h-[4px] w-[4px] bg-muted-foreground rounded-full"></span>
                  <span className="h-[4px] w-[4px] bg-muted-foreground rounded-full"></span>
                </div>
              </Button>
            </ButtonGroup>
          </div>

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
            <NewTaskItem />
          </div>
        </div>
      </section>
    </main>
  );
}
