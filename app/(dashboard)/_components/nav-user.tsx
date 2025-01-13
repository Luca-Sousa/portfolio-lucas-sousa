"use client";

import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  MailCheckIcon,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/_components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function NavUser() {
  const { isMobile, setOpenMobile } = useSidebar();
  const { data } = useSession();

  const handleSignOutWithGoogleClick = () => {
    signOut();
    redirect("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                tooltip={"Perfil"}
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    className="rounded-full"
                    src={"/perfil.png"}
                    alt="Imagem do usuário"
                  />
                  <AvatarFallback className="rounded-lg">LS</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data?.user?.name}
                  </span>
                  <span className="truncate text-xs">{data?.user?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      className="rounded-full"
                      src={"/perfil.png"}
                      alt="Imagem do usuário"
                    />
                    <AvatarFallback className="rounded-lg">LS</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {data?.user?.name}
                    </span>
                    <span className="truncate text-xs">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setOpenMobile(false)}
                  >
                    <MailCheckIcon />
                    Mensagens
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem disabled className="cursor-pointer">
                  <BadgeCheck />
                  Configurar Conta
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Button
                  className="w-full cursor-pointer justify-start bg-destructive/70 focus:bg-destructive focus-visible:ring-0"
                  variant="destructive"
                  onClick={handleSignOutWithGoogleClick}
                >
                  <LogOut />
                  Sair da Conta
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>

            <DialogContent className="flex-grow">
              <DialogHeader>
                <DialogTitle>Mensagens Recebidas</DialogTitle>
                <DialogDescription>
                  Mensagens de contato do Portfólio
                </DialogDescription>
              </DialogHeader>

              <ScrollArea>Conteúdo da Configuração da Conta</ScrollArea>
            </DialogContent>
          </DropdownMenu>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
