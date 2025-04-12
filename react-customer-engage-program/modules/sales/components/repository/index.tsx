import Router from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  chevron_right,
  file_add,
  folder_add,
  share,
} from "../../../../helpers/icons";
import Button from "../../../../ui-components/Button";
import Icon from "../../../../ui-components/Icon";
import Modal from "../../../../ui-components/Modal";
import * as Services from "../../services";
import { GetRepositoryUploadsResponse } from "../../services/model.response";
import CreateFolder from "./create-folder";
import DocumentUpload from "./document-upload";
import MoveToCopyTo from "./move-to-copy-to";
import RepoUploadsTable from "./repo-uploads-table";
import RepositorySearch from "./repository-search";

function RepositoryContainer({ pathname }: { pathname: string }) {
  const [folder, setFolder] = useState(
    pathname ? pathname.split("/") : ["Uploads"]
  );
  const [uploads, setUploads] = useState<GetRepositoryUploadsResponse[]>([]);
  const [selectedUploads, setSelectedUploads] = useState<
    GetRepositoryUploadsResponse[]
  >([]);

  const [showCreateNewFolder, setShowCreateNewFolder] = useState(false);
  const [showUploadNewFile, setShowUploadNewFile] = useState(false);
  const [showCopyTo, setShowCopyTo] = useState(false);
  const [showMoveTo, setShowMoveTo] = useState(false);

  const folderClickHandler = (folder: GetRepositoryUploadsResponse) => {
    setFolder((prev) => [...prev, folder.folderName ?? ""]);
  };

  const fetchSuccess = (response: GetRepositoryUploadsResponse[]) => {
    if (!(response instanceof Array)) return;
    setUploads(response);
  };

  const fetchError = () => {};

  const getUploads = () => {
    setShowCopyTo(false);
    setShowMoveTo(false);
    setShowCreateNewFolder(false);
    setShowUploadNewFile(false);

    Services.GetRepositoryUploads({
      pathName: folder.join("/"),
      success: fetchSuccess,
      error: fetchError,
    });
  };

  const showCreateNewFolderToggle = () => {
    setShowCreateNewFolder((prev) => !prev);
  };

  const showUploadFileToggle = () => {
    setShowUploadNewFile((prev) => !prev);
  };

  const showCopyToToggle = () => {
    setShowCopyTo((prev) => !prev);
  };

  const showMoveToToggle = () => {
    setShowMoveTo((prev) => !prev);
  };

  const moveToHandler = (upload: GetRepositoryUploadsResponse) => {
    setSelectedUploads([upload]);
    setShowMoveTo(true);
  };

  const copyToHandler = (upload: GetRepositoryUploadsResponse) => {
    setSelectedUploads([upload]);
    setShowCopyTo(true);
  };

  const downloadSuccess = (
    response: Blob,
    repositoryUpload: GetRepositoryUploadsResponse
  ) => {
    const url = window.URL.createObjectURL(response);
    const link = document.createElement("a");

    link.href = url;
    link.download = repositoryUpload.fileName ?? "file";
    link.click();
  };

  const fileDownloadHandler = (
    repositoryUpload: GetRepositoryUploadsResponse
  ) => {
    if (!repositoryUpload.filePath) return;

    Services.DownloadFromRepository({
      pathName: repositoryUpload.filePath,
      success: function (response: Blob) {
        downloadSuccess(response, repositoryUpload);
      },
      error: function () {
        toast.error("Download Failed");
      },
    });
  };

  useEffect(() => {
    Router.push(
      {
        query: { pathname: folder.join("/") },
      },
      undefined,
      { shallow: true }
    );
    getUploads();
  }, [folder]);

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-0  flex items-center justify-between gap-2">
        <div className="flex-1">
          <RepositorySearch
            onItemClick={(pathName) => {
              setFolder(pathName.split(/[\/]/g).filter((_) => _.length > 0));
            }}
          />
        </div>

        <div>
          <Button
            theme="secondary"
            size="sm"
            disabled={selectedUploads.length === 0}
            buttonThemeStyle="ghost"
            onClick={showMoveToToggle}
            startIcon={
              <Icon
                icon={share}
                theme="secondary"
                size="md"
                className="[&>svg]:!stroke-[#18a0fb]"
              />
            }
          >
            Move to
          </Button>

          <Button
            theme="secondary"
            size="sm"
            disabled={selectedUploads.length === 0}
            buttonThemeStyle="ghost"
            onClick={showCopyToToggle}
            startIcon={
              <Icon
                icon={folder_add}
                theme="secondary"
                size="md"
                className="[&>svg]:!stroke-[#18a0fb]"
              />
            }
          >
            Copy to
          </Button>

          <Button
            theme="secondary"
            size="sm"
            buttonThemeStyle="ghost"
            onClick={showUploadFileToggle}
            startIcon={
              <Icon
                icon={file_add}
                theme="secondary"
                size="md"
                className="[&>svg]:!stroke-[#18a0fb]"
              />
            }
          >
            New File
          </Button>

          <Button
            theme="secondary"
            size="sm"
            buttonThemeStyle="ghost"
            onClick={showCreateNewFolderToggle}
            startIcon={
              <Icon
                icon={folder_add}
                theme="secondary"
                size="md"
                className="[&>svg]:!stroke-[#18a0fb]"
              />
            }
          >
            New Folder
          </Button>
        </div>
      </div>

      <div role="bread-crumbs" className="bread-crumbs flex gap-1 mt-2">
        {folder.map((folderName, i) => (
          <div className="flex gap-2 items-center">
            <p
              onClick={() => setFolder((prev) => prev.slice(0, i + 1))}
              className={`cursor-pointer text-base hover:underline text-theme-secondary ${
                i === folder.length - 1 ? "font-semibold" : ""
              }`}
            >
              {folderName}
            </p>
            <Icon icon={chevron_right} theme="secondary" size="md" />
          </div>
        ))}
      </div>

      <div className="bg-theme-background-elevate rounded-md">
        <RepoUploadsTable
          uploads={uploads}
          onFolderClick={folderClickHandler}
          onDownload={fileDownloadHandler}
          onSelectedRows={setSelectedUploads}
          onMoveTo={moveToHandler}
          onCopyTo={copyToHandler}
          resetSelection={selectedUploads.length === 0}
        />
      </div>

      <Modal isOpen={showCreateNewFolder} showClose={false}>
        <div className="pt-14 pb-4 px-4">
          <div className="flex flex-col gap-1 mb-10">
            <h1 className="text-theme-secondary text-xl font-medium">
              Create New Folder
            </h1>
            <h1 className="text-theme-secondary">
              <span>Location:</span>{" "}
              <span className="font-medium">{folder.join("/")}</span>
            </h1>
          </div>
          <CreateFolder
            pathName={folder.join("/")}
            onCreate={getUploads}
            onCancel={showCreateNewFolderToggle}
          />
        </div>
      </Modal>

      <Modal isOpen={showUploadNewFile} close={showUploadFileToggle}>
        <div className="pt-14 pb-4 px-4">
          <div className="flex flex-col gap-1 mb-10">
            <h1 className="text-theme-secondary text-xl font-medium">
              Upload Files
            </h1>
            <h1 className="text-theme-secondary">
              <span>Location:</span>{" "}
              <span className="font-medium">{folder.join("/")}</span>
            </h1>
          </div>

          <DocumentUpload
            destinationFolderPath={folder.join("/")}
            onUploadSuccess={getUploads}
            onCancel={showUploadFileToggle}
          />
        </div>
      </Modal>

      <Modal isOpen={showCopyTo} close={showCopyToToggle}>
        <div className="pt-14 pb-4 px-4">
          <MoveToCopyTo
            currentFolder={folder.join("/")}
            actionMode="Copy"
            selectedUploadsToMove={selectedUploads}
            onClose={showCopyToToggle}
            onSubmit={() => {
              setSelectedUploads([]);
              getUploads();
            }}
          />
        </div>
      </Modal>

      <Modal isOpen={showMoveTo} close={showMoveToToggle}>
        <div className="pt-14 pb-4 px-4">
          <MoveToCopyTo
            currentFolder={folder.join("/")}
            actionMode="Move"
            selectedUploadsToMove={selectedUploads}
            onClose={showMoveToToggle}
            onSubmit={() => {
              setSelectedUploads([]);
              getUploads();
            }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default RepositoryContainer;
