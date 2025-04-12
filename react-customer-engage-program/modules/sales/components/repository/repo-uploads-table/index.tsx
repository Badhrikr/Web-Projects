import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { formatFileSize } from "../../../../../helpers/file-size-handler";
import Button from "../../../../../ui-components/Button";
import Checkbox from "../../../../../ui-components/Checkbox";
import { GetRepositoryUploadsResponse } from "../../../services/model.response";
import UploadItemComponent from "../upload-item-component";
import { RepoUploadsTableProps } from "./model";

function RepoUploadsTable({
  uploads,
  showActions = true,
  resetSelection = false,
  onFolderClick,
  onSelectedRows,
  onDownload,
  onMoveTo,
  onCopyTo,
}: RepoUploadsTableProps) {
  const getRowUUID = (upload: GetRepositoryUploadsResponse): string => {
    return Object.values(upload).join("_");
  };

  const [selectedRows, setSelectedRows] = useState<
    GetRepositoryUploadsResponse[]
  >([]);
  const selectedUUIDs = useMemo(() => {
    return selectedRows.map((_) => getRowUUID(_));
  }, [selectedRows]);

  const rowClickHandler = (upload: GetRepositoryUploadsResponse) => {
    if (upload.isFolder) return;

    let index = selectedRows.findIndex(
      (row) => getRowUUID(row) === getRowUUID(upload)
    );

    if (index === -1) {
      setSelectedRows((prev) => [...prev, upload]);
    } else {
      setSelectedRows((prev) =>
        prev.filter((_) => getRowUUID(_) !== getRowUUID(upload))
      );
    }
  };

  useEffect(() => {
    onSelectedRows?.(selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    if (resetSelection) {
      console.log("RESET SELECTION");
      setSelectedRows([]);
    }
  }, [resetSelection]);

  return uploads.length > 0 ? (
    <table cellPadding={13} className="w-full rounded-md">
      <thead>
        <tr className="text-sm text-left">
          <td className="w-[20px]"></td>
          <td className="font-medium text-theme-secondary-550"> Name </td>
          <td className="font-medium text-theme-secondary-550"> Size </td>
          <td className="font-medium text-theme-secondary-550">
            Modified Date
          </td>
          <td className="font-medium text-theme-secondary-550">
            Modified Time
          </td>
          {showActions && (
            <td className="font-medium text-theme-secondary-550">Actions</td>
          )}
        </tr>
      </thead>

      <tbody>
        {uploads.map((upload) => (
          <tr
            onClick={() => rowClickHandler(upload)}
            className={`group text-theme-secondary hover:bg-theme-button-elevate ${
              selectedUUIDs.includes(getRowUUID(upload))
                ? "bg-theme-button-elevate"
                : ""
            } whitespace-nowrap`}
          >
            <td
              className={`${
                selectedUUIDs.includes(getRowUUID(upload))
                  ? "opacity-100"
                  : "opacity-0"
              } group-hover:opacity-100`}
            >
              {!upload.isFolder && (
                <Checkbox
                  checked={selectedUUIDs.includes(getRowUUID(upload))}
                  size="xs"
                  theme="secondary"
                  label={""}
                />
              )}
            </td>
            <td className="">
              <UploadItemComponent
                onCopyTo={onCopyTo}
                onMoveTo={onMoveTo}
                showActions={
                  showActions && !selectedUUIDs.includes(getRowUUID(upload))
                }
                upload={upload}
                onFolderClick={onFolderClick}
              />
            </td>
            <td className="text-sm ">
              {upload.isFolder
                ? `${upload.folderItems ?? ""} items`
                : formatFileSize(upload.fileSize ?? 0)}
            </td>
            <td className="text-sm max-w-[20ch] overflow-hidden text-ellipsis">
              {moment(upload.createdTime).format("DD MMM YYYY")}
            </td>
            <td className="text-sm max-w-[20ch] overflow-hidden text-ellipsis">
              {moment(upload.createdTime).format("HH:MM a")}
            </td>
            {showActions && (
              <td className="">
                {!upload.isFolder && (
                  <Button
                    size="sm"
                    theme="secondary"
                    buttonThemeStyle="ghost"
                    color="elevate"
                    className="!p-0"
                    onClick={() => onDownload?.(upload)}
                  >
                    <p className="text-[#458EFF]">Download</p>
                  </Button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="text-theme-secondary text-center">No items found</div>
  );
}

export default RepoUploadsTable;
