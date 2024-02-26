import { DonutChart, Legend } from "@tremor/react";
import React from "react";

const PieChart = ({ data, legend, category, index, title }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex items-center justify-center space-x-12 mt-6">
        <DonutChart
          data={data}
          category={category}
          index={index}
          onValueChange={(v) => setValue(v)}
          className="w-[15rem] h-[15rem]"
        />
        <Legend categories={legend} className="max-w-xs" />
      </div>
    </div>
  );
};

export default PieChart;
