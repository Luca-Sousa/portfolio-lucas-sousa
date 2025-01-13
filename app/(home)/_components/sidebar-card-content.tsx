import { Button } from "@/app/_components/ui/button";
import { CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { itemsMailTel, itemsNiverAddress } from "@/app/_constants";
import Link from "next/link";
import { toast } from "sonner";

const SidebarCardContent = () => {
  const handleCopyItemsClick = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    toast.success(
      `${label.charAt(0).toUpperCase() + label.slice(1)} copiado com sucesso!`,
    );
  };

  return (
    <CardContent className="space-y-4 sm:space-y-6">
      <Separator className="my-4" />

      <div className="flex flex-col gap-4 sm:flex-row lg:items-center lg:gap-8 xl:flex-col xl:gap-4">
        {itemsMailTel.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex gap-4 sm:basis-1/2 sm:flex-col lg:flex-1 lg:basis-0 lg:flex-row xl:w-full"
          >
            <div className="flex flex-1 items-center gap-4">
              <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
                <Icon className="text-primary" size={20} />
              </div>

              <div className="space-y-1 text-sm">
                <h3 className="uppercase text-zinc-400">{label}</h3>
                <Link
                  className="hover:text-primary"
                  href={`${label === "email" ? "mailto" : "tel"}:${value}`}
                >
                  {value}
                </Link>
              </div>
            </div>

            <Button
              className="hidden min-[450px]:block sm:ml-[52px] sm:block sm:w-1/2 lg:ml-0 lg:w-auto"
              variant="outline"
              onClick={() => handleCopyItemsClick(label, value)}
            >
              Copiar
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row lg:gap-8 xl:flex-col xl:gap-4">
        {itemsNiverAddress.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 sm:basis-1/2 lg:flex-1 lg:basis-0"
          >
            <div className="rounded-xl border border-zinc-900 bg-zinc-800 p-2">
              <Icon className="text-primary" size={20} />
            </div>

            <div className="flex-1 space-y-1 text-sm">
              <h3 className="uppercase text-zinc-400">{label}</h3>
              <p>{value}</p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />
    </CardContent>
  );
};

export default SidebarCardContent;
