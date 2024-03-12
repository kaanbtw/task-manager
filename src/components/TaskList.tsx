import TaskItem from "@/components/TaskItem";
import NewTaskModal from "@/components/NewTaskModal";
import { useState } from "react";
import { getAllTasks } from "@/app/actions";
import { parseISO, format } from "date-fns";
import { MdTask } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";

import { cn } from "@/lib/utils";

interface Task {
  user: string;
  date: Date;
  id: number;
  title: string;
  description: string | null;
  done: boolean;
}

const TaskList = async ({ username }: { username: string }) => {
  let tasks: Task[] = [];

  await getAllTasks(username).then((data) => {
    tasks = data;
  });

  return (
    <section className="flex justify-center relative w-full h-full min-[800px]:h-[78%] overflow-x-hidden">
      <div className="flex w-fit p-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border justify-center">
        <div
          className={cn(
            "grid-cols-1 gap-6 min-[800px]:grid-cols-2 min-[1400px]:grid-cols-3 min-[1800px]:grid-cols-4 justify-items-center relative w-full px-2 sm:px-10",
            tasks.length <= 0
              ? "flex h-full justify-center items-center"
              : "grid h-fit"
          )}
        >
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  title={task.title}
                  description={task.description ?? ""}
                  date={format(task.date, "LLLL d, yyyy")}
                />
              );
            })
          ) : (
            <div className="flex items-center justify-center relative w-48 h-80 bottom-4">
              <MdTask className="w-28 h-28" />
              <div className="absolute left-0 top-0 w-full h-full ">
                <FaStar className="absolute w-6 h-6 left-6 top-20 drop-shadow-glow" />
                <FaStar className="absolute w-6 h-6 right-4 top-32 drop-shadow-glow" />
                <FaRegStar className="absolute w-6 h-6 left-8 bottom-[72px] drop-shadow-glow " />
              </div>

              <h2 className="absolute bottom-4 text-2xl font-medium whitespace-nowrap">
                No Tasks
              </h2>
              <h2 className="absolute -bottom-4 text-base font-light whitespace-nowrap text-muted-foreground">
                You have no available tasks
              </h2>
            </div>
          )}
          {tasks.length > 0 && <NewTaskModal buttonType="big" />}
        </div>
      </div>
    </section>
  );
};

export default TaskList;
