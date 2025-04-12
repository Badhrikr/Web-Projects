import { ApplicationRoles } from "../shared/enums";
import Icon from "../ui-components/Icon";
import {
  file,
  file_protected,
  thumbs_up,
  tick,
  tick_circle,
  application,
  date,
  calendar,
  chevron_left,
} from "./icons";

export function getMigrationRequestWorkspaceMenu(role: ApplicationRoles) {
  const goBackRoute =
    role === ApplicationRoles.SALES_PERSON
      ? "/sales/customers/[customerid]/workspace/migration-requests"
      : "/customer/[customerid]/workspace/migration-requests";

  const routerPrefix =
    role === ApplicationRoles.SALES_PERSON
      ? "/sales/customers/[customerid]/workspace/migration-requests/[migrationrequestid]/workspace"
      : "/customer/[customerid]/workspace/migration-requests/[migrationrequestid]/workspace";

  return [
    {
      menuText: "Go Previous",
      routerLink: ` ${goBackRoute}`,
      icon: <Icon icon={chevron_left} size="lg" theme="secondary" />,
    },
    {
      menuText: "Request Tracker",
      routerLink: `${routerPrefix}/request-tracker`,
      icon: (
        <Icon
          icon={application}
          size="lg"
          theme="secondary"
          className="[&>svg]:!stroke-transparent [&>svg]:!fill-[#df5000]"
        />
      ),
    },
    // {
    //   menuText: "Files",
    //   routerLink: `${routerPrefix}/files`,
    //   icon: (
    //     <Icon
    //       icon={file}
    //       size="lg"
    //       theme="secondary"
    //       className="[&>svg]:!stroke-transparent [&>svg]:!fill-[#E5A755]"
    //     />
    //   ),
    // },
    // {
    //   menuText: "Signed Documents",
    //   routerLink: `${routerPrefix}/signed-documents`,
    //   icon: (
    //     <Icon
    //       icon={file_protected}
    //       size="lg"
    //       theme="secondary"
    //       iconType="solid"
    //       className="[&>svg]:!fill-[#3CB548]"
    //     />
    //   ),
    // },
    // {
    //   menuText: "Responsibility Matrix",
    //   routerLink: `${routerPrefix}/responsibility-matrix`,
    //   icon: (
    //     <Icon
    //       icon={thumbs_up}
    //       size="lg"
    //       theme="secondary"
    //       iconType="solid"
    //       className="[&>svg]:!fill-[#629BF1]"
    //     />
    //   ),
    // },
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
