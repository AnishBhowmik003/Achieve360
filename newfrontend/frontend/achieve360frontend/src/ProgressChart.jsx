import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import LineChart from "./LineChart";
import { Data } from "./Data";

Chart.register(CategoryScale);

const data = {
  labels: ['Red', 'Orange', 'Blue'],
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
      {
        label: 'Popularity of colours',
        data: [55, 23, 96],
        // you can set indiviual colors for each bar
        backgroundColor: [
          'rgba(255, 255, 255, 0.6)',
          'rgba(255, 255, 255, 0.6)',
          'rgba(255, 255, 255, 0.6)'
        ],
        borderWidth: 1,
      }
  ]
}

export const ProgressChart = () => {
    const [chartData, setChartData] = useState({
      labels: Data.map((data) => data.year), 
      datasets: [
        {
          label: "Users Gained ",
          data: Data.map((data) => data.userGain),
          borderColor: "black",
          borderWidth: 2
        }
      ]});
      return(
        <div>        
          <LineChart chartData={chartData} />
        </div>
      )
}
