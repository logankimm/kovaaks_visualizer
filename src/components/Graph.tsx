import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export const Graph = ({chartData} : {chartData:any}) => {
    return (
        <div>
            <Bar data={chartData} />
        </div>
    )
}