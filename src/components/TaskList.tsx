import TaskItem from "@/components/TaskItem";
import NewTaskModal from "@/components/NewTaskModal";
import { useState } from "react";
import { getAllTasks } from "@/app/actions";
import { parseISO, format } from "date-fns";

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
        <div className="grid grid-cols-1 gap-6 min-[800px]:grid-cols-2 min-[1400px]:grid-cols-3 min-[1800px]:grid-cols-4 justify-items-center relative w-full h-fit px-2 sm:px-10">
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
            <p>TODO</p>
          )}
          {tasks.length > 0 && <NewTaskModal buttonType="big" />}
        </div>
      </div>
    </section>
  );
};

export default TaskList;
