"use server";

import { z } from "zod";
import { taskSchema } from "@/lib/validations/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs";

export async function createTask(values: z.infer<typeof taskSchema>) {
  const user = await currentUser();

  if (!user?.username) return;

  await db.insert(tasks).values({
    user: user.username,
    title: values.title,
    description: values.description,
  });
}
