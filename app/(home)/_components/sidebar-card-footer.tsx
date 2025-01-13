import { Button } from "@/app/_components/ui/button";
import { CardFooter } from "@/app/_components/ui/card";
import { itemsNetworks } from "@/app/_constants";
import Image from "next/image";
import Link from "next/link";

const SidebarCardFooter = () => {
  return (
    <CardFooter className="space-x-3 xl:flex xl:justify-center xl:pt-3">
      {itemsNetworks.map(({ title, link, icon }) => (
        <Button
          key={title}
          size={"icon"}
          variant={"link"}
          className="size-8 rounded-full ring-primary hover:scale-110 hover:ring-2"
          asChild
        >
          <Link href={link} target="_blank">
            <Image src={icon} alt={"Imagem " + title} width={24} height={24} />
          </Link>
        </Button>
      ))}
    </CardFooter>
  );
};

export default SidebarCardFooter;
