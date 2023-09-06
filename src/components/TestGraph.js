import React, { useEffect, useState } from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import ChartComponent from './ChartComponent';
import { DateTime } from 'luxon';

// create a button that allows one to select the current scenario
// thencreate a graph with those characteristics

export const TestGraph = ({ chart_data, curr_scenario }) => {
    const xValues = []
    const yValues = []
    const initial_ctx = {
            type: 'line',
            data: {labels: xValues,
                datasets: [
                    {
                        label: 'Average Values',
                        data: yValues
                    },
                ]
            },
            options: {}
        }
    const [ctx, set_ctx] = useState(initial_ctx)

    // iterate through object based on name - iterate though dates, then map values of average key
    const create_data = () => {
        if (curr_scenario !== 'temp_scenario') {
            const scenario_data = chart_data[curr_scenario]
            // for the scenarios within the name, scroll through the name
            for (const date in scenario_data) {
                if (date !== "high" && date !== "low") {
                    xValues.push(date);
                    yValues.push(scenario_data[date].get('average'))
                }
            }
        }

        const formattedDates = xValues.map((dateStr) => {
            const date = DateTime.fromJSDate(new Date(dateStr));
            return date.toFormat("M/d/yy");
        });

        // const formattedDates = xValues.map((date) => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() % 100}`);
        // update the context of the graph
        const updatedChart  = {
            type: 'line',
            data: {
                labels: formattedDates,
                datasets: [
                    {
                        label: 'Average Values',
                        data: yValues
                    },
                ]
            },
            options: {
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "day",
                            tooltipFormat: "11",
                        },
                        title: {
                            display: true,
                            text: "Date",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Values",
                        },
                    },
                },
            },
        }
        set_ctx(updatedChart);
    }
    

    useEffect(() => {
        console.log('testing current', curr_scenario)
        create_data()
        console.log('final array values', xValues, yValues)
        
    }, [curr_scenario])

    return (
        <div>
            <ChartComponent ctx={ctx} width="40%"/>
        </div> 
        // <div style={{width: "30%", height: "50%", backgroundColor: "lightgray"}}>
        //     <Line data={chart_data}/>
        // </div>
    )
}
