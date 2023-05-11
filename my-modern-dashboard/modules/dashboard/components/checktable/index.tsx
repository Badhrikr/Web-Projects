import { horizontal_more } from "@/helpers/icons";
import Checkbox from "@/ui-components/Checkbox";
import Icon from "@/ui-components/Icon";
import IconButton from "@/ui-components/IconButton";
import React from "react";

const CheckTable = () => {
  return (
    <div className="col-span-2 pt-6 pb-8 bg-theme-background-elevate rounded-2xl font-primary">
      <div className="flex items-center justify-between px-6 mb-4">
        <h3 className="text-2xl font-semibold text-theme-secondary">
          Check Table
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
            <th className="px-6 py-3">Progress</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-sm font-medium">
            <td className="flex items-center gap-1 px-6 py-4">
              <Checkbox size="xs" theme="primary" label="" />
              Horizon UI Free
            </td>
            <td className="px-6 py-4">17.5%</td>
            <td className="px-6 py-4">2458</td>
            <td className="px-6 py-4">18 Apr 2022</td>
          </tr>
          <tr className="text-sm font-medium">
            <td className="flex items-center gap-1 px-6 py-4">
              <Checkbox size="xs" theme="primary" label="" />
              Weekly Updates
            </td>
            <td className="px-6 py-4">10.8%</td>
            <td className="px-6 py-4">1485</td>
            <td className="px-6 py-4">12 Jul 2021</td>
          </tr>
          <tr className="text-sm font-medium">
            <td className="flex items-center gap-1 px-6 py-4">
              <Checkbox size="xs" theme="primary" label="" />
              Horizon UI PRO
            </td>
            <td className="px-6 py-4">21.3%</td>
            <td className="px-6 py-4">1024</td>
            <td className="px-6 py-4">18 Apr 2022</td>
          </tr>
          <tr className="text-sm font-medium">
            <td className="flex items-center gap-1 px-6 py-4">
              <Checkbox size="xs" theme="primary" label="" />
              Venus 3D Asset
            </td>
            <td className="px-6 py-4">31.5%</td>
            <td className="px-6 py-4">858</td>
            <td className="px-6 py-4">24 Jan 2021</td>
          </tr>
          <tr className="text-sm font-medium">
            <td className="flex items-center gap-1 px-6 py-4">
              <Checkbox size="xs" theme="primary" label="" />
              Marketplace
            </td>
            <td className="px-6 py-4">12.2%</td>
            <td className="px-6 py-4">258</td>
            <td className="px-6 py-4">24 Oct 2022</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CheckTable;
