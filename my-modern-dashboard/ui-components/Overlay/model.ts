interface OverlayProps {
  children: JSX.Element;
  closeOnEsc?: boolean;
  overlayColor?: string;
  className?: string;
  outsideClicked?(): void;
}

export type { OverlayProps };
