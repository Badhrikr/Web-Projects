import {
  horizontal_more,
  vertical_doublemore,
  vertical_more,
} from "@/helpers/icons";
import Checkbox from "@/ui-components/Checkbox";
import Icon from "@/ui-components/Icon";
import IconButton from "@/ui-components/IconButton";
import React from "react";

const TaskChecker = () => {
  const taskList = [
    {
      name: "Landing Page Design",
    },
    {
      name: "Dashboard Builder",
    },
    {
      name: "Mobile App Design",
    },
    {
      name: "Illustrations",
    },
    {
      name: "Promotional LP",
    },
  ];

  return (
    <div className="pt-6 pb-8 bg-theme-background-elevate rounded-2xl font-primary">
      <div className="flex items-center justify-between px-6 mb-4">
        <div className="flex items-center justify-between gap-2">
          <IconButton
            size="md"
            theme="primary"
            buttonThemeStyle="ghost"
            className="flex items-center justify-center rounded-full bg-theme-background-primary"
          >
            <Checkbox size="xs" theme="primary" label="" />
          </IconButton>
          <h3 className="text-2xl font-semibold text-theme-secondary">Tasks</h3>
        </div>
        <IconButton
          size="md"
          theme="primary"
          buttonThemeStyle="ghost"
          className="rounded-lg bg-theme-background-primary"
        >
          <Icon
            size="xl"
            theme="primary"
            icon={horizontal_more}
            iconType="solid"
            className="[&>svg]:fill-theme-secondary"
          />
        </IconButton>
      </div>

      {taskList.map((item) => {
        return (
          <div
            key={item.name}
            className="flex items-center justify-between px-6 mb-2"
          >
            <div className="flex items-center justify-between gap-2 px-3">
              <Checkbox size="xs" theme="primary" label="" />
              <h3 className="text-sm font-medium text-theme-secondary">
                {item.name}
              </h3>
            </div>
            <IconButton size="md" theme="primary" buttonThemeStyle="ghost">
              <Icon
                size="lg"
                theme="primary"
                icon={vertical_doublemore}
                iconType="solid"
                className="[&>svg]:fill-theme-secondary"
              />
            </IconButton>
          </div>
        );
      })}
    </div>
  );
};

export default TaskChecker;
