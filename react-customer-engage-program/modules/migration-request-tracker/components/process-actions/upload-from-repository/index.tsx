import React, { useEffect, useState } from "react";
import RepoUploadsTable from "../../../../sales/components/repository/repo-uploads-table";
import { GetRepositoryUploadsResponse } from "../../../../sales/services/model.response";
import { UploadFromRepositoryProps } from "./model";
import * as Services from "../../../../sales/services";
import Icon from "../../../../../ui-components/Icon";
import { chevron_right } from "../../../../../helpers/icons";
import RepositorySearch from "../../../../sales/components/repository/repository-search";
import Button from "../../../../../ui-components/Button";
import * as RepositoryServices from "../../../services";

function UploadFromRepository({
  migrationRequestId,
  onCancel,
}: UploadFromRepositoryProps) {
  const [uploads, setUploads] = useState<GetRepositoryUploadsResponse[]>([]);
  const [folder, setFolder] = useState(["Uploads"]);
  const [selectedUploads, setSelectedUploads] = useState<
    GetRepositoryUploadsResponse[]
  >([]);

  const folderClickHandler = (folder: GetRepositoryUploadsResponse) => {
    setFolder((prev) => [...prev, folder.folderName ?? ""]);
  };

  const uploadsFetchSuccess = (response: GetRepositoryUploadsResponse[]) => {
    if (!(response instanceof Array)) return;
    setUploads(response);
  };

  const uploadsFetchError = () => {};

  const getUploads = () => {
    Services.GetRepositoryUploads({
      pathName: folder.join("/"),
      success: uploadsFetchSuccess,
      error: uploadsFetchError,
    });
  };

  const sharedSuccess = () => {
    onCancel?.();
  };

  const sharedError = () => {
    onCancel?.();
  };

  const shareUploadsHandler = () => {
    if (selectedUploads.length === 0) return;

    RepositoryServices.FileShareFromRepository({
      migrationRequestId,
      files: selectedUploads,
      success: sharedSuccess,
      error: sharedError,
    });
  };

  useEffect(() => {
    getUploads();
  }, [folder]);

  return (
    <div className="flex flex-col gap-6">
      <RepositorySearch
        onItemClick={(pathName) => {
          setFolder(pathName.split(/[\/]/g).filter((_) => _.length > 0));
        }}
      />
      <div role="bread-crumbs" className="bread-crumbs flex gap-1 mt-2">
        {folder.map((folderName, i) => (
          <div className="flex gap-2 items-center">
            <p
              onClick={() => setFolder((prev) => prev.slice(0, i + 1))}
              className={`cursor-pointer text-sm hover:underline text-theme-secondary ${
                i === folder.length - 1 ? "font-semibold" : ""
              }`}
            >
              {folderName === "/" ? "Home" : folderName}
            </p>
            <Icon icon={chevron_right} theme="secondary" size="sm" />
          </div>
        ))}
      </div>

      <div className="h-[300px] overflow-y-auto rounded-md">
        <RepoUploadsTable
          uploads={uploads}
          onFolderClick={folderClickHandler}
          onSelectedRows={setSelectedUploads}
          showActions={false}
        />
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <p className="text-theme-secondary font-medium">Selected Files</p>
        <div className="flex gap-2 text-sm flex-wrap">
          {selectedUploads.map((selectedUpload) => (
            <span
              className="text-theme-secondary bg-theme-button-elevate px-2 py-1 rounded-md cursor-pointer"
              onClick={() =>
                setFolder(
                  selectedUpload.folderPath?.split(/\//g) ?? ["Uploads"]
                )
              }
            >
              {selectedUpload.fileName}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <Button
          size="md"
          theme="secondary"
          buttonThemeStyle="ghost"
          onClick={onCancel}
        >
          Close
        </Button>
        <Button size="md" theme="primary" onClick={shareUploadsHandler}>
          Share
        </Button>
      </div>
    </div>
  );
}

export default UploadFromRepository;
