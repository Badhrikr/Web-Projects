import { useKeycloak } from "@react-keycloak/web";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import getRoleBasedMenu from "../../helpers/get-role-based-menu";
import Navbar from "../../modules/home/components/navbar";
import Topbar from "../../modules/home/components/topbar";
import { ApplicationRoles } from "../../shared/enums";
import HeadingRoutes from "../../ui-components/HeadingRoutes";

function SalesLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { keycloak, initialized } = useKeycloak();
  const role = keycloak.tokenParsed?.resource_access?.["DCEP-Application"][
    "roles"
  ][0] as ApplicationRoles;

  const menu = useMemo(() => getRoleBasedMenu(role), [role]);

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      toast.error("Please login.", { autoClose: false });
      router.push("/");
    }
  }, [keycloak, initialized]);

  // bg-[#edeef8]

  return (
    <div className="flex flex-col min-h-screen max-h-screen font-primary bg-theme-background-primary">
      <Topbar />
      <Navbar />

      <main className="flex-1 flex flex-col px-5 py-4 overflow-y-auto">
        <HeadingRoutes
          routes={menu.map((menuItem) => {
            return {
              routerLink: menuItem.routerLink,
              routerText: menuItem.menuText,
              routerIcon: menuItem.icon,
            };
          })}
        />

        {children}
      </main>
    </div>
  );
}

export default SalesLayout;
