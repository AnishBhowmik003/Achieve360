import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import LineChart from "./LineChart";
import { useEffect } from "react";
import axios from 'axios';


Chart.register(CategoryScale);

export const ProgressChart = ({ onNavigate, email }) => {
  useEffect(() => {
    axios.post("http://localhost:6969/fetchProgress", { email: email }, { headers: {} })
    .then((res) => {
      if (res.status === 200) {
        var x = [];
        var y = [];
        for (var i = 0; i < res.data.res.length; i++) {
          x.push(parseInt(res.data.res[i].days));
          const temp = res.data.res[i].time.split(':');
          y.push(parseInt(temp[0] * 60 * 60 + temp[1] * 60 + temp[2]));
        }
        setChartData({
          labels: x,
          datasets: [
            {
              label: "Your Value ",
              data: y,
              borderColor: "black",
              borderWidth: 2,
              backgroundColor: 'black'
            },
          ]
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  
  const [chartData, setChartData] = useState({datasets: []});
  console.log(chartData.labels)

  return (
    <div>
      <LineChart chartData={chartData} />
      <button onClick={() => onNavigate('dashboard')} style={{ marginTop: '20px' }}>Back to Dashboard</button>
    </div>
  );
};
