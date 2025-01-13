import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import Image from "next/image";
import { ScrollArea } from "../_components/ui/scroll-area";
import RedirectToProjectsButton from "./_components/redirect-to-projects-button";

const Home = () => {
  return (
    <>
      <CardHeader className="space-y-4">
        <div className="space-y-3">
          <CardTitle className="sm:text-3xl">Sobre</CardTitle>
          <div className="h-1 w-8 rounded-3xl bg-primary sm:h-2"></div>
        </div>
      </CardHeader>

      <ScrollArea>
        <CardContent className="space-y-4">
          <CardDescription>
            Sou um Desenvolvedor Web com a missão de criar experiências digitais
            agradáveis e intuitivas. Estou sempre me desafiando com novos
            projetos e buscando feedback na comunidade de programação, além de
            compartilhar meus conhecimentos. Atualmente, estou em busca do meu
            primeiro trabalho como desenvolvedor web. Meu objetivo é se tornar
            desenvolvedor Full-Stack.
          </CardDescription>

          <CardDescription>
            Atualmente sou graduando de Ciências da Computação (5° Semestre), no{" "}
            <Link
              className="text-primary hover:underline"
              target="_blank"
              href={"https://ifce.edu.br/"}
            >
              Instituto Federal do Ceará (IFCE)
            </Link>{" "}
            e estou me aprofundando em fundamentos de computação e programação.
            Paralelamente aos estudos acadêmicos, tenho procurado expandir meus
            conhecimentos através de documentações online e também em
            plataformas online, como o{" "}
            <Link
              className="hover:text-primary hover:underline"
              target="_blank"
              href={"https://lp.fullstackclub.com.br/"}
            >
              Full Stack Club
            </Link>
            ,{" "}
            <Link
              className="hover:text-primary hover:underline"
              target="_blank"
              href={"https://www.rocketseat.com.br/"}
            >
              RocketSeat
            </Link>
            ,{" "}
            <Link
              className="hover:text-primary hover:underline"
              target="_blank"
              href={"https://cursos.dankicode.com/"}
            >
              Danki Code
            </Link>
            , e canais de programação e tecnologias no YouTube, dentre outras
            plataformas.
          </CardDescription>

          <h3 className="text-lg font-semibold">Desenvolvendo: </h3>

          <Card className="rounded-2xl text-center lg:max-w-[50%]">
            <CardHeader className="flex items-center justify-center">
              <Image
                alt="Logo Web Development"
                src="/web-development-icon.svg"
                width={50}
                height={50}
              />

              <CardTitle className="text-base">Web Development</CardTitle>

              <CardDescription className="text-gray-300">
                Tenho desenvolvido aplicações web a nível Júnior e venho
                buscando desenvolver mais ainda minhas skills.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex justify-end">
              <RedirectToProjectsButton />
            </CardContent>
          </Card>
        </CardContent>
      </ScrollArea>
    </>
  );
};

export default Home;
