import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { filter_funnel, plus } from "../../../../helpers/icons";
import Button from "../../../../ui-components/Button";
import Icon from "../../../../ui-components/Icon";
import Input from "../../../../ui-components/Input";
import Loading from "../../../../ui-components/Loading";
import Modal from "../../../../ui-components/Modal";
import {
  FileUploadType, SignedFileUploadType
} from "../../enums";
import * as Services from "../../services";
import { GetFilesForMigrationRequestResponse } from "../../services/model.response";
import FileUpload from "../files/file-upload";
import FilesTable from "../files/files-table";

function SignedFilesContainer({
  migrationRequestId,
}: {
  migrationRequestId: string;
}) {
  const [files, setFiles] = useState<GetFilesForMigrationRequestResponse[]>([]);
  const [fetching, setFetching] = useState(true);
  const [filesUploading, setFilesUploading] = useState(false);
  const [fileDeleting, setFileDeleting] = useState(false);
  const [filterText, setFilterText] = useState("");

  const [showFileUpload, setShowFileUpload] = useState(false);

  const filteredFiles = useMemo(() => {
    if (filterText.length === 0) return files;

    return files.filter((file) =>
      Object.keys(file).some((key) =>
        file[key as keyof typeof file]
          .toLowerCase()
          .includes(filterText.toLowerCase())
      )
    );
  }, [filterText, files]);

  const filterTextChangeHandler = ({ target: { value } }: any) => {
    setFilterText(value.trim());
  };

  const uploadFileToggle = () => {
    setShowFileUpload((prev) => !prev);
  };

  const fileDeleteHandler = () => {};

  const fileViewHandler = () => {};

  // TOCHANGE
  const fileUploadSubmitHandler = (
    files: { file: File; uploadType: FileUploadType | undefined }[]
  ) => {
    // TODO
    setFilesUploading(true);
  };

  const fetchSuccess = (response: GetFilesForMigrationRequestResponse[]) => {
    setFiles(response);
    setFetching(false);
  };

  const fetchError = () => {
    setFetching(false);
    toast.error("Error Occurred");
  };

  useEffect(() => {
    setFetching(true);

    Services.GetSignedFilesForMigrationRequest({
      migrationRequestId,
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  return (
    <div className="px-4 flex flex-col gap-4">
      <h3 className="font-semibold text-theme-secondary text-xl">Signed Documents</h3>

      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <Button onClick={uploadFileToggle} size="md" theme="primary">
            <div className="flex-center-center">
              <Icon theme="primary" icon={plus} size="md" />
              <span>Upload Signed Document</span>
            </div>
          </Button>
        </div>

        <Input
          size="sm"
          theme="primary"
          icon={filter_funnel}
          placeholder="Filter by keyword"
          value={filterText}
          onChangeEvent={filterTextChangeHandler}
        />
      </div>

      <div>
        {fetching ? (
          <div className="flex-center-center">
            <Loading size="lg" theme="secondary" />
            <span className="text-theme-secondary">Loading</span>
          </div>
        ) : (
          <FilesTable
            filesData={filteredFiles}
            onDelete={fileDeleteHandler}
            onView={fileViewHandler}
          />
        )}
      </div>

      <Modal isOpen={showFileUpload} close={uploadFileToggle}>
        <div className="pt-14 pb-4 px-4">
          <FileUpload
            loading={filesUploading}
            uploadTypes={SignedFileUploadType}
            onSubmit={fileUploadSubmitHandler}
            onCancel={uploadFileToggle}
          />
        </div>
      </Modal>
    </div>
  );
}

export default SignedFilesContainer;
