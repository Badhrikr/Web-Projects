import moment from "moment";
import { formatFileSize } from "../../../../../helpers/file-size-handler";
import UploadItemComponent from "../upload-item-component";
import { MoveToCopyToTableProps } from "./model";

function MoveToCopyToTable({
  uploads,
  onFolderClick,
  actionMode,
}: MoveToCopyToTableProps) {
  return uploads.length > 0 ? (
    <table cellPadding={13} className="w-full rounded-md">
      <thead className="sticky top-0 bg-theme-background-popup z-10">
        <tr className="text-sm text-left">
          <td className="font-medium text-theme-secondary-550"> Name </td>
          <td className="font-medium text-theme-secondary-550"> Size </td>
          <td className="font-medium text-theme-secondary-550">
            Modified Date
          </td>
        </tr>
      </thead>

      <tbody>
        {uploads.map((upload) => (
          <tr
            className={`group ${
              upload.isFolder ? "hover:bg-theme-button-elevate" : " opacity-50 "
            } text-theme-secondary whitespace-nowrap`}
          >
            <td className="">
              <UploadItemComponent
                showActions={false}
                upload={upload}
                onFolderClick={onFolderClick}
              />
            </td>
            <td className="text-sm">
              {upload.isFolder
                ? `${upload.folderItems ?? ""} items`
                : formatFileSize(upload.fileSize ?? 0)}
            </td>
            <td className="text-sm max-w-[20ch] overflow-hidden text-ellipsis">
              {moment(upload.createdTime).format("DD MMM YYYY")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="text-theme-secondary text-center">No items found</div>
  );
}

export default MoveToCopyToTable;
