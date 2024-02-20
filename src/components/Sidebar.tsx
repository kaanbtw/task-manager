import { Icons } from "@/components/Icons";

const Sidebar = () => {
  return (
    <nav className="flex-col w-1/6 h-full border-r lg:flex hidden items-center justify-center gap-3 cursor-pointer">
      <div className="flex h-10 w-5/6 rounded-[8px] items-center bg-secondary px-3 gap-2 text-foreground/80">
        <Icons.Tasks className="text-xl" />
        <p className="text-base font-light">All Tasks</p>
      </div>
      <div className="flex h-10 w-5/6 rounded-[8px] items-center px-3 gap-2 text-muted-foreground cursor-pointer hover:outline outline-border outline-1">
        <Icons.Task className="text-xl" />
        <p className="text-base font-light">Complete Tasks</p>
      </div>
      <div className="flex h-10 w-5/6 rounded-[8px] items-center px-3 gap-2 text-muted-foreground cursor-pointer hover:outline outline-border outline-1">
        <Icons.TaskX className="text-xl" />
        <p className="text-base font-light">Incomplete Tasks</p>
      </div>
    </nav>
  );
};

export default Sidebar;
