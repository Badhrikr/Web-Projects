import { CSSTransition } from "react-transition-group";
import { ErrorLabelProps } from "./model";

function ErrorLabel({
  show = false,
  message,
  className = "",
}: ErrorLabelProps) {
  const style = `error-label text-xs relative top-1 text-red-800 font-medium ${className}`;

  return (
    <CSSTransition in={show} timeout={150} classNames="fly" unmountOnExit>
      <p className={style}>{message}</p>
    </CSSTransition>
  );
}

export default ErrorLabel;
