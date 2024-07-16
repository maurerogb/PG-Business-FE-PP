"use client";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
// import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";

import { Typography } from "components/ui/Typography";
import CardContainer from "./card-container";
import { CategoricalChartState } from "recharts/types/chart/types";
// import { CategoricalChartState } from "recharts/types/chart/types";

const data = [
  { name: "Group A", value: 800 },
  { name: "Group B", value: 100 },
];

const COLORS = ["#D6D6D6", "#23AAE1"];

export default function TransactionSuccessRate() {
  // const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (
    _: CategoricalChartState,
    index: React.SetStateAction<number>,
  ) => {
    console.log(index);
    // setActiveIndex(index)
  };

  return (
    <CardContainer className="basis-2/6">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center space-y-2 text-center">
          <Typography level="CT" className="text-gray-900">
            Transaction success rate
          </Typography>
          <Typography level="LP">
            Percentage of valid transactions carried out this month
          </Typography>
        </div>

        <div className="mb-4">
          <ResponsiveContainer
            width="100%"
            height={180}
            className="flex items-center justify-center"
          >
            <PieChart
              onMouseEnter={onPieEnter}
              className="flex items-center self-center justify-center"
            >
              <Pie
                data={data}
                innerRadius={35}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                className="flex self-center justify-center"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col items-center justify-center space-y-5">
          <Typography level={"h5"} className="text-gray-50">
            0.0%
          </Typography>

          <Typography level="NP">No successful traction yet.</Typography>
        </div>
      </div>
    </CardContainer>
  );
}
