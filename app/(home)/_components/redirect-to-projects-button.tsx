"use client";

import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";

const RedirectToProjectsButton = () => {
  const router = useRouter();

  return (
    <Button
      size={"lg"}
      variant={"secondary"}
      className="ring-primary hover:ring-1"
      onClick={() => {
        router.push("/projects");
      }}
    >
      Ver Projetos
    </Button>
  );
};

export default RedirectToProjectsButton;
