import { horizontal_more } from "@/helpers/icons";
import Icon from "@/ui-components/Icon";
import IconButton from "@/ui-components/IconButton";
import React from "react";

const ComplexTable = () => {
  return (
    <div className="col-span-2 pt-6 pb-8 bg-theme-background-elevate rounded-2xl font-primary">
      <div className="flex items-center justify-between px-6 mb-4">
        <h3 className="text-2xl font-semibold text-theme-secondary">
          Complex Table
        </h3>
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
      <table className="w-full border-collapse text-theme-secondary">
        <thead>
          <tr className="text-xs text-left uppercase border-b-[1px] text-theme-secondary-350 border-b-theme-secondary-350">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-sm font-medium">
            <td className="px-6 py-2">Horizon UI Free</td>
            <td className="px-6 py-2">Disable</td>
            <td className="px-6 py-2">18 Apr 2022</td>
            <td className="px-6 py-2">25%</td>
          </tr>
          <tr className="text-sm font-medium">
            <td className="px-6 py-2">Weekly Updates</td>
            <td className="px-6 py-2">Approved</td>
            <td className="px-6 py-2">12 Jul 2021</td>
            <td className="px-6 py-2">50%</td>
          </tr>
          <tr className="text-sm font-medium">
            <td className="px-6 py-2">Horizon UI PRO</td>
            <td className="px-6 py-2">Approved</td>
            <td className="px-6 py-2">18 Apr 2022</td>
            <td className="px-6 py-2">75%</td>
          </tr>
          <tr className="text-sm font-medium">
            <td className="px-6 py-2">Marketplace</td>
            <td className="px-6 py-2">Marketplace</td>
            <td className="px-6 py-2">20 May 2021</td>
            <td className="px-6 py-2">90%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComplexTable;
