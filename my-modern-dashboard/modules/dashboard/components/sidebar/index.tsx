import { cart, home, lock_closed, table_cells, user } from "@/helpers/icons";
import Icon from "@/ui-components/Icon";
import React from "react";

const SideBar = () => {
  const sideBarList = [
    {
      name: "Main Dashboard",
      icon: <Icon icon={home} size="md" theme="secondary" iconType="solid" />,
    },
    {
      name: "NFT MarketPlace",
      icon: <Icon icon={cart} size="md" theme="secondary" iconType="solid" />,
    },
    {
      name: "Data Tables",
      icon: (
        <Icon icon={table_cells} size="md" theme="secondary" iconType="solid" />
      ),
    },
    {
      name: "Profile",
      icon: <Icon icon={user} size="md" theme="secondary" iconType="solid" />,
    },
    {
      name: "Sign",
      icon: (
        <Icon icon={lock_closed} size="md" theme="secondary" iconType="solid" />
      ),
    },
    {
      name: "RTL Admin",
      icon: <Icon icon={home} size="md" theme="secondary" iconType="solid" />,
    },
  ];

  return (
    <div className="w-full max-w-xs min-h-screen bg-theme-background-primary font-primary">
      <div className="flex items-center justify-center p-6 pt-12 border-b-2 border-theme-border-theme-primary">
        <h2 className="text-2xl uppercase text-theme-secondary">
          <span className="font-bold ">Horizon</span> Free
        </h2>
      </div>

      <nav className="px-5 py-8">
        <ul>
          {sideBarList.map((item) => {
            return (
              <li
                key={item.name}
                className="flex items-center gap-4 px-4 py-3 cursor-pointer text-theme-secondary"
              >
                {item.icon}
                <h3>{item.name}</h3>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
