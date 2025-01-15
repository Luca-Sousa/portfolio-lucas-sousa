"use client";

import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactButton from "./contact-button";

const NavbarHome = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Sobre", href: "/" },
    { label: "Resumo", href: "/summary" },
    { label: "Projetos", href: "/projects" },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full max-w-full items-center justify-center rounded-t-3xl border-t-4 border-muted-foreground bg-card py-4 sm:absolute sm:inset-0 sm:left-full sm:h-16 sm:max-w-sm sm:-translate-x-full sm:rounded-bl-3xl sm:rounded-tl-none sm:rounded-tr-lg sm:border-0 sm:py-0 md:max-w-md lg:max-w-lg">
      <div className="flex h-full items-center gap-6 md:gap-6 lg:gap-8">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Button
              key={item.href}
              variant="secondary"
              className={`${
                isActive
                  ? "border-primary text-primary xl:mt-1 xl:border-b-4"
                  : ""
              } h-full w-full justify-start rounded-none bg-card p-0 text-base hover:bg-card hover:text-primary`}
              asChild
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          );
        })}

        <ContactButton />
      </div>
    </div>
  );
};

export default NavbarHome;
