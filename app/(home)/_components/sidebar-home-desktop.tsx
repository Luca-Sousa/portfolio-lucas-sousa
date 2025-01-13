"use client";

import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../_components/ui/card";
import SidebarCardFooter from "./sidebar-card-footer";
import SidebarCardContent from "./sidebar-card-content";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

const SidebarHomeDesktop = () => {
  return (
    <Card className="flex h-full flex-col overflow-hidden bg-popover">
      <ScrollArea>
        <CardHeader className="flex-1 items-center justify-center gap-3">
          <div className="relative size-24 overflow-hidden rounded-full bg-popover ring-2 ring-primary xl:h-72 xl:w-48">
            <Image
              alt="perfil"
              src="/perfil.png"
              fill
              className="object-cover object-top"
            />
          </div>

          <CardTitle>Lucas Sousa</CardTitle>

          <CardDescription className="rounded-xl bg-accent px-2 py-0.5 text-sm">
            Desenvolvedor Web
          </CardDescription>

          <div className="flex gap-1.5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/dasboard">
                      <Image
                        alt="Dashboard"
                        src="/dashboard.svg"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-primary font-medium text-secondary">
                  Dashboard
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/Currículo - Lucas de Sousa Silva.pdf" download>
                      <Image
                        alt="Dashboard"
                        src="/download-file.svg"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-primary font-medium text-secondary">
                  Meu Currículo
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>

        <SidebarCardContent />
        <SidebarCardFooter />
      </ScrollArea>
    </Card>
  );
};

export default SidebarHomeDesktop;
