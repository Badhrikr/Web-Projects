import moment from "moment";
import Image from "next/image";
import { useMemo } from "react";
import { clock } from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import { MigrationRequestFile } from "../../../model";
import FileComponentMaster from "../../uploaded-files/file-component-master";
import ConversationActions from "../conversation-actions";
import { FileUploadedProps } from "./model";

function FileUploaded({
  files,
  loggedOn,
  migrationRequestId,
  userName,
  onReply,
}: FileUploadedProps) {
  const sortedFiles: Record<string, MigrationRequestFile[]> = useMemo(() => {
    const _sortedFiles: Record<string, MigrationRequestFile[]> = {} as any;
    files?.forEach((file) => {
      const key = JSON.stringify({
        fileTypeName: file.fileTypeName,
        fileTypeIcon: file.fileTypeIcon,
      } as MigrationRequestFile);
      _sortedFiles[key] = [...(_sortedFiles[key] ?? []), file];
    });
    return _sortedFiles;
  }, [files]);

  return (
    <div className="group/file-uploaded relative flex flex-col gap-6 bg-theme-background-elevate rounded-md p-4">
      <div className="flex gap-1 items-center justify-between">
        <div className="flex gap-4 items-center">
          <h4 className="!text-sm font-semibold">{userName ?? "Unknown"}</h4>
          <div className="flex gap-1 items-center">
            <Icon icon={clock} size="sm" theme="secondary" />
            <h4 className="!text-xs text-theme-secondary-500">
              {moment(new Date(loggedOn ?? "")).fromNow()}
            </h4>
          </div>
        </div>

        <div>
          <ConversationActions
            className="invisible group-hover/file-uploaded:visible"
            onReply={onReply}
          />
        </div>
      </div>

      {Object.keys(sortedFiles).map((_uploadTypeKey) => (
        <div className="grid gap-4 bg-theme-button-elevate rounded-md px-2 py-3">
          <div>
            <div className="flex gap-1 items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_PROCEDURE_COMMON_BASE_PATH}/${
                  (JSON.parse(_uploadTypeKey) as MigrationRequestFile)
                    .fileTypeIcon
                }`}
                alt=""
                height={25}
                width={25}
              />
              <h2 className="font-medium">
                {
                  (JSON.parse(_uploadTypeKey) as MigrationRequestFile)
                    .fileTypeName
                }
              </h2>
            </div>
          </div>

          <div className="w-fit flex flex-wrap gap-5 items-center">
            {sortedFiles[_uploadTypeKey as keyof typeof sortedFiles]?.map?.(
              (file) => (
                <div className="p-2 rounded-md bg-theme-button-elevate flex-1 basis-[30%]">
                  <FileComponentMaster
                    migrationRequestId={migrationRequestId}
                    {...file}
                  />
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileUploaded;
