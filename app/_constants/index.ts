import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  CalendarDaysIcon,
  FolderKanbanIcon,
  LayoutDashboardIcon,
  MailIcon,
  MapPinHouseIcon,
  SmartphoneIcon,
} from "lucide-react";

export const itemsMailTel = [
  {
    label: "email",
    value: "lucas.sousa.dev@gmail.com",
    icon: MailIcon,
  },
  {
    label: "telefone",
    value: "+55 (88) 99454-5892",
    icon: SmartphoneIcon,
  },
];

export const itemsNiverAddress = [
  {
    label: "Data de Nascimento",
    value: "27/09/1999",
    icon: CalendarDaysIcon,
  },
  {
    label: "Endereço",
    value: "Ubajara, Ceará",
    icon: MapPinHouseIcon,
  },
];

export const itemsNetworks = [
  {
    title: "Github",
    link: "https://github.com/Luca-Sousa",
    icon: faGithub,
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/lucas-sousa-0b79a72a7/",
    icon: faLinkedin,
  },
  {
    title: "Facebook",
    link: "https://www.facebook.com/LukeSousa21/",
    icon: faFacebook,
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/lk._dev/",
    icon: faInstagram,
  },
];

export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      isActive: true,
    },
    {
      title: "Projetos",
      url: "/dashboard/projects",
      icon: FolderKanbanIcon,
    },
  ],
};
