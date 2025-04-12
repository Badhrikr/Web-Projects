import React, { useEffect, useRef, useState } from "react";
import { send } from "../../../../helpers/icons";
import Icon from "../../../../ui-components/Icon";
import IconButton from "../../../../ui-components/IconButton";
import { MessageBoxProps } from "./model";

function MessageBox({ onSend, focus = true }: MessageBoxProps) {
  const [message, setMessage] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  const messageSendHandler = () => {
    if (message.length > 0) {
      console.log(message.replaceAll("\n", "<br>").replace(/(<br>)*$/g, ""));

      onSend?.(message.replaceAll("\n", "<br>").replace(/(<br>)*$/g, ""));
      setMessage("");

      if (inputRef?.current) inputRef.current.innerHTML = "";
    } else {
      setShowPrompt(true);
      setTimeout(() => {
        setShowPrompt(false);
      }, 3000);
    }
  };

  const keyupHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    setMessage((e.target as HTMLDivElement).innerHTML);
  };

  const keydownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      messageSendHandler();
      return;
    }
  };

  const handleTextContent = ({ clipboardData }: ClipboardEvent) => {
    if (!inputRef?.current) return;

    const pastedText = clipboardData?.getData("text/plain");

    const p = document.createElement("p");
    p.innerHTML = pastedText ?? "";
    inputRef.current.appendChild(p);
  };

  const handleImageContent = (e: ClipboardEvent) => {
    // TOCHANGE
    e.preventDefault();
    return;

    // if (e.clipboardData?.types.includes("Files")) {
    //   const files = e.clipboardData.files;
    //   for (let i = 0; i < files.length; i++) {
    //     if (files[i].type.startsWith("image/")) {
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         if (!inputRef?.current) return;

    //         const image = new Image();
    //         image.src = reader.result as string;
    //         image.style.maxHeight = "200px";
    //         image.style.maxWidth = "100%";

    //         inputRef.current.appendChild(image);
    //       };
    //       reader.readAsDataURL(files[i]);
    //     }
    //   }
    // }
  };

  useEffect(() => {
    if (!inputRef?.current) return;

    inputRef.current.focus();

    inputRef.current.addEventListener("paste", (e: ClipboardEvent) => {
      e.preventDefault();

      handleTextContent(e);
      handleImageContent(e);

      if (!inputRef?.current) return;

      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(inputRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
      inputRef.current.focus();
    });
  }, []);

  useEffect(() => {
    if (!focus || !inputRef?.current) return;

    inputRef.current.focus();
  }, [focus]);

  return (
    <div className="relative">
      <div className="flex flex-col">
        {showPrompt && (
          <h4 className="text-theme-secondary-450 text-sm px-3 py-2 bg-theme-background-elevate">
            Enter message to continue
          </h4>
        )}

        <div className="flex gap-1 bg-theme-background-elevate rounded-md">
          <div
            className={`min-h-[20px] max-h-[200px] whitespace-pre-wrap break-words break-all w-full overflow-y-scroll outline-none text-theme-secondary px-2 py-3 text-sm ${
              message.length > 0 ? "" : "before:content-['Type_your_message']"
            } before:pointer-events-none before:absolute`}
            contentEditable
            ref={inputRef}
            onKeyUp={keyupHandler}
            onKeyDown={keydownHandler}
          ></div>

          <div className="flex items-end">
            <IconButton
              theme="primary"
              size="md"
              buttonThemeStyle="ghost"
              className="!shadow-none -rotate-45"
              onClick={messageSendHandler}
            >
              <Icon icon={send} theme="secondary" size="md" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
