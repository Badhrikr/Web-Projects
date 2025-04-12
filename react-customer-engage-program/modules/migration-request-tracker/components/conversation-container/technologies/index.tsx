import React from "react";
import { TechnologiesTableProps } from "./model";

function TechnologiesTable({ technologies }: TechnologiesTableProps) {
  return (
    <table
      cellPadding={14}
      border={9}
      className="bg-theme-background-elevate w-[500px] rounded-md"
    >
      <thead>
        <tr className="text-left">
          <th className="text-theme-secondary-500 font-medium">Component</th>
          <th className="text-theme-secondary-500 font-medium">
            Source Technology
          </th>
          <th className="text-theme-secondary-500 font-medium">
            Target Technology
          </th>
        </tr>
      </thead>
      <tbody>
        {technologies?.map((technology) => (
          <tr className="">
            <td>{technology.componentName}</td>
            <td className="text-center">{technology.fromTech}</td>
            <td className="text-center">{technology.toTech}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TechnologiesTable;
