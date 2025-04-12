import { ApplicationRoles } from "../shared/enums";
import Icon from "../ui-components/Icon";
import {
  arrow_trending_up,
  calendar,
  callback_request,
  demo_request,
  folder_open,
  home_icon,
  image,
  stack,
  statistics,
  users,
  work,
} from "./icons";

export interface MenuProps {
  menuText: string;
  icon?: JSX.Element;
  routerLink: string;
}

export const defaultMenu = [
  {
    menuText: "Home",
    routerLink: "/",
    icon: (
      <Icon
        icon={home_icon}
        size="md"
        theme="primary"
        className="[&>svg]:!fill-[#6C63FF]"
        iconType="solid"
      />
    ),
  },
  {
    menuText: "Callback Request",
    routerLink: "/create-callback-request",
    icon: (
      <Icon
        icon={callback_request}
        size="md"
        theme="primary"
        className="[&>svg]:!stroke-[#458EFF] [&>svg]:!fill-[#458EFF]"
        iconType="solid"
      />
    ),
  },
  {
    menuText: "Demo Request",
    routerLink: "/create-demo-request",
    icon: (
      <Icon
        icon={demo_request}
        size="md"
        theme="primary"
        className="[&>svg]:!fill-[#37C6FF]"
        iconType="solid"
      />
    ),
  },
];

const roleBasedMenu: Record<ApplicationRoles, Array<MenuProps>> = {
  [ApplicationRoles.SALES_PERSON]: [
    {
      menuText: "Dashboard",
      routerLink: "/sales/dashboard",
      icon: (
        <Icon
          icon={statistics}
          size="lg"
          theme="secondary"
          className="[&>svg]:!stroke-[#d65076]"
        />
      ),
    },
    {
      menuText: "Leads",
      routerLink: "/sales/leads",
      icon: (
        <Icon
          icon={arrow_trending_up}
          size="lg"
          theme="primary"
          className="[&>svg]:!stroke-[#5A8DF7]"
          iconType="outline"
        />
      ),
    },
    {
      menuText: "Customers",
      routerLink: "/sales/customers",
      icon: (
        <Icon
          icon={users}
          size="lg"
          theme="primary"
          className="[&>svg]:!stroke-[#5A8DF7]"
          iconType="outline"
        />
      ),
    },
    {
      menuText: "Viewed Contents",
      routerLink: "/sales/viewed-contents",
      icon: (
        <Icon
          icon={image}
          size="lg"
          theme="primary"
          className="[&>svg]:!stroke-[#FF5852]"
          iconType="outline"
        />
      ),
    },
    {
      menuText: "Migration Requests",
      routerLink: "/sales/migration-requests",
      icon: (
        <Icon
          icon={stack}
          size="lg"
          theme="secondary"
          iconType="outline"
          className="[&>svg]:!stroke-[#2ab7ca]"
        />
      ),
    },
    {
      menuText: "Calendar",
      routerLink: `/sales/calendar`,
      icon: (
        <Icon
          icon={calendar}
          size="lg"
          theme="secondary"
          iconType="solid"
          className="[&>svg]:!fill-[#5b63fe]"
        />
      ),
    },
    {
      menuText: "Repository",
      routerLink: `/sales/repository`,
      icon: (
        <Icon
          icon={folder_open}
          size="lg"
          theme="secondary"
          iconType="outline"
          className="[&>svg]:!stroke-[#E5A755]"
        />
      ),
    },
  ],
  [ApplicationRoles.ADMIN]: [],
  [ApplicationRoles.DELIVERY_PARTNER]: [],
  [ApplicationRoles.CUSTOMER]: [
    {
      menuText: "Home",
      routerLink: "/",
      icon: (
        <Icon
          icon={home_icon}
          size="md"
          theme="primary"
          className="[&>svg]:!fill-[#6C63FF]"
          iconType="solid"
        />
      ),
    },
    {
      menuText: "Workspace",
      routerLink: "/customer/[customerid]/workspace/migration-requests",
      icon: (
        <Icon
          icon={work}
          size="md"
          theme="secondary"
          iconType="solid"
          className="[&>svg]:!fill-[#FF5852]"
        />
      ),
    },
  ],
};

export default roleBasedMenu;
