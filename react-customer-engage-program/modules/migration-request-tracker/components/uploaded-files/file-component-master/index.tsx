import React, { useState } from "react";
import FileComponent from "../file-component";
import { FileComponentMasterProps } from "./model";
import * as Services from "../../../services";
import { toast } from "react-toastify";

function FileComponentMaster({
  migrationRequestId,
  ...props
}: FileComponentMasterProps) {
  const [downloading, setDownloading] = useState(false);
  const [controllerer, setController] = useState(new AbortController());

  const downloadSuccess = (response: Blob) => {
    setDownloading(false);

    const url = window.URL.createObjectURL(response);
    const link = document.createElement("a");

    link.href = url;
    link.download = props.fileName;
    link.click();
  };

  const downloadError = () => {
    setDownloading(false);
    toast.error(props.fileName + " Download failed");
  };

  const downloadHandler = () => {
    setDownloading(true);

    Services.DownloadFile({
      signal: controllerer.signal,
      migrationRequestId,
      fileId: props.fileId,
      success: downloadSuccess,
      error: downloadError,
    });
  };

  const cancelHandler = () => {
    controllerer.abort();
  };

  return (
    <FileComponent
      loading={downloading}
      onDownload={downloadHandler}
      onCancel={cancelHandler}
      {...props}
    />
  );
}

export default FileComponentMaster;
