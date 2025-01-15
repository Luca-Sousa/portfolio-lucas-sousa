import { db } from "../_lib/prisma";

export const getProjectAllTechnologies = async () => {
  const projects = await db.project.findMany({
    include: {
      technologies: {
        include: {
          technology: {
            select: {
              iconURL: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return projects.map((project) => ({
    ...project,
    technologies: project.technologies.map((tech) => ({
      id: tech.technologyId,
      name: tech.technology.name,
      iconURL: tech.technology.iconURL,
    })),
  }));
};
