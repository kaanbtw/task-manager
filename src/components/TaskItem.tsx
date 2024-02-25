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
import { Skeleton } from "@nextui-org/react";

import { Icons } from "@/components/Icons";

interface Props {
  title: string;
  description?: string;
  date: string;
}

const TaskItem = ({ title, description, date }: Props) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(true);

  return (
    <div className="flex flex-col relative w-[360px] max-[360px]:w-fit h-48 max-h-48 bg-secondary rounded-xl outline outline-1 outline-border gap-4 py-4 justify-between cursor-pointer hover:outline-foreground/15 duration-300 ease-in z-20 overflow-hidden">
      <div className="flex flex-col relative h-fit px-4">
        <div className="flex justify-between h-fit items-start">
          {isLoaded ? (
            <h2 className="relative text-xl max-w-72 max-h-16 overflow-hidden line-clamp-2">
              {title}
            </h2>
          ) : (
            <Skeleton isLoaded={isLoaded} className="h-7 w-56 rounded-[6px]" />
          )}

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
        {isLoaded ? (
          <p className="relative text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        ) : (
          <Skeleton
            isLoaded={isLoaded}
            className="mt-2 h-12 rounded-[6px] w-full"
          />
        )}
      </div>

      <div className="flex relative justify-between px-4">
        {isLoaded ? (
          <div className="flex items-center justify-center w-fit h-7 py-3 px-3 bg-muted rounded-[8px] gap-1 cursor-default">
            <p className="text-sm text-muted-foreground font-normal">{date}</p>
          </div>
        ) : (
          <Skeleton
            isLoaded={isLoaded}
            className="relative rounded-[8px] w-24 h-7"
          />
        )}

        {isLoaded ? (
          <div className="flex items-center gap-3 h-7">
            <div className="flex items-center justify-center w-fit h-full py-3 px-3 bg-muted rounded-[8px] gap-[6px] cursor-default ">
              <p className="text-sm text-muted-foreground font-normal">
                {isSelected ? "Complete" : "Incomplete"}
              </p>
            </div>

            <Checkbox
              color="success"
              radius="sm"
              isSelected={isSelected}
              onValueChange={setIsSelected}
              classNames={{
                wrapper:
                  "relative h-7 w-7 border-green-500 before:border-muted hover:before:bg-muted ring-green-500 group-data-[hover=true]:before:bg-muted",
                icon: "w-3 h-3 hover:bg-none",
                base: "border-none bg-none hover:bg-none border-green-500 p-0",
              }}
            ></Checkbox>
          </div>
        ) : (
          <Skeleton
            isLoaded={isLoaded}
            className="flex items-center relative rounded-[6px] w-28 h-7"
          />
        )}
      </div>
    </div>
  );
};

export default TaskItem;
