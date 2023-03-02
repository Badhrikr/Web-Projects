import React from "react";
import Button from "../../atoms/Button/Button";
import Card from "../../atoms/Card/Card";
import Text from "../../atoms/Text/Text";
import ResultStats from "../ResultStats/ResultStats";

import Datas from "../../../data.json";

import styles from "./ResultSummaryCard.module.css";

function ResultSummaryCard(props) {
  return (
    <Card className="px-8 py-5 md:py-8">
      {props.children}
      <Text className="mb-5 text-xl font-bold">Summary</Text>

      {Datas.map((data) => {
        return (
          <ResultStats
            key={data.key}
            src={data.icon}
            statName={data.category}
            mark={data.score}
            bgStats={data["bg-stats"]}
            className={`${styles.category}`}
          />
        );
      })}
      <Button label="Continue" className="mt-1 btn md:p-3 md:text-sm" />
    </Card>
  );
}

export default ResultSummaryCard;
