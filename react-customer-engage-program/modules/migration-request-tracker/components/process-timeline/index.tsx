import moment from "moment";
import { useEffect, useState } from "react";
import { clock, poppers } from "../../../../helpers/icons";
import Icon from "../../../../ui-components/Icon";
import { ProcessStatus } from "../../enums";
import * as Services from "../../services";
import { GetTimelineResponse } from "../../services/model.response";
import Timeline from "./timeline";

function ProcessTimeline({
  migrationRequestId,
}: {
  migrationRequestId: string;
}) {
  const [fetching, setFetching] = useState(true);
  const [timeline, setTimeline] = useState<GetTimelineResponse[]>([]);

  const fetchSuccess = (response: GetTimelineResponse[]) => {
    if (!(response instanceof Array)) return;

    setFetching(false);
    setTimeline(response);
  };

  const fetchError = () => {
    setFetching(false);
  };

  useEffect(() => {
    Services.GetTimeline({
      migrationRequestId,
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 py-2">
      <h4 className="text-theme-secondary font-medium">Timeline</h4>

      <div className="relative flex flex-col gap-6">
        {timeline.map((_timeline) => (
          <div className="relative z-10 group">
            <Timeline {..._timeline} />

            {_timeline?.remarksHistory?.length > 0 && (
              <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto flex flex-col gap-6 absolute -left-[320px] w-[300px] max-w-[300px] max-h-[300px] overflow-y-auto whitespace-pre-wrap top-0 bg-theme-background-popup py-4 px-3 rounded-md shadow-md">
                <div className="text-theme-secondary text-sm font-semibold">
                  {_timeline.taskName}
                </div>

                <div className="flex flex-col gap-6 relative">
                  {_timeline.remarksHistory.map((remarks) => (
                    <div className="flex gap-2 rounded-md relative">
                      <button className="h-[30px] w-[30px] rounded-full flex-center-center bg-theme-background-popup z-10">
                        {remarks.taskStatus === ProcessStatus.TODO && (
                          <Icon
                            icon={clock}
                            size="md"
                            theme="primary"
                            className="[&>svg]:!stroke-gray-500"
                          />
                        )}

                        {remarks.taskStatus === ProcessStatus.WIP && (
                          <Icon
                            icon={clock}
                            size="md"
                            theme="primary"
                            className="[&>svg]:!stroke-[rgb(205,147,65)]"
                          />
                        )}

                        {remarks.taskStatus === ProcessStatus.COMPLETED && (
                          <Icon
                            icon={poppers}
                            size="md"
                            theme="primary"
                            iconType="solid"
                            className="[&>svg]:!fill-green-500"
                          />
                        )}
                      </button>

                      <div className="flex-1">
                        <p className="text-theme-secondary text-sm">
                          {remarks?.remarks ?? "-"}
                        </p>
                        <p className="text-xs text-theme-secondary-500 font-medium">
                          {moment(new Date(remarks.loggedTime)).format(
                            "DD MMM"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="absolute h-full w-[2px] bg-gray-500 left-[14px] z-0"></div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="absolute h-full w-[3px] bg-slate-500 left-[13px] z-0"></div>
      </div>
    </div>
  );
}

export default ProcessTimeline;
