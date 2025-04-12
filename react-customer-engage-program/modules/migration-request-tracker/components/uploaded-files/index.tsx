import { useEffect, useState } from "react";
import { GetMigrationRequestFilesResponse } from "../../services/model.response";
import * as Services from "../../services";
import FileComponentMaster from "./file-component-master";

function UploadedFiles({ migrationRequestId }: { migrationRequestId: string }) {
  const [files, setFiles] = useState<GetMigrationRequestFilesResponse[]>([]);

  const fetchSuccess = (response: GetMigrationRequestFilesResponse[]) => {
    if (!(response instanceof Array)) return;
    setFiles(response);
  };

  const fetchError = () => {};

  useEffect(() => {
    Services.GetMigrationRequestFiles({
      migrationRequestId,
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 py-2">
      <h4 className="text-theme-secondary font-medium">Files</h4>
      <div className="flex flex-col gap-4">
        {files.map((file) => (
          <FileComponentMaster
            migrationRequestId={migrationRequestId}
            {...file}
          />
        ))}
      </div>
    </div>
  );
}

export default UploadedFiles;
