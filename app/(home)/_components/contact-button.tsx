"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Contact from "./contact";

const ContactButton = () => {
  const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button
          size={"sm"}
          variant={"default"}
          className="flex items-center justify-center gap-1 px-3 font-semibold text-secondary"
        >
          <FontAwesomeIcon icon={faAddressBook} />
          <span className="hidden min-[480px]:block">Contato</span>
        </Button>
      </SheetTrigger>

      <Contact onSuccess={() => setSheetIsOpen(false)} />
    </Sheet>
  );
};

export default ContactButton;
