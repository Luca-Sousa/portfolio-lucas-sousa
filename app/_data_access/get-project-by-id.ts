import { db } from "../_lib/prisma";

export const getProjectById = async (id: string) => {
  const project = await db.project.findUnique({
    where: { id },
    include: {
      technologies: {
        include: {
          technology: true,
        },
      },
    },
  });

  if (!project) return null;

  return {
    ...project,
    technologies: project.technologies.map((tech) => ({
      id: tech.technologyId,
      name: tech.technology.name,
      iconURL: tech.technology.iconURL,
    })),
  };
};
