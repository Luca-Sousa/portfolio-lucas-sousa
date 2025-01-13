import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import ProjectItem from "./_components/project-item";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { getProjects } from "@/app/_data_access/get-projects";

const Projects = async () => {
  const projects = await getProjects({});

  return (
    <>
      <CardHeader className="space-y-3">
        <div className="space-y-1 sm:space-y-3">
          <CardTitle className="sm:text-3xl">Projetos</CardTitle>
          <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
        </div>
      </CardHeader>

      <ScrollArea className="h-full">
        <CardContent className="space-y-6">
          <div className="mx-auto grid max-w-80 gap-4 sm:mx-0 sm:max-w-full sm:grid-cols-2 lg:grid-cols-3 min-[1460px]:grid-cols-4">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </>
  );
};

export default Projects;
