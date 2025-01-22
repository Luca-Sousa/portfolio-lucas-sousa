import { Button } from "@/app/_components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ChevronsRightIcon, FolderGit2Icon, RocketIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RedirectBackProjectsButton from "../_components/redirect-back-projects-button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import CarouselImagesProject from "../_components/carousel-images";
import { getProjectById } from "@/app/_data_access/get-project-by-id";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Separator } from "@/app/_components/ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";

const ProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const project = await getProjectById((await params).id);
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
                  {format(project.startDate, "d 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>

                <span className="text-sm text-muted-foreground">
                  Última Atualização:{" "}
                  {format(project.updatedAt, "d 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>
              </div>
            </>
            <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
          </div>

          <CardDescription
            dangerouslySetInnerHTML={{ __html: project.description }}
            className="prose min-w-full leading-tight text-foreground prose-headings:text-foreground prose-a:text-foreground hover:prose-a:text-primary"
          />

          <Separator className="my-4" />
        </CardHeader>

        <CardContent className="gap-4">
          <CarouselImagesProject project={project.imagesUrl} />

          <div className="flex flex-col gap-4 lg:mx-auto lg:max-w-[600px]">
            <div className="flex flex-wrap items-center justify-center gap-3 py-3">
              {project.technologies.map((tech, index) => (
                <div key={index} className="flex items-center gap-1">
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
                  <div className="flex h-full w-10 items-center justify-center bg-orange-400 lg:w-16">
                    <ChevronsRightIcon className="!size-5 lg:!size-6" />
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
                    <ChevronsRightIcon className="!size-5 lg:!size-6" />
                  </div>
                </Link>
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          {project.certificateUrl && project.certificateDesc && (
            <div className="flex flex-col items-center justify-center gap-4 xl:flex-row">
              <Button variant={"secondary"} asChild className="font-semibold">
                <Link href={project.certificateUrl} target="_blank">
                  <FontAwesomeIcon icon={faCertificate} />
                  Visualizar Certificado
                </Link>
              </Button>

              <CardDescription className="max-w-lg text-center">
                {project.certificateDesc}
              </CardDescription>
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </>
  );
};

export default ProjectPage;
