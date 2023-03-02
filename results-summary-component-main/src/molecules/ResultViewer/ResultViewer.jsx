import React from "react";
import Card from "../../atoms/Card/Card";
import Text from "../../atoms/Text/Text";
import styles from "./ResultViewer.module.css";

function ResultViewer() {
  return (
    <Card
      className={`${styles["result"]} grid place-items-center p-10 mb-3 md:mb-4`}
    >
      <Text className={"text-6xl font-extrabold text-white md:text-5xl"}>
        76
      </Text>
      <Text className={"md:text-sm clr-text-2"}>of 100</Text>
    </Card>
  );
}

export default ResultViewer;
