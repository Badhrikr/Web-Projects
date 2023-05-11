import { char_bar_square, check_plus, dollar, file } from "@/helpers/icons";
import Icon from "@/ui-components/Icon";
import IconButton from "@/ui-components/IconButton";
import React from "react";

const StatsCards = () => {
  const statsList = [
    {
      title: "Earnings",
      info: "$350.4",
      icon: (
        <Icon
          size="xl"
          theme="primary"
          iconType="solid"
          icon={char_bar_square}
          className="[&>svg]:!fill-blue-800"
        />
      ),
    },
    {
      title: "Spend this month",
      info: "642.39",
      icon: (
        <Icon
          size="xl"
          theme="primary"
          iconType="outline"
          icon={dollar}
          className="[&>svg]:!stroke-blue-800"
        />
      ),
    },
    {
      title: "Sales",
      info: "$574.34",
      icon: (
        <Icon
          size="xl"
          theme="primary"
          iconType="solid"
          icon={file}
          className="[&>svg]:!fill-blue-800"
        />
      ),
    },
    {
      title: "Your balance",
      info: "$1,000",
      icon: (
        <Icon
          size="xl"
          theme="primary"
          iconType="solid"
          icon={file}
          className="[&>svg]:!fill-blue-800"
        />
      ),
    },
    {
      title: "New Tasks",
      info: "154",
      icon: (
        <Icon
          size="xl"
          theme="primary"
          iconType="solid"
          icon={check_plus}
          className="[&>svg]:!fill-blue-800"
        />
      ),
    },
    {
      title: "Total Projects",
      info: "2935",
      icon: (
        <Icon
          size="xl"
          theme="primary"
          iconType="solid"
          icon={file}
          className="[&>svg]:!fill-blue-800"
        />
      ),
    },
  ];

  return (
    <div className="col-span-full font-primary">
      <div className="flex flex-col gap-5 lg:flex-row">
        {statsList.map((item) => {
          return (
            <div
              key={item.title}
              className="flex w-full gap-4 px-5 pt-4 pb-7 bg-theme-background-elevate rounded-2xl"
            >
              <IconButton
                size="xl"
                theme="primary"
                buttonThemeStyle="ghost"
                className="bg-theme-background-body"
              >
                {item.icon}
              </IconButton>
              <div className="grid place-content-center">
                <h3 className="text-sm font-medium text-theme-secondary">
                  {item.title}
                </h3>
                <p className="text-2xl font-semibold text-theme-secondary">
                  {item.info}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsCards;
