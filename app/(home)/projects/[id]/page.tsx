import { Button } from "@/app/_components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ArrowRight, FolderGit2Icon, RocketIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RedirectBackProjectsButton from "../_components/redirect-back-projects-button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import CarouselImagesProject from "../_components/carousel-images";
import { getProjectById } from "@/app/_data_access/get-project-by-id";

interface ProjectPageProps {
  params: { id: string };
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) throw new Error("Projeto não Encontrado!");

  return (
    <>
      <div className="p-6">
        <RedirectBackProjectsButton />
      </div>

      <ScrollArea>
        <CardHeader className="gap-3 pt-0">
          <div className="space-y-3">
            <>
              <CardTitle className="sm:text-3xl">{project.title}</CardTitle>
              <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between">
                <span className="text-sm text-muted-foreground">
                  Data de Início:{" "}
                  {/* {format(project.startDate, "d 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })} */}
                </span>

                <span className="text-sm text-muted-foreground">
                  Última Atualização:{" "}
                  {/* {format(project.updatedAt, "d 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })} */}
                </span>
              </div>
            </>
            <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
          </div>

          <CardDescription>{project.description}</CardDescription>
        </CardHeader>

        <CardContent className="gap-4 2xl:flex">
          <CarouselImagesProject project={project.imagesUrl} />

          <div className="flex flex-col gap-4 lg:mx-auto lg:max-w-[600px]">
            <div className="flex flex-wrap items-center justify-center gap-3 py-3">
              {project.technologies.map((tech) => (
                <div key={tech.name} className="flex items-center gap-1">
                  <Image
                    alt={`Logo ${tech.name}`}
                    src={tech.iconURL}
                    width={16}
                    height={16}
                  />
                  <p className="text-sm">{tech.name}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto flex w-full max-w-72 flex-col gap-4 sm:max-w-[430px] sm:flex-row lg:max-w-full">
              <Button
                size={"lg"}
                className="w-full overflow-hidden bg-cyan-600 px-0 hover:bg-cyan-600"
                asChild
              >
                <Link target="_blank" href={project.repositoryUrl}>
                  <div className="flex flex-1 items-center justify-center gap-2 uppercase">
                    <FolderGit2Icon size={20} />
                    Repositório
                  </div>
                  <div className="flex h-full w-10 items-center justify-center bg-orange-400 lg:w-14">
                    <ArrowRight />
                  </div>
                </Link>
              </Button>

              <Button
                size={"lg"}
                className="w-full overflow-hidden bg-cyan-600 px-0 hover:bg-cyan-600"
                asChild
              >
                <Link target="_blank" href={project.deployUrl}>
                  <div className="flex flex-1 items-center justify-center gap-2 uppercase">
                    <RocketIcon size={20} />
                    Deploy
                  </div>
                  <div className="flex h-full w-10 items-center justify-center bg-orange-400 lg:w-14">
                    <ArrowRight />
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </>
  );
};

export default ProjectPage;
