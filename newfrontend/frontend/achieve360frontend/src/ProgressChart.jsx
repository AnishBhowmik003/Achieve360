import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import LineChart from "./LineChart";
import { useEffect } from "react";
import axios from 'axios';


Chart.register(CategoryScale);

export const ProgressChart = ({ onNavigate, email, type }) => {
  useEffect(() => {
    axios.post("http://localhost:6969/fetchProgress", { email: email, type: type }, { headers: {} })
    .then((res) => {
      if (res.status === 200) {
        var x = [];
        var y = [];
        res.data.res.sort((a, b) => {
          return a.days - b.days;
        });
        console.log(res.data.res);
        for (var i = 0; i < res.data.res.length; i++) {
          x.push(parseInt(res.data.res[i].days));
          if(type == 'workout') {
            const temp = res.data.res[i].time.split(':');
            y.push(parseInt(parseInt(temp[0] * 60 * 60) + parseInt(temp[1] * 60) + parseInt(temp[2])));
          }
          else {
            y.push(parseInt(res.data.res[i].calories));
          }
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
      console.error(error);
    });
  }, []);
  
  const [chartData, setChartData] = useState({datasets: []});

  return (
    <div>
      <LineChart chartData={chartData} type={type}/>
      <button onClick={() => onNavigate('dashboard')} style={{ marginTop: '20px' }}>Back to Dashboard</button>
    </div>
  );
};
