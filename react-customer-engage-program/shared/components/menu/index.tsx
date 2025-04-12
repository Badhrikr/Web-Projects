import { useRouter } from "next/router";
import { useMemo } from "react";
import getRoleBasedMenu from "../../../helpers/get-role-based-menu";
import { hamburger } from "../../../helpers/icons";
import useLogin from "../../../hooks/use-login";
import Icon from "../../../ui-components/Icon";
import { ApplicationRoles } from "../../enums";

function Menu({ close }: { close: () => void }) {
  const router = useRouter();

  const { roles, customerId } = useLogin();

  const menu = useMemo(() => getRoleBasedMenu(roles?.[0]), [roles]);

  const routerClickHandler = (routerLink: string) => {
    console.log(customerId);

    router.push({
      pathname: routerLink,
      ...(roles?.includes(ApplicationRoles.CUSTOMER) &&
        customerId && {
          query: { customerid: customerId ?? "unknown" },
        }),
    });
  };

  return (
    <div className="h-full min-w-[250px] flex flex-col gap-2 bg-theme-background-popup shadow-2xl">
      {/* // REMOVE NAVBAR TOP BACKGROUND COLOR, ICON COLOR */}
      <div className="px-6 py-4">
        <span onClick={close}>
          <Icon
            icon={hamburger}
            size="lg"
            theme="secondary"
            iconType="solid"
            className="cursor-pointer [&>svg]:!stroke-[#0f52ba]"
            // #0f52ba
          />
        </span>
      </div>

      <div className="flex flex-col gap-6 px-6 py-5">
        {menu.map(({ menuText, icon, routerLink }) => (
          <div
            onClick={() => routerClickHandler(routerLink)}
            className="cursor-pointer flex gap-3 items-center"
          >
            <div>{icon}</div>
            <h3 className="text-theme-secondary text-base"> {menuText} </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
