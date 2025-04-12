import React, { useRef, useState } from "react";
import { plus, tick, upload_file_native } from "../../../../../helpers/icons";
import Button from "../../../../../ui-components/Button";
import Icon from "../../../../../ui-components/Icon";
import DocumentUploadsTable from "../document-uploads-table";
import * as Services from "../../../services";
import { toast } from "react-toastify";
import { DocumentUploadProps } from "./model";

function DocumentUpload({
  destinationFolderPath,
  onCancel,
  onUploadSuccess,
}: DocumentUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filesChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _20MB = 20 * 1024 * 1024;

    setFiles((prev) =>
      [...prev, ...Array.from(e.target.files ?? []).map((file) => file)].filter(
        (file) => file.size <= _20MB
      )
    );
  };

  const fileRemoveHandler = (fileToRemove: File) => {
    setFiles((prev) => prev.filter((_) => _.name !== fileToRemove.name));
  };

  const submitHandler = () => {
    if (files.length === 0) return;

    const id = toast.loading("Files Uploading");

    const formData = new FormData();
    files.forEach((file) => formData.append(`files[]`, file));

    Services.UploadFilesToRepository({
      formData,
      destinationFolder: destinationFolderPath,
      success: function () {
        toast.update(id, {
          type: "success",
          render: `${files.length} Files Uploaded Sucessfully`,
          autoClose: 2500,
          isLoading: false,
        });
        onUploadSuccess?.();
      },
      error: function () {
        toast.update(id, {
          type: "error",
          render: `Error Occurred`,
          autoClose: 2500,
          isLoading: false,
        });
        onCancel?.();
      },
    });
  };

  return (
    <div className="relative">
      {files.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Button
              onClick={() => fileInputRef.current?.click()}
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
          <DocumentUploadsTable files={files} onRemove={fileRemoveHandler} />
        </div>
      )}

      {files.length === 0 && (
        <div className="flex-center-center !gap-6 !flex-col w-full rounded-md px-4 py-4">
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

      <div className="flex justify-end gap-2 items-center mt-8">
        <Button
          size="md"
          theme="secondary"
          buttonThemeStyle="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>

        {files.length > 0 && (
          <Button onClick={submitHandler} size="md" theme="primary">
            <div className="flex-center-center">
              <Icon icon={tick} theme="primary" size="md" />
              <span>Upload</span>
            </div>
          </Button>
        )}
      </div>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        className="invisible absolute inset-0 z-1"
        onChange={filesChangeHandler}
      />
    </div>
  );
}

export default DocumentUpload;
