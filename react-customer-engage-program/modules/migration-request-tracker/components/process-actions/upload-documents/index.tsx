import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../../../../ui-components/Loading";
import * as Services from "../../../services";
import { GetFileUploadTypesResponse } from "../../../services/model.response";
import FileUpload from "./file-upload";
import { UploadDocumentsProps } from "./model";

function UploadDocuments({
  migrationRequestId,
  onCancel,
}: UploadDocumentsProps) {
  const [fetching, setFetching] = useState(false);
  const [uploadTypes, setUploadTypes] = useState<GetFileUploadTypesResponse[]>(
    []
  );

  const submitHandler = (
    files: { file: File; uploadType: GetFileUploadTypesResponse }[]
  ) => {
    const id = toast.loading("Files Uploading");

    const formData = new FormData();
    files?.forEach((file, i) => {
      formData.append(`files[${i}].file`, file.file);
      formData.append(`files[${i}].uploadType`, file.uploadType.fileTypeName);
      formData.append(`files[${i}].uploadTypeId`, file.uploadType.fileTypeId);
    });

    Services.UploadFile({
      formData,
      migrationRequestId,
      success: () => {
        toast.update(id, {
          type: "success",
          render: `${files.length} Files Uploaded Sucessfully`,
          autoClose: 2500,
          isLoading: false,
        });
        onCancel?.();
      },
      error: (err: any) => {
        toast.update(id, {
          type: "error",
          render: err.message ?? "Upload files error",
          autoClose: 2500,
          isLoading: false,
        });
        onCancel?.();
      },
    });
  };

  const fetchSuccess = (response: GetFileUploadTypesResponse[]) => {
    if (!(response instanceof Array)) return;

    setFetching(false);
    setUploadTypes(response);
  };

  const fetchError = () => {
    setFetching(false);
  };

  const getUploadTypes = () => {
    setFetching(true);
    Services.GetFileUploadTypes({
      success: fetchSuccess,
      error: fetchError,
    });
  };

  useEffect(() => {
    getUploadTypes();
  }, []);

  return fetching ? (
    <div className="flex-center-center !gap-2">
      <Loading size="lg" theme="secondary" />
      <span>Loading</span>
    </div>
  ) : (
    <FileUpload
      uploadTypes={uploadTypes}
      onCancel={onCancel}
      onSubmit={submitHandler}
    />
  );
}

export default UploadDocuments;
