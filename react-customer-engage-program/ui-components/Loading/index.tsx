import { LoadingModel } from "./model";
import {
  loadingCommonStyles,
  loadingSize,
  loadingStyles,
} from "./constants";

function Loading(loadingProps: LoadingModel) {
  const { size, theme } = loadingProps;

  const styles =
    loadingCommonStyles.join(" ") +
    " " +
    loadingStyles[theme].join(" ") +
    " " +
    (loadingSize[size].join(" "));

  return <div className={styles} />;
}
export default Loading;
