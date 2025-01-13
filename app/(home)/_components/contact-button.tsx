"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Contact2Icon } from "lucide-react";
import { useState } from "react";

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
          <Contact2Icon size={22} />
          Contato
        </Button>
      </SheetTrigger>
    </Sheet>
  );
};

export default ContactButton;
