"use server";

import { db } from "../../../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../_lib/auth";
import { upsertProjectSchema, UpsertProjectSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const upsertProject = async (data: UpsertProjectSchema) => {
  upsertProjectSchema.parse(data);
  const user = await getServerSession(authOptions);

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  await db.project.upsert({
    where: {
      id: data.id ?? "",
    },
    update: {
      ...data,
      technologies: {
        // TODO delete Technologies
        deleteMany: {},
        create: data.technologies.map((techId) => ({
          technology: {
            connect: { id: techId },
          },
        })),
      },
    },
    create: {
      ...data,
      technologies: {
        create: data.technologies.map((techId) => ({
          technology: {
            connect: { id: techId },
          },
        })),
      },
    },
  });

  revalidatePath("/dashboard/projects");
  revalidatePath("/projects");
};
