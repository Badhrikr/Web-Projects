import { useState } from "react";
import moment from "moment";
import { getFileUploadTypeIcon } from "../../../../../helpers/get-file-upload-type-icon";
import {
  getExtensionFromFileName,
  getFileTypeIconFromFileName,
} from "../../../../../helpers/get-filetype-icon";
import Button from "../../../../../ui-components/Button";
import Modal from "../../../../../ui-components/Modal";
import { FileType } from "../../../enums";
import FilesTableMoreActions from "../files-table-more-actions";
import { FilesTableProps } from "./model";
import FileDeleteConfirmation from "../../file-delete-confirmation";
import { GetFilesForMigrationRequestResponse } from "../../../services/model.response";

function FilesTable({ filesData, onView, onDelete }: FilesTableProps) {
  const [fileToDelete, setFileToDelete] =
    useState<GetFilesForMigrationRequestResponse>();
  const [showFileDelete, setShowFileDelete] = useState(false);

  const deleteFileToggle = () => {
    setShowFileDelete((prev) => !prev);
  };

  const deleteHandler = (file: GetFilesForMigrationRequestResponse) => {
    deleteFileToggle();
    setFileToDelete(file);
  };

  return (
    <>
      <table cellPadding={15} className="w-full bg-theme-background-elevate shadow-sm">
        <thead>
          <tr className="text-sm text-left h-[50px]">
            <th></th>
            <th className="font-medium text-theme-secondary-600">File Name</th>
            <th className="font-medium text-theme-secondary-600">Authour</th>
            <th className="font-medium text-theme-secondary-600">
              Upload Date
            </th>
            <th className="font-medium text-theme-secondary-600">
              Upload Type
            </th>
            <th className="font-medium text-theme-secondary-600"></th>
          </tr>
        </thead>

        <tbody>
          {filesData.map((file, i) => (
            <tr
              className={`text-theme-secondary text-base ${
                i % 2 === 0 ? "bg-theme-zebra-table" : ""
              }`}
            >
              <td className="min-w-[65px] max-w-[65px]">
                {getFileTypeIconFromFileName(
                  getExtensionFromFileName(file?.fileName)
                )}
              </td>
              <td className="min-w-[160px] !max-w-[160px]">
                <div className="flex flex-col gap-1">
                  <span className="overflow-hidden whitespace-nowrap text-ellipsis font-medium">
                    {file?.fileName}
                  </span>
                  <span className=" text-xs text-theme-secondary-600 font-medium">
                    {file?.fileSize}
                  </span>
                </div>
              </td>
              <td className="font-semibold min-w-[160px] !max-w-[160px]">
                {file?.authour}
              </td>
              <td className="min-w-[160px] !max-w-[160px]">
                {moment(file?.uploadDate).format("DD MMM YYYY")}
              </td>
              <td className="min-w-[160px] !max-w-[160px]">
                <div className="flex gap-1 items-center">
                  <div>{getFileUploadTypeIcon(file?.uploadType)}</div>
                  <span>{file?.uploadType}</span>
                </div>
              </td>
              <td className="w-[100px]">
                <Button size="md" theme="primary" buttonThemeStyle="ghost">
                  <span className="text-[#5A8DF7]">Download</span>
                </Button>
              </td>
              <td className="w-[80px]">
                <FilesTableMoreActions
                  showView={
                    getExtensionFromFileName(file?.fileName) === FileType.PDF
                  }
                  onDelete={deleteHandler}
                  onView={onView}
                  {...file}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={showFileDelete} close={deleteFileToggle}>
        <div className="pt-14 pb-4 px-4">
          <FileDeleteConfirmation fileName={fileToDelete?.fileName ?? ""} onCancel={deleteFileToggle} />
        </div>
      </Modal>
    </>
  );
}

export default FilesTable;
