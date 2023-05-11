import { chevron_up } from "@/helpers/icons";
import Icon from "@/ui-components/Icon";
import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatsBarChart = () => {
  const data = [
    {
      name: "00",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "10",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "20",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "30",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "40",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "50",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "60",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="flex flex-col justify-between col-span-1 px-5 pt-6 pb-8 bg-theme-background-elevate rounded-2xl font-primary">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-theme-secondary">
            Daily Traffic
          </h3>
          <p className="text-sm font-semibold text-theme-secondary">
            <span className="text-3xl font-semibold">2.579</span> Visitors
          </p>
        </div>

        <div className="flex items-center justify-center text-green-500">
          <Icon
            size="sm"
            theme="primary"
            icon={chevron_up}
            iconType="solid"
            className="[&>svg]:!fill-green-500 [&>svg]:!stroke-green-500 "
          />
          <p>+2.45%</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart width={150} height={40} data={data}>
          <Bar
            dataKey="uv"
            fill="none"
            className="fill-theme-secondary"
            barSize={20}
          />
          <XAxis dataKey="name" /> <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsBarChart;
