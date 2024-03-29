import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ chartData, type }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Your Progress</h2>
      <Line
        data={chartData}
        options={{
          scales: {
            y: {
              ticks: {
                callback: function(value, index, ticks) {
                  return String(Math.floor(value / 3600)).padStart(2, '0') + ':' + String(Math.floor((value % 3600) / 60)).padStart(2, '0') + ':' + String(value % 60).padStart(2, '0');
                }
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: `${type} progress`
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;