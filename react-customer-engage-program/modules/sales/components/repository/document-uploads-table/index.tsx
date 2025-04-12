import { formatFileSize } from "../../../../../helpers/file-size-handler";
import {
  getExtensionFromFileName,
  getFileTypeIconFromFileName,
} from "../../../../../helpers/get-filetype-icon";
import { cancel } from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import IconButton from "../../../../../ui-components/IconButton";
import { DocumentUploadsTableProps } from "./model";

function DocumentUploadsTable({ files, onRemove }: DocumentUploadsTableProps) {
  return (
    <table cellPadding={15} className="w-full">
      <thead>
        <tr className="text-sm text-left h-[50px]">
          <th></th>
          <th className="font-medium text-theme-secondary-600">File Name</th>
          <th className="font-medium text-theme-secondary-600">File Size</th>
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
              {getFileTypeIconFromFileName(getExtensionFromFileName(file.name))}
            </td>
            <td className="min-w-[100px] !max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis 4">
              <span className="font-medium">
                {file.name}
              </span>
            </td>
            <td>
              <span className="text-sm text-theme-secondary-600 font-medium">
                {formatFileSize(file.size)}
              </span>
            </td>
            <td className="flex justify-end">
              <IconButton
                onClick={() => onRemove?.(file)}
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

export default DocumentUploadsTable;
