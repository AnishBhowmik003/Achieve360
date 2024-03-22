import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import LineChart from "./LineChart";
import { Data } from "./Data";

Chart.register(CategoryScale);

export const ProgressChart = () => {
    const [chartData, setChartData] = useState({
      labels: Data.map((data) => data.year), 
      datasets: [
        {
          label: "Your Value ",
          data: Data.map((data) => data.userValue),
          borderColor: "black",
          borderWidth: 2,
          backgroundColor: 'black'
        },
        {
          label: "Expected Value ",
          data: Data.map((data) => data.expectedValue),
          borderColor: "red",
          borderWidth: 2,
          backgroundColor: 'red'
        }
      ]});
      return(
        <div>        
          <LineChart chartData={chartData} />
        </div>
      )
}
