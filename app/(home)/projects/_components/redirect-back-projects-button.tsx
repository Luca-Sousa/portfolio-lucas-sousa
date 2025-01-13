"use client";

import { Button } from "@/app/_components/ui/button";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";

const RedirectBackProjectsButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.8 }}
      className="size-min"
    >
      <Button
        size="icon"
        variant="ghost"
        className="min-h-9 min-w-9 rounded-full ring-primary hover:ring-1"
        asChild
      >
        <Link href="/projects" aria-label="Voltar para Projetos">
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="min-h-7 min-w-7 text-primary"
          />
        </Link>
      </Button>
    </motion.button>
  );
};

export default RedirectBackProjectsButton;
