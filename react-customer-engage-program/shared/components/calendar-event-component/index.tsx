import moment from "moment";
import { useState } from "react";
import { EventProps } from "react-big-calendar";
import { CSSTransition } from "react-transition-group";
import { user } from "../../../helpers/icons";
import useOutsideClick from "../../../hooks/use-outside-click";
import Icon from "../../../ui-components/Icon";
import { MyEvent } from "./model";

function CalendarEventComponent({
  event: { title, data },
}: EventProps<MyEvent>) {
  const [showDetails, setShowDetails] = useState(false);
  const [ref] = useOutsideClick(() => {
    setShowDetails(false);
  });

  return (
    <div
      ref={ref}
      className="relative w-full group"
      onClick={() => setShowDetails(true)}
    >
      <p className="overflow-hidden text-ellipsis whitespace-nowrap !text-theme-primary">
        {title}
      </p>
      <CSSTransition
        in={showDetails}
        classNames="fly"
        timeout={150}
        unmountOnExit
      >
        <div className="absolute !h-auto z-[9999] w-[340px] flex flex-col gap-4 top-0 bg-theme-background-popup p-4 shadow-lg rounded-md">
          <div className="flex flex-col gap-1">
            <h4 className="text-theme-secondary-900 font-medium">{title}</h4>
            <h5 className="text-theme-secondary-700 text-sm">
              {moment(data?.startDate).format("DD MMM YYYY")} &nbsp;&nbsp;&nbsp;
              {moment(data?.startDate).format("HH:MM")}
              {" - "}
              {moment(data?.endDate).format("HH:MM")}
            </h5>
          </div>

          <p className="text-theme-secondary text-sm !whitespace-prewrap bg-theme-button-elevate py-3 px-2 rounded-md">
            {data?.description}
          </p>

          <div className="flex gap-2 items-center mt-2">
            <Icon icon={user} theme="secondary" size="md" />
            <div>
              <h5 className="text-theme-secondary text-sm font-medium">
                {data?.createdBy}
              </h5>
              <h6 className="text-xs text-theme-secondary-650">(organiser)</h6>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default CalendarEventComponent;
