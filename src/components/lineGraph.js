import React from "react";
import { Line } from "react-chartjs-2";
const LineGraph = (props) => {
  return (
    <div className="table">
      <Line
        data={{
          labels: props.label.map((l) => l.substr(0, 10)),
          datasets: [
            {
              label: "Corona Virus across the country",
              data: props.yAxis,
              fill: true,
              backgroundColor: "rgb(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 0.7)",
            },
          ],
        }}
      />
    </div>
  );
};

export default LineGraph;
