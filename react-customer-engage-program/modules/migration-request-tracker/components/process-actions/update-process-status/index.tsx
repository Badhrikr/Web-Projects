import { useEffect, useState } from "react";
import { search } from "../../../../../helpers/icons";
import useImplicitSearch from "../../../../../hooks/use-implicit-search";
import Button from "../../../../../ui-components/Button";
import Input from "../../../../../ui-components/Input";
import * as Services from "../../../services";
import { GetTasksResponse } from "../../../services/model.response";
import Process from "./process-widget";

function UpdateProcessStatus({
  migrationRequestId,
  onCancel,
}: {
  migrationRequestId: string;
  onCancel?(): void;
}) {
  const [processes, setProcesses] = useState<GetTasksResponse[]>([]);

  const [filteredProcesses, handleChange] = useImplicitSearch(processes);

  const fetchSuccess = (response: GetTasksResponse[]) => {
    if (!(response instanceof Array)) return;
    setProcesses(response);
  };

  const fetchError = () => {};

  const getTasks = () => {
    Services.GetTasks({
      migrationRequestId,
      success: fetchSuccess,
      error: fetchError,
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h1 className="text-theme-secondary text-xl font-medium">
        Update Process Status
      </h1>
      <br />

      <div className="flex flex-col gap-6">
        <Input
          size="md"
          theme="secondary"
          inputStyle="bottom-lined"
          placeholder="Search"
          icon={search}
          onChangeEvent={handleChange}
        />

        <div className="flex flex-col gap-4 h-[300px] overflow-auto">
          {filteredProcesses.map((process) => (
            <Process
              key={process.taskId}
              migrationRequestId={migrationRequestId}
              {...process}
              onUpdate={getTasks}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onCancel}
          size="md"
          theme="secondary"
          buttonThemeStyle="ghost"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default UpdateProcessStatus;
