import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { cancel } from "../../helpers/icons";
import useOutsideClick from "../../hooks/use-outside-click";
import Icon from "../Icon";
import { OverlayProps } from "../Overlay/model";
import { ModelProps } from "./model";

function Modal(modalProps: ModelProps & OverlayProps) {
  const {
    isOpen = false,
    children,
    overlayColor = "bg-[rgba(0,0,0,0.6)]",
    closeOnEsc = false,
    closeOnOverlay = false,
    showClose = true,
    showOverlay = true,
    close,
  } = modalProps;

  const [showModal, setShowModal] = useState(isOpen);
  const [modalRef] = useOutsideClick(
    () => {
      if (!closeOnOverlay) return;

      setShowModal(false);
      close?.();
    },
    { closeOnEsc }
  );

  const toggleModal = () => {
    setShowModal(false);
    close?.();
  };

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <>
      {isOpen && showOverlay && (
        <div
          className={`${overlayColor} backdrop-blur-sm fixed inset-0 z-[999]`}
        />
      )}
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames="popup"
        unmountOnExit
      >
        <div className="fixed flex items-center justify-center inset-0 z-[9999]">
          <div
            ref={modalRef}
            className="w-[95vw] sm:w-[60vw] md:w-[50vw] lg:min-w-[40vw] lg:max-w-[45vw] p-1 transition duration-200 ease max-h-full overflow-y-auto overflow-x-hidden absolute bg-theme-background-popup rounded-md"
          >
            {showClose && (
              <span
                onClick={toggleModal}
                className="absolute right-2 bg-theme-background-elevate h-9 w-9 flex items-center justify-center p-2 hover:bg-theme-background-secondary rounded-full cursor-pointer"
              >
                <Icon icon={cancel} size="sm" theme="secondary" />
              </span>
            )}

            {children}
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default Modal;
