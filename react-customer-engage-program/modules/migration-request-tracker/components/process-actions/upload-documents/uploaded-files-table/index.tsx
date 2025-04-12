import Image from "next/image";
import { useMemo } from "react";
import { formatFileSize } from "../../../../../../helpers/file-size-handler";
import {
  getExtensionFromFileName,
  getFileTypeIconFromFileName,
} from "../../../../../../helpers/get-filetype-icon";
import { cancel } from "../../../../../../helpers/icons";
import Dropdown from "../../../../../../ui-components/Dropdown";
import { DropdownOptions } from "../../../../../../ui-components/DropdownOption/model";
import Icon from "../../../../../../ui-components/Icon";
import IconButton from "../../../../../../ui-components/IconButton";
import { UploadedFilesTableProps } from "./model";

function UploadedFilesTable({
  files,
  uploadTypes,
  onFileRemove,
  onUploadTypeChange,
}: UploadedFilesTableProps) {
  const uploadTypeOptions: DropdownOptions[] = useMemo(
    () =>
      uploadTypes.map((uploadType) => {
        return {
          label: (
            <div className="flex gap-1 items-center">
              <Image
                src={
                  uploadType.fileTypeIcon
                    ? `${process.env.NEXT_PUBLIC_PROCEDURE_COMMON_BASE_PATH}/${uploadType.fileTypeIcon}`
                    : ""
                }
                alt="logo"
                height={25}
                width={25}
              />
              <span className="text-theme-secondary text-sm overflow-hidden text-ellipsis">
                {uploadType.fileTypeName}
              </span>
            </div>
          ),
          value: uploadType.fileTypeId,
        };
      }),
    []
  );

  return (
    <table cellPadding={15} className="w-full">
      <thead>
        <tr className="text-sm text-left h-[50px]">
          <th></th>
          <th className="font-medium text-theme-secondary-600">File Name</th>
          <th className="font-medium text-theme-secondary-600">Upload Type</th>
          <th className="font-medium text-theme-secondary-600"></th>
        </tr>
      </thead>

      <tbody>
        {files.map((file, i) => (
          <tr
            className={`text-theme-secondary text-base ${
              i % 2 === 0 ? "bg-theme-zebra-table" : ""
            }`}
          >
            <td className="min-w-[65px] max-w-[65px]">
              {getFileTypeIconFromFileName(
                getExtensionFromFileName(file.file.name)
              )}
            </td>
            <td className="min-w-[160px] !max-w-[160px]">
              <div className="flex flex-col gap-1">
                <span className="overflow-hidden whitespace-nowrap text-ellipsis font-medium">
                  {file.file.name}
                </span>
                <span className=" text-xs text-theme-secondary-600 font-medium">
                  {formatFileSize(file.file.size)}
                </span>
              </div>
            </td>
            <td className="min-w-[160px] !max-w-[160px]">
              <Dropdown
                options={uploadTypeOptions}
                value={file.uploadType?.fileTypeId ?? ""}
                changeEvent={(value) => {
                  onUploadTypeChange?.(file.file, value);
                }}
                size="md"
                theme="primary"
                label=""
                required
              />
            </td>
            <td className="flex justify-end">
              <IconButton
                onClick={() => onFileRemove?.(file.file)}
                size="md"
                theme="primary"
                buttonThemeStyle="ghost"
                className="!shadow-none"
              >
                <Icon
                  icon={cancel}
                  theme="secondary"
                  size="lg"
                  className="[&>svg]:!stroke-red-900"
                />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UploadedFilesTable;
