import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getCustomerWorkspaceMenu } from "../../../../helpers/customer-workspace-menu";
import useLogin from "../../../../hooks/use-login";
import Button from "../../../../ui-components/Button";
import Icon from "../../../../ui-components/Icon";
import { chevron_left } from "../../../../helpers/icons";
import { ApplicationRoles } from "../../../../shared/enums";

function CustomerSidebarMenu() {
  const router = useRouter();
  const { roles } = useLogin();

  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(router.pathname);
  }, [router.pathname]);

  return (
    <div className="h-full flex flex-col gap-6 px-6 py-4">
      {roles.includes(ApplicationRoles.CUSTOMER) ? (
        <div></div>
      ) : (
        <React.Fragment>
          <Button
            size="sm"
            theme="secondary"
            color="elevate"
            onClick={() => {
              router.push("/sales/customers")
            }}
            startIcon={<Icon icon={chevron_left} size="sm" theme="secondary" />}
          >
            <span className="text-sm">Go Previous</span>
          </Button>
          <div></div>
        </React.Fragment>
      )}
      {getCustomerWorkspaceMenu(roles?.[0])?.map(
        ({ icon, menuText, routerLink }) => (
          <div
            onClick={() =>
              router.push({
                pathname: routerLink,
                query: {
                  customerid: router.query.customerid as string,
                },
              })
            }
            className="cursor-pointer flex gap-3 items-center"
          >
            <div>{icon}</div>

            <h3
              className={`font-medium text-theme-secondary text-base ${
                active.toLowerCase().includes(routerLink.toLowerCase())
                  ? " text-[#5A8DF7]"
                  : ""
              }`}
            >
              {" "}
              {menuText}{" "}
            </h3>
          </div>
        )
      )}
    </div>
  );
}

export default CustomerSidebarMenu;
