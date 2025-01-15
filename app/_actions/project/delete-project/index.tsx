"use server";

import { db } from "@/app/_lib/prisma";
import { deleteProjectSchema, DeleteProjectSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteProject = async ({ id }: DeleteProjectSchema) => {
  deleteProjectSchema.parse({ id });

  await db.project.delete({
    where: { id },
  });

  revalidatePath("/dashboard/projects");
  revalidatePath("/projects");
};
