"use server";

import { z } from "zod";
import { taskSchema } from "@/lib/validations/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTask(values: z.infer<typeof taskSchema>) {
  const user = await currentUser();

  if (!user?.username) return;

  let result = await db.insert(tasks).values({
    user: user.username,
    title: values.title,
    description: values.description,
  });

  revalidatePath("/tasks");
  return result;
}

export async function getAllTasks() {
  const user = await currentUser();

  if (!user?.username) return [];

  return await db
    .select()
    .from(tasks)
    .where(eq(tasks.user, user.username))
    .orderBy(tasks.date);
}
