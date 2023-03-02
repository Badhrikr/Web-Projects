import React from "react";
import Card from "../../atoms/Card/Card";
import Text from "../../atoms/Text/Text";
import styles from "./ResultStats.module.css";

function ResultStats(props) {
  return (
    <Card
      className={
        "flex items-center justify-between gap-4 p-4  mb-4 rounded-lg md:p-2 md:mb-3"
      }
      style={{ backgroundColor: `${props.bgStats}` }}
    >
      <img src={props.src} alt="" />
      <Text className={` flex-grow`} style={{ color: `${props.bgStats}` }}>
        {props.statName}
      </Text>
      <Text className={`${styles.mark} text-sm`}>{props.mark} / 100</Text>
    </Card>
  );
}

export default ResultStats;
