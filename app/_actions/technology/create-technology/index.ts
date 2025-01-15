"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../../_lib/prisma";
import { createTechnologySchema, CreateTechnologySchema } from "./schema";

export const createTechnology = async (data: CreateTechnologySchema) => {
  createTechnologySchema.parse(data);

  await db.technology.create({
    data,
  });

  revalidatePath("/dashboard/projects");
};
