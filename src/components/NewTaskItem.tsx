import { Icons } from "@/components/Icons";

const NewTaskItem = () => {
  return (
    <div className="flex relative items-center justify-center w-[360px] max-[360px]:w-fit h-48 max-h-48 rounded-xl border-2 border-dashed border-border gap-4 py-4 cursor-pointer hover:bg-muted hover:border-muted-foreground group">
      <Icons.Plus className="text-muted-foreground group-hover:text-foreground" />
      <p className="text-muted-foreground group-hover:text-foreground">
        Create New Task
      </p>
    </div>
  );
};

export default NewTaskItem;
