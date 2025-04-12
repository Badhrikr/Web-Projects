import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { arrow_collapse_left } from "../../../../helpers/icons";
import { getMigrationRequestWorkspaceMenu } from "../../../../helpers/migration-request-workspace-menu";
import useLogin from "../../../../hooks/use-login";
import Icon from "../../../../ui-components/Icon";
import IconButton from "../../../../ui-components/IconButton";

function MigrationRequestSidebarMenu() {
  const router = useRouter();
  const { roles, initialized } = useLogin();

  const [active, setActive] = useState("");
  const [collapse, setCollapse] = useState(true);

  const collapseToggle = () => {
    setCollapse((prev) => !prev);
  };

  useEffect(() => {
    setActive(router.pathname);
  }, [router.pathname]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="transition-all duration-300  flex flex-col gap-6 px-4 py-7">
        {getMigrationRequestWorkspaceMenu(roles?.[0])?.map(
          ({ icon, menuText, routerLink }) => (
            <div
              title={menuText}
              onClick={() =>
                router.push({
                  pathname: routerLink,
                  query: {
                    customerid: router.query.customerid as string,
                    migrationrequestid: router.query
                      .migrationrequestid as string,
                  },
                })
              }
              className="cursor-pointer flex gap-3 items-center"
            >
              <div className="relative">
                {icon}
                {collapse &&
                  active.toLowerCase().includes(routerLink.toLowerCase()) && (
                    <span
                      className={`h-[3px] w-full absolute -bottom-1 bg-[#5A8DF7]`}
                    ></span>
                  )}
              </div>

              {!collapse && (
                <h3
                  className={`font-medium text-theme-secondary text-base ${
                    active.toLowerCase().includes(routerLink.toLowerCase())
                      ? "text-[#5A8DF7]"
                      : ""
                  }`}
                >
                  {menuText}
                </h3>
              )}
            </div>
          )
        )}
      </div>

      <div className="w-full flex justify-end">
        <div
          className={`px-1 transition-transform duration-300 ${
            collapse ? "rotate-180" : ""
          }`}
        >
          <IconButton
            onClick={collapseToggle}
            theme="secondary"
            size="lg"
            buttonThemeStyle="ghost"
            className="!shadow-none"
          >
            <Icon
              icon={arrow_collapse_left}
              theme="secondary"
              size="lg"
              iconType="solid"
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default MigrationRequestSidebarMenu;
