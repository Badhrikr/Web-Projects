import Dropdown from "@/ui-components/Dropdown";
import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];

const StatsPieChart = () => {
  const option = [
    {
      key: "Monthly",
      label: "Monthly",
      value: "Monthly",
    },
    {
      key: "Daily",
      label: "Daily",
      value: "Daily",
    },
    {
      key: "Yearly",
      label: "Yearly",
      value: "Yearly",
    },
  ];

  return (
    <div className="col-span-1 px-5 pt-6 pb-8 bg-theme-background-elevate rounded-2xl font-primary">
      <div className="grid grid-cols-[1fr,30%] items-center justify-between  mb-4">
        <h3 className="text-base font-semibold text-theme-secondary">
          Your Pie Chart
        </h3>
        <Dropdown
          size="xs"
          theme="primary"
          label="Sort by"
          options={option}
          dropdownThemeStyle="outline"
          className="border-none"
        />
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart width={100} height={100}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 p-6 mt-6 divide-x-2 bg-theme-background-secondary rounded-2xl">
        <div>
          <h4 className="mb-1 text-xs font-medium text-theme-secondary">
            <span className="inline-block w-2 bg-indigo-700 rounded-full aspect-square"></span>
            &nbsp;Your files
          </h4>
          <p className="text-base font-medium text-theme-secondary">63%</p>
        </div>
        <div>
          <h4 className="mb-1 text-xs font-medium text-theme-secondary">
            <span className="inline-block w-2 rounded-full bg-cyan-300 aspect-square"></span>
            &nbsp;System
          </h4>
          <p className="text-base font-medium text-theme-secondary">25%</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPieChart;
