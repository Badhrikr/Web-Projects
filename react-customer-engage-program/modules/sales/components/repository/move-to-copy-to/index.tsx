import { useEffect, useState } from "react";
import { chevron_right, copy, share } from "../../../../../helpers/icons";
import Button from "../../../../../ui-components/Button";
import Icon from "../../../../../ui-components/Icon";
import Loading from "../../../../../ui-components/Loading";
import * as Services from "../../../services";
import { GetRepositoryUploadsResponse } from "../../../services/model.response";
import MoveToCopyToTable from "../move-to-copy-to-table";
import { MoveToCopyToProps } from "./model";

function MoveToCopyTo({
  actionMode,
  currentFolder,
  selectedUploadsToMove,
  onClose,
  onSubmit,
}: MoveToCopyToProps) {
  const [folder, setFolder] = useState(
    currentFolder ? currentFolder.split("/") : ["Uploads"]
  );
  const [updating, setUpdating] = useState(false);
  const [uploads, setUploads] = useState<GetRepositoryUploadsResponse[]>([]);

  const folderClickHandler = (folder: GetRepositoryUploadsResponse) => {
    setFolder((prev) => [...prev, folder.folderName ?? ""]);
  };

  const successHandler = () => {
    onSubmit?.();
    setUpdating(false);
  };

  const errorHandler = () => {
    setUpdating(false);
  };

  const moveToHandler = () => {
    const destinationFolderPath = folder.join("/");

    Services.MoveToDestinationRepository({
      data: selectedUploadsToMove.map((selectedUpload) => ({
        destinationFolderPath,
        filePath: selectedUpload.filePath ?? "",
      })),
      success: successHandler,
      error: errorHandler,
    });
  };

  const copyToHandler = () => {
    const destinationFolderPath = folder.join("/");

    Services.CopyToDestinationRepository({
      data: selectedUploadsToMove.map((selectedUpload) => ({
        destinationFolderPath,
        filePath: selectedUpload.filePath ?? "",
      })),
      success: successHandler,
      error: errorHandler,
    });
  };

  const pasteHandler = () => {
    setUpdating(true);

    if (actionMode === "Move") {
      moveToHandler();
    } else {
      copyToHandler();
    }
  };

  const fetchSuccess = (response: GetRepositoryUploadsResponse[]) => {
    if (!(response instanceof Array)) return;
    setUploads(response);
  };

  const fetchError = () => {};

  const getUploads = () => {
    Services.GetRepositoryUploads({
      pathName: folder.join("/"),
      success: fetchSuccess,
      error: fetchError,
    });
  };

  useEffect(() => {
    getUploads();
  }, [folder]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="flex gap-2 items-center mb-5 text-lg font-medium text-theme-secondary">
        <Icon
          icon={actionMode === "Copy" ? copy : share}
          theme="secondary"
          size="lg"
          className="[&>svg]:!stroke-[#18a0fb]"
        />
        {actionMode} {selectedUploadsToMove.length} Items
      </h2>

      <div role="bread-crumbs" className="bread-crumbs flex gap-1 mt-2">
        {folder.map((folderName, i) => (
          <div className="flex gap-2 items-center">
            <p
              onClick={() => setFolder((prev) => prev.slice(0, i + 1))}
              className={`cursor-pointer text-sm hover:underline text-theme-secondary ${
                i === folder.length - 1 ? "font-semibold" : ""
              }`}
            >
              {folderName}
            </p>
            <Icon icon={chevron_right} theme="secondary" size="sm" />
          </div>
        ))}
      </div>

      <div className="h-[400px] overflow-auto mt-4">
        <MoveToCopyToTable
          actionMode={actionMode}
          uploads={uploads}
          onFolderClick={folderClickHandler}
        />
      </div>

      <div className="flex gap-2 justify-end mt-2">
        <Button
          onClick={onClose}
          theme="secondary"
          size="md"
          buttonThemeStyle="ghost"
        >
          Close
        </Button>
        <Button
          disabled={updating}
          onClick={pasteHandler}
          theme="primary"
          size="md"
        >
          <div className="flex-center-center">
            {updating && <Loading size="sm" theme="secondary" />}
            <span>{updating ? "Pasting" : "Paste here"}</span>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default MoveToCopyTo;
