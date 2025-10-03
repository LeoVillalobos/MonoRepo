import {
  LayoutDashboardIcon,
  NotebookIcon
} from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: "Home" },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/main"
  },
  { header: "Calendario" },
  {
    title: "Calendario",
    icon: NotebookIcon,
    to: "/calendar"
  },
  // { header: "Accounts" },
  // {
  //   title: "Cuentas",
  //   icon: AlienIcon,
  //   to: "/account"
  // },
];

export default sidebarItem;
