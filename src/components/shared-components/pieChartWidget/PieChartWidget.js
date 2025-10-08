import Chart from "react-apexcharts";
import React, { useEffect, useState } from 'react';

function PieChartWidget({ title, label, colors, value }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
                        width: 280,
                    },
                    legend: {
                        position: "bottom",
                        fontSize: "12px"
                    },
                },
            },
            {
                breakpoint: 768,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: "bottom",
                        fontSize: "13px"
                    },
                },
            },
        ],
    });

    // Listen for window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Update chartOptions when `value`, `label`, or `colors` change
    useEffect(() => {
        setChartOptions(prevOptions => ({
            ...prevOptions,
            labels: label, // Update labels if they change
            colors: colors, // Update colors if they change
            series: value,  // Update series dynamically
        }));
    }, [value, label, colors]);

    // Calculate responsive chart width (reduced by ~22% for better spacing)
    const getChartWidth = () => {
        if (windowWidth < 480) return Math.min(220, (windowWidth - 80) * 0.78);
        if (windowWidth < 768) return Math.min(235, (windowWidth / 2 - 80) * 0.78);
        if (windowWidth < 1200) return Math.min(250, (windowWidth / 2 - 100) * 0.78);
        return Math.min(265, (windowWidth / 4 - 60) * 0.78);
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            overflow: "hidden"
        }}>
            <div style={{
                fontSize: windowWidth < 480 ? "14px" : "16px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "10px"
            }}>
                {title}
            </div>
            <Chart options={chartOptions} series={chartOptions.series} type="pie" width={getChartWidth()} />
        </div>
    );
}

export default PieChartWidget;
