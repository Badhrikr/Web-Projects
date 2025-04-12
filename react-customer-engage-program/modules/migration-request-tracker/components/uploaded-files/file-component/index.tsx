import React, { useMemo } from "react";
import {
  getExtensionFromFileName,
  getFileTypeIconFromFileName,
} from "../../../../../helpers/get-filetype-icon";
import { formatFileSize } from "../../../../../helpers/file-size-handler";
import { cancel, download } from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import IconButton from "../../../../../ui-components/IconButton";
import { FileComponentProps } from "./model";
import Loading from "../../../../../ui-components/Loading";

function FileComponent({
  fileName,
  fileSize,
  loading,
  onCancel,
  onDownload,
}: FileComponentProps) {
  const MAX_LENGTH = 20;
  const shrinkedFileName = useMemo(() => {
    if (fileName?.length > MAX_LENGTH) {
      return (
        fileName?.substring(0, fileName?.lastIndexOf(".")).substring(0, MAX_LENGTH) +
        "... " +
        fileName?.substring(fileName?.lastIndexOf("."))
      );
    }

    return fileName;
  }, [fileName]);

  return (
    <div className="flex items-center gap-2">
      <div>
        {getFileTypeIconFromFileName(getExtensionFromFileName(fileName), "xl")}
      </div>
      <div className="flex-1 flex flex-col gap-1 overflow-hidden">
        <h4
          title={fileName}
          className="text-theme-secondary font-medium text-sm whitespace-nowrap text-ellipsis"
        >
          {shrinkedFileName}
        </h4>
        <h5 className="text-sm text-theme-secondary-500">
          {formatFileSize(fileSize)}
        </h5>
      </div>
      <div>
        {loading ? (
          <div className="relative h-8 w-8 flex-center-center">
            <Loading size="lg" theme="secondary" />
            <div className="absolute ">
              <IconButton
                onClick={onCancel}
                size="xs"
                theme="secondary"
                buttonThemeStyle="ghost"
                className="!shadow-none"
              >
                <Icon
                  icon={cancel}
                  size="sm"
                  theme="secondary"
                  iconType="outline"
                />
              </IconButton>
            </div>
          </div>
        ) : (
          <IconButton
            onClick={onDownload}
            size="sm"
            theme="secondary"
            buttonThemeStyle="ghost"
            className="!shadow-none"
          >
            <Icon
              icon={download}
              size="md"
              theme="secondary"
              iconType="solid"
            />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default FileComponent;
