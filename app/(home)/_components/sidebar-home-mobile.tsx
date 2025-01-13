"use client";

import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../_components/ui/card";
import { Button } from "../../_components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import SidebarHomeInfo from "./sidebar-card-content";
import SidebarCardFooter from "./sidebar-card-footer";

const SidebarHomeMobile = () => {
  const [detailsSidebar, setDetailsSidebar] = useState<boolean>(false);

  return (
    <Card className="bg-popover">
      <CardHeader className="relative flex-row items-center gap-4 py-3 sm:py-4">
        <Button
          variant="outline"
          className="group absolute right-0 top-0 rounded-bl-3xl rounded-tr-lg border sm:w-36"
          onClick={
            detailsSidebar
              ? () => setDetailsSidebar(false)
              : () => setDetailsSidebar(true)
          }
        >
          {detailsSidebar ? (
            <ChevronUp
              className="text-primary group-hover:scale-125 sm:hidden"
              size={16}
            />
          ) : (
            <ChevronDown
              className="text-primary group-hover:scale-125 sm:hidden"
              size={16}
            />
          )}

          <p className="hidden text-xs text-primary sm:block">
            {detailsSidebar ? "Esconder Contatos" : "Mostrar Contatos"}
          </p>
        </Button>

        <div className="relative size-24 overflow-hidden rounded-full bg-popover ring-2 ring-primary">
          <Image
            alt="perfil"
            src="/perfil.png"
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="flex flex-col gap-3">
          <CardTitle className="text-xl">Lucas Sousa</CardTitle>

          <CardDescription className="rounded-xl bg-accent px-2 py-0.5 text-sm">
            Desenvolvedor Web
          </CardDescription>
        </div>
      </CardHeader>

      {detailsSidebar && <SidebarHomeInfo />}

      {detailsSidebar && <SidebarCardFooter />}
    </Card>
  );
};

export default SidebarHomeMobile;
