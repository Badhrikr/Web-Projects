import React, { useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getFileUploadTypeIcon } from "../../../../../helpers/get-file-upload-type-icon";
import { plus, tick, upload_file_native } from "../../../../../helpers/icons";
import Button from "../../../../../ui-components/Button";
import Dropdown from "../../../../../ui-components/Dropdown";
import { DropdownOptions } from "../../../../../ui-components/DropdownOption/model";
import Icon from "../../../../../ui-components/Icon";
import { FileUploadType } from "../../../enums";
import { FileUploadProps } from "./model";
import * as Services from "../../../../migration-request-tracker/services";
import UploadedFilesTable from "../uploaded-files-table";

function FileUpload({
  uploadTypes,
  loading,
  onSubmit,
  onCancel,
}: FileUploadProps) {
  // TOCHANGE
  const [files, setFiles] = useState<
    { file: File; uploadType: FileUploadType | undefined }[]
  >([]);
  const [commonUploadType, setCommonUploadType] = useState<FileUploadType>();

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const commonUploadTypeChangeHandler = (value: FileUploadType) => {
    setCommonUploadType(value);
  };

  const uploadTypeOptions: DropdownOptions[] = useMemo(
    () =>
      Object.keys(uploadTypes).map((key) => {
        const uploadType = uploadTypes[key as keyof typeof uploadTypes];
        return {
          label: (
            <div className="flex gap-1 items-center">
              <div>{getFileUploadTypeIcon(uploadType)}</div>
              <span className="text-theme-secondary text-sm overflow-hidden text-ellipsis">
                {uploadType}
              </span>
            </div>
          ),
          value: uploadType,
        };
      }),
    []
  );

  const addMoreFileHandler = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const filesChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const removedFiles: File[] = [];

    setFiles((prevFiles) => {
      return [
        ...prevFiles,
        ...Array.from(e.target?.files ?? []).map((file) => ({
          file,
          uploadType: commonUploadType,
        })),
      ]
        .filter((file) => {
          const isLesserThan20mb = file.file.size <= 20 * 1024 * 1024;
          if (isLesserThan20mb === false) {
            removedFiles.push(file.file);
          }
          return isLesserThan20mb;
        })
        .slice(0, 10);
    });
    if (removedFiles.length > 0) {
      toast.info(
        removedFiles.map((file) => file.name).join(", ") +
          " files removed because of exceeding size limit",
        { autoClose: 5000 }
      );
    }
  };

  const fileRemoveHandler = (fileToRemove: File) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.file.name !== fileToRemove.name)
    );
  };

  const filesUploadSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    // onSubmit?.(files);
  };

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-theme-secondary text-xl font-semibold">
        Upload Documents
      </h3>

      {files.length > 0 && (
        <div className="flex justify-end">
          <Button
            onClick={addMoreFileHandler}
            size="md"
            theme="primary"
            buttonThemeStyle="ghost"
          >
            <div className="flex-center-center">
              <Icon
                icon={plus}
                theme="primary"
                size="md"
                className="[&>svg]:!stroke-[#5A8DF7]"
              />
              <span className="text-[#5A8DF7]">Add Documents</span>
            </div>
          </Button>
        </div>
      )}

      {files.length === 0 && (
        <div className="flex-center-center !gap-6 !flex-col w-full rounded-md px-4 py-4 bg-theme-button-elevatex">
          <div className="flex flex-col items-center gap-2">
            <Icon icon={upload_file_native} theme="secondary" size="_2xl" />
            <span className="text-theme-secondary text-center font-medium">
              You can upload maximum{" "}
              <span className="font-medium text-[#5A8DF7]">10 Documents</span>
              <br />
              each of size maximum{" "}
              <span className="font-medium text-[#5A8DF7]"> 20MB </span>
            </span>
          </div>

          <Button
            size="sm"
            theme="primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex-center-center">
              <Icon icon={plus} theme="primary" size="sm" />
              <span>Add Documents</span>
            </div>
          </Button>
        </div>
      )}

      <input
        type="file"
        multiple
        ref={fileInputRef}
        className="invisible absolute"
        onChange={filesChangeHandler}
      />

      {files.length > 0 && (
        <form
          ref={formRef}
          onSubmit={filesUploadSubmitHandler}
          className="block"
        >
          <UploadedFilesTable
            uploadTypes={uploadTypes}
            files={files}
            onFileRemove={fileRemoveHandler}
          />
        </form>
      )}

      {files.length === 0 && (
        <div className="flex-center-center !gap-6 w-full bg-theme-button-elevate rounded-md px-4 py-4">
          <span className="flex-1 text-theme-secondary text-center">
            Set Common Upload Type for all Files
          </span>

          <div className="flex-1">
            <Dropdown
              options={uploadTypeOptions}
              changeEvent={commonUploadTypeChangeHandler}
              size="md"
              theme="primary"
              label="Select Common Upload Type"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 items-center">
        <Button
          size="md"
          theme="secondary"
          buttonThemeStyle="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>

        {files.length > 0 && (
          <Button
            onClick={() => formRef?.current?.requestSubmit()}
            size="md"
            theme="primary"
          >
            <div className="flex-center-center">
              <Icon icon={tick} theme="primary" size="md" />
              <span>Upload</span>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
