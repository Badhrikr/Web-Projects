import React from "react";
import { questions } from "./constants";

function QuerySuggestions({
  onQuestionClick,
}: {
  onQuestionClick?(question: string): void;
}) {
  return (
    <div className="my-auto">
      <h3 className="text-theme-secondary  font-medium text-center text-xl">
        How I can help you ?
      </h3>

      <div className="mt-5 flex flex-col gap-3 ">
        {questions.map((question) => (
          <button
            onClick={() => onQuestionClick?.(question)}
            className="text-theme-secondary text-base text-center w-full p-2 rounded-md bg-theme-button-elevate"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuerySuggestions;
