import Image from "next/image";
import { useState } from "react";
import Button from "../../../../../ui-components/Button";
import TeamsScheduler from "./teams-scheduler";
import { ScheduleRouterProps } from "./model";
import DefaultScheduler from "./default-scheduler";

function ScheduleRouter({ migrationRequestId, onCancel }: ScheduleRouterProps) {
  const [showTeamsSchedule, setShowTeamsSchedule] = useState(false);
  const [showDefaultScheduler, setShowDefaultScheduler] = useState(false);

  const showTeamsScheduleToggle = () => {
    setShowTeamsSchedule((prev) => !prev);
  };

  const showDefaultSchedulerToggel = () => {
    setShowDefaultScheduler((prev) => !prev);
  };

  const reset = () => {
    setShowDefaultScheduler(false);
    setShowTeamsSchedule(false);
  };

  return (
    <div>
      {showTeamsSchedule === false && showDefaultScheduler === false && (
        <div className="flex flex-col gap-2 text-theme-secondary">
          <div className="flex flex-col gap-8 justify-center items-center">
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col">
                <h2 className="text-theme-secondary text-lg font-medium">
                  Schedule in Microsoft teams
                </h2>
                <h2 className="text-theme-secondary-550 text-base">
                  It directly schedules the meeting in teams.
                </h2>
              </div>
              <Button
                size="md"
                theme="secondary"
                className="w-full"
                color="elevate"
                onClick={showTeamsScheduleToggle}
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={"/assets/microsoft-teams-icon.png"}
                    alt="teams"
                    height={22}
                    width={22}
                  />
                  <span>Schedule in Teams</span>
                </div>
              </Button>
            </div>

            <div className="flex gap-2 items-center w-full">
              <div className=" h-0 flex-1 border-[1.5px] border-theme-gray-border"></div>
              <span className="text-theme-secondary-500">OR</span>
              <div className="h-0 flex-1 border-[1.5px] border-theme-gray-border"></div>
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col">
                <h2 className="text-theme-secondary text-lg font-medium">
                  Default Scheduler
                </h2>
                <h2 className="text-theme-secondary-550 text-base">
                  You can enter the already scheduled meeting details with (or)
                  without sending an email.
                </h2>
              </div>
              <Button
                size="md"
                theme="secondary"
                className="w-full"
                color="elevate"
                onClick={showDefaultSchedulerToggel}
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={"/favicon.ico"}
                    alt="teams"
                    height={22}
                    width={22}
                  />
                  <span>Default Scheduler</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}

      {showTeamsSchedule && (
        <TeamsScheduler
          migrationRequestId={migrationRequestId}
          onCancel={reset}
          onSubmit={onCancel}
        />
      )}

      {showDefaultScheduler && (
        <DefaultScheduler
          migrationRequestId={migrationRequestId}
          onCancel={reset}
          onSubmit={onCancel}
        />
      )}
    </div>
  );
}

export default ScheduleRouter;
