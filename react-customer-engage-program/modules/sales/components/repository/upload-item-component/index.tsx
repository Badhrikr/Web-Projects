import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import {
  getExtensionFromFileName,
  getFileTypeIconFromFileName,
} from "../../../../../helpers/get-filetype-icon";
import {
  copy,
  folder,
  share,
  vertical_more,
} from "../../../../../helpers/icons";
import useOutsideClick from "../../../../../hooks/use-outside-click";
import Icon from "../../../../../ui-components/Icon";
import IconButton from "../../../../../ui-components/IconButton";
import { UploadItemComponentProps } from "./model";
import Ripples from "react-ripples";

function UploadItemComponent({
  upload,
  showActions = true,
  onMoveTo,
  onCopyTo,
  onFolderClick,
}: UploadItemComponentProps) {
  const [showActionsPopup, setShowActionsPopup] = useState(false);

  const [ref] = useOutsideClick(() => {
    setShowActionsPopup(false);
  });

  const showActionsPopupToggle = () => {
    setShowActionsPopup((prev) => !prev);
  };

  const folderClickHandler = () => {
    if (!upload.isFolder) return;

    onFolderClick?.(upload);
  };

  return (
    <div className="flex gap-3 items-center">
      {upload.isFolder ? (
        <Icon
          icon={folder}
          size="lg"
          theme="secondary"
          iconType="solid"
          className="[&>svg]:!fill-[#FFDB68]"
        />
      ) : (
        getFileTypeIconFromFileName(
          getExtensionFromFileName(upload?.fileName ?? ""),
          "lg"
        )
      )}
      <p
        className={`${
          upload.isFolder ? "cursor-pointer group-hover:underline" : ""
        } max-w-[20ch] overflow-hidden text-ellipsis`}
        onClick={folderClickHandler}
      >
        {upload.folderName ?? upload.fileName}
      </p>

      <div className="w-[20px] h-[20px]">
        {showActions && !upload.isFolder && (
          <div
            className={`relative ${
              showActionsPopup ? "visible" : "invisible"
            } group-hover:visible `}
          >
            <IconButton
              onClick={showActionsPopupToggle}
              size="xs"
              theme="secondary"
              buttonThemeStyle="ghost"
              className="!shadow-none"
            >
              <Icon icon={vertical_more} size="md" theme="secondary" />
            </IconButton>

            <CSSTransition
              in={showActionsPopup}
              timeout={150}
              classNames="fly"
              unmountOnExit
            >
              <div
                ref={ref}
                className="flex flex-col absolute top-5 z-10 w-[150px] bg-theme-background-popup px-2 py-4 rounded-md shadow-md"
              >
                <div
                  onClick={() => onCopyTo?.(upload)}
                  className="flex gap-1 items-center hover:bg-theme-button-elevate py-2 px-1 cursor-pointer"
                >
                  <Icon
                    icon={copy}
                    size="md"
                    theme="secondary"
                    className="[&>svg]:!stroke-[#2ab7ca]"
                  />
                  <p className="text-sm text-theme-secondary">Copy to</p>
                </div>

                <div
                  onClick={() => onMoveTo?.(upload)}
                  className="flex gap-1 items-center hover:bg-theme-button-elevate py-2 px-1 cursor-pointer"
                >
                  <Icon
                    icon={share}
                    size="md"
                    theme="secondary"
                    className="[&>svg]:!stroke-[#FF5852]"
                  />
                  <p className="text-sm text-theme-secondary">Move to</p>
                </div>
              </div>
            </CSSTransition>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadItemComponent;
