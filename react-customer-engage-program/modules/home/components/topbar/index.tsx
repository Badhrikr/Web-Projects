import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Image from "next/image";
import { useRouter } from "next/router";
import Notifications from "../../../../shared/components/notifications";
import ThemeChanger from "../../../../shared/components/theme-changer";
import UserProfile from "../../../../shared/components/user-profile";

function Topbar() {
  const router = useRouter();
  const { keycloak } = useKeycloak();

  const showNotifications = router.pathname !== "/complete-registration";
  const showProfile = router.pathname !== "/complete-registration";

  useEffect(() => {
    const theme = localStorage.getItem("app-theme");
    if (theme === "theme-light" || theme === "theme-dark") {
      document.querySelector("body")?.classList.add(theme);
      return;
    }

    document.querySelector("body")?.classList.add("theme-light");
  }, []);

  return (
    <div className="flex justify-between items-center bg-black py-3 px-4">
      <div className="ml-2 font-semibold font-primary text-theme-primary text-md">
        <Image
          src={"/assets/dcep-logo.png"}
          alt="dcep-logo"
          height={70}
          width={70}
          priority
        />
      </div>

      <div className="flex items-center gap-10 relative right-5">
        <div className="flex gap-4">
          <ThemeChanger />
          {showNotifications && keycloak?.authenticated && <Notifications />}
        </div>

        {showProfile && <UserProfile />}
      </div>
    </div>
  );
}

export default Topbar;
