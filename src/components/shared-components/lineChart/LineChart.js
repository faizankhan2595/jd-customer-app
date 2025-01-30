import React from "react";
import Chart from "react-apexcharts";

function LineChart({
  title,
  colors = ["#38B4EC"],
  series = [{ name: "Series A", data: [10, 20, 40, 60] }],
  categories = ["Acme Co", "Barone LLC", "Binford Ltd", "Abstergo Ltd"], // Company names for x-axis
}) {
  // Get max value dynamically from the series
  const allValues = series.flatMap((s) => s.data);
  const maxValue = Math.max(...allValues);
  const roundedMax = Math.ceil(maxValue * 1.1); // Add 10% buffer to max value
  const tickAmount = Math.min(roundedMax / 5, 5); // Limit ticks to 5 for readability

  const chartOptions = {
    chart: {
      height: 350,
      type: "line",
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    colors,
    series,
    xaxis: {
      categories,
      // title: { text: "Customers" },
      labels: {
        rotate: -45, // Rotates text to prevent overflow
        style: { fontSize: "12px", fontWeight: "bold" },
      },
    },
    yaxis: {
      min: 0,
      max: roundedMax,
      tickAmount, // Ensures nice ticks with whole numbers
      forceNiceScale: true, // Helps maintain whole number scaling
      labels: {
        formatter: (val) => Math.round(val), // Ensure whole number labels
      },
      axisTicks: { show: true },
      title: { text: undefined },
    },
    tooltip: { shared: false, intersect: true },
    legend: { horizontalAlign: "left", offsetX: 40 },
  };

  return (
    <div>
      <div style={{ fontSize: "12px", fontWeight: "600" }}>{title}</div>
      <Chart options={chartOptions} series={series} type="line" height={350} />
    </div>
  );
}

export default LineChart;
