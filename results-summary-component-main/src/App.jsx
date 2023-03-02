import React from "react";
import Card from "./atoms/Card/Card";
import Attribution from "./molecules/Attribution/Attribution";
import ResultCard from "./molecules/ResultCard/ResultCard";
import ResultSummaryCard from "./molecules/ResultSummaryCard/ResultSummaryCard";

import "./App.css";
function App() {
  return (
    <Card>
      <Card className={"md:flex overflow-hidden app"}>
        <ResultCard />
        <ResultSummaryCard />
      </Card>
      <Attribution />
    </Card>
  );
}

export default App;
