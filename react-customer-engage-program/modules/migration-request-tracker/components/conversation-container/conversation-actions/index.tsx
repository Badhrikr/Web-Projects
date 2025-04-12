import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { horizontal_more, reply } from "../../../../../helpers/icons";
import useOutsideClick from "../../../../../hooks/use-outside-click";
import Button from "../../../../../ui-components/Button";
import Icon from "../../../../../ui-components/Icon";
import IconButton from "../../../../../ui-components/IconButton";

function ConversationActions({
  onReply,
  className,
}: {
  onReply?(): void;
  className: string;
}) {
  const [showActions, setShowActions] = useState(false);

  const [ref] = useOutsideClick(() => setShowActions(false), {
    closeOnEsc: true,
  });

  const showActionsToggle = () => {
    setShowActions(!showActions);
  };

  const replyHandler = () => {
    onReply?.();
    setShowActions(false);
  };

  return (
    <div ref={ref} className={(showActions ? "" : className) + " relative"}>
      <IconButton
        onClick={showActionsToggle}
        theme="secondary"
        size="sm"
        buttonThemeStyle="ghost"
        className="!shadow-none"
      >
        <Icon
          icon={horizontal_more}
          theme="secondary"
          size="md"
          iconType="solid"
        />
      </IconButton>

      <CSSTransition
        in={showActions}
        classNames="fly"
        timeout={150}
        unmountOnExit
      >
        <div className="absolute flex flex-col gap-0 left-4 w-[120px] py-2 rounded-md shadow-md bg-theme-background-popup">
          <div className="w-full">
            <Button
              onClick={replyHandler}
              theme="secondary"
              size="sm"
              buttonThemeStyle="ghost"
              className="!justify-start w-full"
              startIcon={<Icon icon={reply} theme="secondary" size="sm" />}
            >
              Reply
            </Button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default ConversationActions;
