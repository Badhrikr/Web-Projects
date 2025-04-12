import { ApplicationRoles } from "../shared/enums";
import Icon from "../ui-components/Icon";
import { calendar, information_circle, stack, statistics } from "./icons";

export function getCustomerWorkspaceMenu(role: ApplicationRoles) {
  const routerPrefix =
    role === ApplicationRoles.SALES_PERSON
      ? "/sales/customers/[customerid]/workspace"
      : "/customer/[customerid]/workspace";

  return [
    {
      menuText: "Dashboard",
      routerLink: `${routerPrefix}/dashboard`,
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
      menuText: "Information",
      routerLink: `${routerPrefix}/information`,
      icon: (
        <Icon
          icon={information_circle}
          size="lg"
          theme="secondary"
          iconType="outline"
          className="[&>svg]:!stroke-[#FF5852]"
        />
      ),
    },
    {
      menuText: "Migration Requests",
      routerLink: `${routerPrefix}/migration-requests`,
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
      routerLink: `${routerPrefix}/calendar`,
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
  ];
}
