"use client";

import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

let tabs = [
  { id: "all", label: "All Tasks" },
  { id: "active", label: "Active Tasks" },
  { id: "completed", label: "Completed Tasks" },
];

const Navbar = ({ username }: { username: string }) => {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="hidden min-[800px]:flex relative w-full h-[11%] items-center justify-center z-50">
      <div className="flex min-[800px]:w-[746px] min-[1400px]:w-[1130px] min-[1800px]:w-[1514px] h-2.8/6 px-6 bg-nav-background/50 backdrop-blur-xl rounded-xl items-center justify-center">
        <div className="hidden absolute left-4 min-[1400px]:flex items-center justify-center gap-3 py-2 px-4 rounded-lg text-nav-primary h-9">
          <Icons.User />
          <p className="text-sm font-normal">{username}</p>
        </div>

        <div className="flex h-fit gap-5">
          {tabs.map((tab) => (
            <div
              className="group flex flex-col relative py-3 rounded-[10px] items-center text-foreground/80 cursor-pointer"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <div
                className={cn(
                  "flex items-center justify-center gap-1 p-2 rounded-lg text-nav-secondary",
                  activeTab === tab.id && "text-nav-primary"
                )}
              >
                {tab.id === "all" && <Icons.Tasks />}
                {tab.id === "active" && <Icons.TaskX />}
                {tab.id === "completed" && <Icons.Task />}

                <p className="text-sm font-normal">{tab.label}</p>

                {activeTab === tab.id && (
                  <motion.span
                    layoutId="background"
                    className="absolute w-[calc(100%_+_16px)] h-9 gap-1 rounded-lg z-10 bg-muted outline outline-1 outline-nav-secondary/10 outline-offset-2"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="solid"
          onClick={() => signOut(() => router.push("/signin"))}
          className="hidden absolute right-4 min-[1400px]:flex items-center justify-center gap-1 py-2 px-4 rounded-lg text-nav-primary bg-muted h-9 cursor-pointer hover:outline outline-1 outline-nav-secondary/10"
        >
          <Icons.Logout />
          <p className="text-sm font-normal">Log Out</p>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
