import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEventComponent from "../../../../shared/components/calendar-event-component";
import { MyEvent } from "../../../../shared/components/calendar-event-component/model";
import * as Services from "../../services";
import { GetCalendarForCustomerResponse } from "../../services/model.response";
import { CalendarContainerProps } from "./model";

const localizer = momentLocalizer(moment);

function CalendarContainer({ customerId }: CalendarContainerProps) {
  const [fetching, setFetching] = useState(true);
  const [calendar, setCalendar] = useState<GetCalendarForCustomerResponse[]>(
    []
  );

  const myEventsList: MyEvent[] = useMemo(
    () =>
      calendar.map((_calendar) => ({
        title: _calendar?.agenda ?? "Unknown",
        start: new Date(_calendar.startDate),
        end: new Date(_calendar.endDate),
        data: _calendar,
      })),
    [calendar]
  );

  const fetchSuccess = (response: GetCalendarForCustomerResponse[]) => {
    setFetching(false);
    if (!(response instanceof Array)) return;
    setCalendar(response);
  };

  const fetchError = () => {
    setFetching(false);
  };

  useEffect(() => {
    Services.GetCalendarForCustomer({
      customerId,
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  return (
    <div className="custom-calendar p-4 bg-theme-background-elevate">
      <div className="scale-[0.97]">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          components={{
            event: CalendarEventComponent,
          }}
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}

export default CalendarContainer;
