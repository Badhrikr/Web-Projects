import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { dustbin, eye, vertical_more } from "../../../../../helpers/icons";
import useOutsideClick from "../../../../../hooks/use-outside-click";
import Icon from "../../../../../ui-components/Icon";
import IconButton from "../../../../../ui-components/IconButton";
import { FilesTableMoreActionsProps } from "./model";
import Ripples from "react-ripples";

function FilesTableMoreActions({
  showView = true,
  showDelete = true,
  onView,
  onDelete,
  ...fileData
}: FilesTableMoreActionsProps) {
  const [showActions, setShowActions] = useState(false);
  const [ref] = useOutsideClick(
    () => {
      setShowActions(false);
    },
    { closeOnEsc: true }
  );

  const showActionsToggle = () => {
    setShowActions((prev) => !prev);
  };

  return (
    <div className="relative">
      <IconButton
        size="md"
        theme="secondary"
        buttonThemeStyle="ghost"
        className="!shadow-none toggle-button"
        onClick={showActionsToggle}
      >
        <Icon icon={vertical_more} size="md" theme="secondary" />
      </IconButton>

      <CSSTransition
        in={showActions}
        unmountOnExit
        timeout={150}
        classNames="fly"
      >
        <div
          ref={ref}
          className="absolute z-10 right-7 rounded-md bg-theme-background-popup shadow-md w-[150px] px-3 py-3 flex flex-col gap-4"
        >
          {showView && (
            <Ripples className="#dedede4d">
              <button
                className="flex items-center gap-1"
                onClick={() => onView?.(fileData)}
              >
                <Icon icon={eye} size="sm" theme="secondary" />
                <span>View</span>
              </button>
            </Ripples>
          )}

          {showDelete && (
            <Ripples className="#dedede4d">
              <button
                className="flex items-center gap-1 pt-3"
                onClick={() => onDelete?.(fileData)}
              >
                <Icon
                  icon={dustbin}
                  size="sm"
                  theme="secondary"
                  className="[&>svg]:!stroke-red-500"
                />
                <span className="text-red-500 font-medium">Delete</span>
              </button>
            </Ripples>
          )}
        </div>
      </CSSTransition>
    </div>
  );
}

export default FilesTableMoreActions;
