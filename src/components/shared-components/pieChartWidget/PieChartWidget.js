import Chart from "react-apexcharts";
import React, { useEffect, useState } from 'react';

function PieChartWidget({ title, label, colors, value }) {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: "pie",
        },
        labels: label,
        colors: colors,
        series: value, // Initial series value
        legend: {
            position: "bottom",
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                const seriesIndex = opts.seriesIndex;
                return opts.w.config.series[seriesIndex];
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    });

    // Update chartOptions when `value`, `label`, or `colors` change
    useEffect(() => {
        setChartOptions(prevOptions => ({
            ...prevOptions,
            labels: label, // Update labels if they change
            colors: colors, // Update colors if they change
            series: value,  // Update series dynamically
        }));
    }, [value, label, colors]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }}>
            <div style={{
                fontSize: "16px",
                fontWeight: "700"
            }}>
                {title}
            </div>
            <Chart options={chartOptions} series={chartOptions.series} type="pie" width={340} />
        </div>
    );
}

export default PieChartWidget;
