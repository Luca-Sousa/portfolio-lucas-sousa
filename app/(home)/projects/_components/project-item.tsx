"use client";

import { FolderOpenDotIcon } from "lucide-react";
import { Badge } from "../../../_components/ui/badge";
import Image from "next/image";
import { ProjectStatus, Technology } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faFileCode,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

interface ProjectItemProps {
  project: {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    status: ProjectStatus;
    technologies: Technology[];
  };
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const router = useRouter();

  return (
    <Card className="overflow-hidden">
      <div>
        <Button
          title="Ver Projeto"
          variant={"ghost"}
          className="relative aspect-square size-full overflow-hidden rounded-none"
          onClick={() => {
            router.push(`/projects/${project.id}`);
          }}
        >
          <Image
            className="object-left-top"
            src={project.thumbnailUrl}
            alt={project.title}
            fill
          />

          <Badge
            className="absolute right-2 top-2 space-x-1.5 px-1.5 py-1 text-xs font-medium"
            variant="secondary"
          >
            {project.status === ProjectStatus.IN_PROGRESS && (
              <div className="flex animate-bounce items-center justify-center">
                <FontAwesomeIcon icon={faFileCode} className="text-primary" />
              </div>
            )}

            {project.status === ProjectStatus.IN_PRODUCTION && (
              <div className="flex animate-pulse items-center justify-center">
                <FontAwesomeIcon icon={faStar} className="text-primary" />
              </div>
            )}

            {project.status === ProjectStatus.IN_UPDATE && (
              <div className="flex animate-spin items-center justify-center">
                <FontAwesomeIcon
                  icon={faArrowRotateRight}
                  className="text-primary"
                />
              </div>
            )}

            {project.status === "IN_PRODUCTION" && <span>Finalizado</span>}
            {project.status === "IN_UPDATE" && <span>Atualização</span>}
            {project.status === "IN_PROGRESS" && <span>Desenvolvimento</span>}
          </Badge>
        </Button>
      </div>

      <CardHeader className="p-4">
        <CardTitle className="truncate text-sm font-bold text-primary">
          {project.title}
        </CardTitle>

        <CardDescription
          dangerouslySetInnerHTML={{ __html: project.description }}
          className="prose-sm line-clamp-4 max-h-16 min-h-16 prose-headings:text-xs prose-headings:font-normal prose-a:pointer-events-none"
        />
      </CardHeader>

      <CardFooter className="flex flex-col gap-4 px-4 pb-4">
        <div className="flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {project.technologies.map((tech) => (
            <Image
              key={tech.id}
              title={tech.name}
              alt={`Logo ${tech.name}`}
              src={tech.iconURL}
              width={24}
              height={24}
            />
          ))}
        </div>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            router.push(`/projects/${project.id}`);
          }}
        >
          <FolderOpenDotIcon size={16} className="mr-2" />
          Ver Projeto
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectItem;
