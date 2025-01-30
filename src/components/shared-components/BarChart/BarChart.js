import React from "react";
import Chart from "react-apexcharts";

function BarChart({
  title,
  colors = ["#38B4EC"],
  series = [{ name: "Series A", data: [10, 20, 40, 60] }],
  categories = ["Acme Co", "Barone LLC", "Binford Ltd", "Abstergo Ltd"], // Company names for x-axis
}) {
  // Get max value dynamically from the series
  const allValues = series.flatMap((s) => s.data);
  const maxValue = Math.max(...allValues);
  const roundedMax = Math.ceil(maxValue); // Ensure max is a whole number
  const tickAmount = roundedMax > 5 ? 5 : roundedMax; // Limit ticks for readability

  const chartOptions = {
    chart: {
      height: 350,
      type: "bar",
      stacked: false,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    colors,
    series,
    xaxis: {
      categories,
      labels: {
        formatter: (value) => value.length > 5 ? value.substring(0, 5) + '...' : value, // Truncate only on x-axis
        style: { fontSize: "12px", fontWeight: "bold" },
      },
    },
    yaxis: {
      min: 0,
      max: roundedMax,
      tickAmount, // Ensures whole number ticks
      forceNiceScale: true, // Helps maintain whole number scaling
      labels: {
        formatter: (val) => Math.round(val), // Ensure whole number labels
      },
      axisTicks: { show: true },
      title: { text: undefined },
    },
    tooltip: {
      shared: false,
      intersect: true,
      // Customize tooltip to show full x-axis label
      x: {
        formatter: (value) => value, // Show full string in tooltip
      },
    },
    legend: { horizontalAlign: "left", offsetX: 40 },
  };

  return (
    <div>
      <div style={{ fontSize: "12px", fontWeight: "600" }}>{title}</div>
      <Chart options={chartOptions} series={series} type="bar" height={350} />
    </div>
  );
}

export default BarChart;
