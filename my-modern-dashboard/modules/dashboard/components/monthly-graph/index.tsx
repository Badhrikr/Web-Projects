import {
  calendar,
  char_bar_square,
  check_circle,
  chevron_up,
  horizontal_more,
} from "@/helpers/icons";
import Button from "@/ui-components/Button";
import Icon from "@/ui-components/Icon";
import IconButton from "@/ui-components/IconButton";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "SEP",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "OCT",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "NOV",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "DEC",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "JAN",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "FEB",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

const MonthlyGraph = () => {
  return (
    <div className="col-span-2 pt-6 pb-4 bg-theme-background-elevate rounded-2xl font-primary">
      <div className="flex items-center justify-between px-6 mb-4">
        <Button
          size="md"
          theme="secondary"
          className="!bg-theme-button-elevate"
          buttonThemeStyle="ghost"
        >
          <Icon
            size="sm"
            theme="primary"
            icon={calendar}
            iconType="outline"
            className="[&>svg]:!fill-theme-secondary"
          />
          This Month
        </Button>
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

      <div className="grid grid-cols-[25%_75%] gap-4 px-6">
        <div>
          <h4 className="text-3xl text-theme-secondary">$37.5K</h4>
          <div className="flex gap-2">
            <p className="text-theme-secondary">Total Spent</p>
            <span className="flex items-center justify-center text-green-500">
              <Icon
                size="sm"
                theme="primary"
                icon={chevron_up}
                iconType="solid"
                className="[&>svg]:!fill-green-500 [&>svg]:!stroke-green-500"
              />
              <p>+2.45%</p>
            </span>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <Icon
              size="md"
              theme="primary"
              iconType="solid"
              icon={check_circle}
              className="[&>svg]:!fill-green-500 [&>svg]:!stroke-green-500"
            />
            <p className="text-green-500">On track</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
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
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyGraph;
