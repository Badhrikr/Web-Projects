import React from "react";
import Card from "../../atoms/Card/Card";
import Text from "../../atoms/Text/Text";
import styles from "./ResultStats.module.css";

function ResultStats(props) {
  return (
    <Card
      className={
        "flex items-center justify-between gap-4 p-4  mb-4 rounded-lg md:p-3 md:mb-3"
      }
      style={{ backgroundColor: `${props.bgStats}` }}
    >
      <img src={props.src} alt="" />
      <Text
        className={` flex-grow text-base md:text-sm`}
        style={{ color: `${props.textColor}` }}
      >
        {props.statName}
      </Text>
      <Text className={`${styles.mark} text-sm`}>
        <span className="font-bold">{props.mark}</span> / 100
      </Text>
    </Card>
  );
}

export default ResultStats;
