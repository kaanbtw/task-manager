"use client";

import { Checkbox } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { useState } from "react";
import { toggleTaskDone } from "../actions";
import { format } from "date-fns";

import { Icons } from "@/components/Icons";

interface Props {
  title: string;
  description: string | null;
  date: Date;
  done: boolean;
  user: string;
  id: number;
  tasks?: Props[];
}

const TaskItem = ({
  id,
  user,
  title,
  description,
  date,
  done,
  tasks,
}: Props) => {
  const [isDone, setIsDone] = useState<boolean>(done);
  const [isLoaded, setIsLoaded] = useState(true);

  function findTaskById(tasks: Props[], id: number) {
    return tasks.find((task) => task.id === id);
  }

  async function handleToggleDone(isSelected: boolean) {
    setIsDone(isSelected);
    toggleTaskDone(id, user, isSelected);
    const taskToUpdate = tasks && findTaskById(tasks, id);
    if (taskToUpdate) taskToUpdate.done = isSelected;
  }

  return (
    <div className="flex flex-col relative w-[360px] max-[360px]:w-fit h-48 max-h-48 bg-secondary rounded-xl outline outline-1 outline-border gap-4 py-4 justify-between cursor-pointer hover:outline-foreground/15 duration-300 ease-in z-20 overflow-hidden">
      <div className="flex flex-col relative h-fit px-4">
        <div className="flex justify-between h-fit items-start">
          <h2 className="relative text-xl max-w-72 max-h-16 overflow-hidden line-clamp-2">
            {title}
          </h2>

          {isLoaded && (
            <Dropdown
              placement="bottom-end"
              classNames={{
                content: "bg-secondary border border-2",
              }}
            >
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  className="min-w-unit-7 w-7 h-7 hover:bg-muted rounded-[8px] cursor-pointer z-50 bg-none data-[hover=true]:bg-muted"
                >
                  <div className="flex items-center justify-center gap-[2px]">
                    <span className="h-[3px] w-[3px] bg-muted-foreground rounded-full"></span>
                    <span className="h-[3px] w-[3px] bg-muted-foreground rounded-full"></span>
                    <span className="h-[3px] w-[3px] bg-muted-foreground rounded-full"></span>
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="bordered"
                aria-label="Static Actions"
                classNames={{
                  list: "bg-secondary",
                  base: "bg-secondary",
                  emptyContent: "bg-secondary",
                }}
              >
                <DropdownItem
                  key="edit"
                  className="text-foreground"
                  startContent={<Icons.Edit />}
                >
                  Edit Task
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  color="danger"
                  className="text-danger"
                  startContent={<Icons.Trash />}
                >
                  Delete Task
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        <p className="relative text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </div>

      <div className="flex relative justify-between px-4">
        <div className="flex items-center justify-center w-fit h-7 py-3 px-3 bg-muted rounded-[8px] gap-1 cursor-default">
          <p className="text-sm text-muted-foreground font-normal">
            {format(date, "LLLL d, yyyy")}
          </p>
        </div>

        <div className="flex items-center gap-3 h-7">
          <div className="flex items-center justify-center w-fit h-full py-3 px-3 bg-muted rounded-[8px] gap-[6px] cursor-default ">
            <p className="text-sm text-muted-foreground font-normal">
              {isDone ? "Completed" : "Active"}
            </p>
          </div>

          <Checkbox
            color="success"
            radius="sm"
            isSelected={isDone}
            onValueChange={handleToggleDone}
            classNames={{
              wrapper:
                "relative h-7 w-7 border-green-500 before:border-muted hover:before:bg-muted ring-green-500 group-data-[hover=true]:before:bg-muted",
              icon: "w-3 h-3 hover:bg-none",
              base: "border-none bg-none hover:bg-none border-green-500 p-0",
            }}
          ></Checkbox>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
