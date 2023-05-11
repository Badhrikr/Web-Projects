import {
  char_bar_square,
  check_circle,
  chevron_up,
  horizontal_more,
} from "@/helpers/icons";
import Icon from "@/ui-components/Icon";
import IconButton from "@/ui-components/IconButton";
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

const data = [
  {
    name: "17",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "18",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "19",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "20",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "21",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "22",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "23",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const WeeklyRevenue = () => {
  return (
    <div className="col-span-2 pt-6 pb-4 bg-theme-background-elevate rounded-2xl font-primary">
      <div className="flex items-center justify-between px-6 mb-4">
        <h3 className="text-xl font-semibold text-theme-secondary">
          Weekly Revenue
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
            icon={char_bar_square}
            iconType="solid"
            className="[&>svg]:!fill-indigo-800"
          />
        </IconButton>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="pv" stackId="a" fill="#8884d8" barSize={20} />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" barSize={20} />
          <Bar dataKey="uv" stackId="a" fill="#FA8128" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyRevenue;
