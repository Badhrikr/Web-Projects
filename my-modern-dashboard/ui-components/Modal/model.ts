interface ModelProps {
  isOpen: boolean;
  children?: JSX.Element;
  showClose?: boolean;
  closeOnOverlay?: boolean;
  showOverlay?: boolean;
  close?(): void;
}

export type { ModelProps };
