import { Button } from "@/app/_components/ui/button";
import { CardFooter } from "@/app/_components/ui/card";
import { itemsNetworks } from "@/app/_constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SidebarCardFooter = () => {
  return (
    <CardFooter className="space-x-3 xl:flex xl:justify-center xl:pt-3">
      {itemsNetworks.map(({ title, link, icon }) => (
        <Button
          key={title}
          size={"icon"}
          variant={"link"}
          className="size-8 rounded-full ring-primary transition-all hover:scale-110 hover:ring-2"
          asChild
        >
          <Link href={link} target="_blank">
            <FontAwesomeIcon
              icon={icon}
              className="min-h-6 min-w-6 text-foreground"
            />
          </Link>
        </Button>
      ))}
    </CardFooter>
  );
};

export default SidebarCardFooter;
