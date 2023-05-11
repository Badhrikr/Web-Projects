import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "../../../../helpers/calendar";
import cn from "../../../../helpers/cn";
import Tooltip from "@/ui-components/Tooltip";
import IconButton from "@/ui-components/IconButton";
import Icon from "@/ui-components/Icon";
import { chevron_left, chevron_right } from "@/helpers/icons";

const meetingScheduled = [
  {
    meetingTitle: "React Course",
    meetingAgenda: "React",
    date: "2023-05-11",
  },
  {
    meetingTitle: "Svelte Course",
    meetingAgenda: "Svelte",
    date: "2023-05-12",
  },
];

export default function Calendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  // meetingScheduled.forEach((obj) => {
  //   const dateStr = obj.date;
  //   const dateObj = new Date(dateStr);
  //   console.log(dateObj.toLocaleDateString());
  // });

  function eventChecker() {
    console.log(selectDate.toDate().toLocaleDateString());
  }

  return (
    <div className="p-6 rounded-2xl bg-theme-background-elevate font-primary">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold select-none text-theme-secondary">
          {months[today.month()]}, {today.year()}
        </h1>
        <div className="flex items-center gap-10 ">
          <IconButton
            size="md"
            theme="primary"
            buttonThemeStyle="ghost"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          >
            <Icon
              iconType="outline"
              size="md"
              theme="secondary"
              icon={chevron_left}
            />
          </IconButton>
          <h1
            className="transition-all cursor-pointer hover:scale-105 text-theme-secondary"
            onClick={() => {
              setToday(currentDate);
            }}
          >
            Today
          </h1>

          <IconButton
            size="md"
            theme="primary"
            buttonThemeStyle="ghost"
            onClick={() => {
              setToday(today.month(today.month() + 1));
            }}
          >
            <Icon
              iconType="outline"
              size="md"
              theme="secondary"
              icon={chevron_right}
            />
          </IconButton>
        </div>
      </div>

      <div className="grid grid-cols-7 ">
        {days.map((day, index) => {
          return (
            <h1
              key={index}
              className="grid text-sm text-center select-none text-theme-secondary place-content-center"
            >
              {day}
            </h1>
          );
        })}
      </div>

      <div className="grid grid-cols-7 ">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            return (
              <Tooltip
                key={index}
                text={
                  <div>
                    <h1 className="text-sm font-semibold">
                      Schedule for {selectDate.toDate().toDateString()}
                    </h1>
                    <p className="text-xs text-gray-400">
                      No meetings for today.
                    </p>
                  </div>
                }
              >
                <div className="grid text-sm text-center border-t place-content-center">
                  <h1
                    className={cn(
                      currentMonth ? "text-theme-secondary" : "text-gray-400",
                      today ? "bg-red-600 text-white" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-black text-theme-secondary"
                        : "",
                      "h-10 w-10 rounded-full grid  place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                    )}
                    // onClick={() => {
                    //   setSelectDate(date);
                    // }}
                    onMouseEnter={() => {
                      setSelectDate(date);
                      eventChecker();
                    }}
                    onMouseLeave={() => setSelectDate(currentDate)}
                  >
                    {date.date()}
                  </h1>
                </div>
              </Tooltip>
            );
          }
        )}
      </div>
    </div>
  );
}
