import React from "react";
import Card from "../../atoms/Card/Card";
import Text from "../../atoms/Text/Text";
import ResultViewer from "../ResultViewer/ResultViewer";
import styles from "./ResultCard.module.css";

function ResultCard() {
  return (
    <Card
      className={`${styles["result-card"]} flex flex-col items-center justify-center p-5 pb-9 md:p-7 md:pb-10`}
    >
      <Text className={"mb-5 text-xl clr-text md:mb-6"}>Your Result</Text>
      <ResultViewer />
      <Text className={"text-2xl font-bold text-white mb-1 md:mb-2"}>
        Great
      </Text>
      <Text className={"text-center w-5/6 md:w-5/6 md:text-sm clr-text"}>
        You scored higher than 65% of the people who have taken these tests.
      </Text>
    </Card>
  );
}

export default ResultCard;
