import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ ctx, width }) => {
    const { data, options } = ctx;

    const chartStyle = {
        width: width || '100%', // Set the width to 100% by default, or use the provided width
    };

    return (
        <div style={chartStyle}>
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartComponent;