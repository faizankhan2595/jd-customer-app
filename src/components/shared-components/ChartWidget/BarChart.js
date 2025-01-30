import { Card } from 'antd';
import moment from 'moment';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

function BarChart({ series, title, label }) {
    const data = {
        series: [{
            name: 'Amplitude', // Custom label for the series
            data: series,
        }],
        options: {
            chart: {
                type: 'bar', // Ensures this is a bar chart
                zoom: {
                    enabled: false
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '20%', // Thinner bars, with no gaps
                    barHeight: '100%',
                }
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                
                        return val.toFixed(2);
                    }
                }
            },
            stroke: {
                curve: 'straight',
                width: 1
            },
            xaxis: {
                type: 'numeric', // Change x-axis to numeric for frequency values
                labels: {
                    formatter: function (value) {
                        return (typeof value === 'number') ? value.toFixed(2): value; 
                        // return value?.toFixed(2); // Direct numeric values for frequency
                    },
                    show: true,
                },
           
            },
            tooltip: {
                x: {
                    formatter: (val) => {
                        return `${val} Hz`; // Display frequency with "Hz"
                    },
                },
            }
        },
    };

    return (
        <div>
            <Card>
                <div style={{
                    fontWeight: 'bold',
                    fontSize: '17px',
                    color: '#000000',
                }}>{title}</div>
                <ReactApexChart options={data.options} series={data.series} type="bar" height={370} />
                <div style={{
                    fontWeight: 'bold',
                    fontSize: '12px',
                    color: '#72849A',
                    textAlign: 'center',
                    marginTop: '10px'
                }}>{label}</div>
            </Card>
        </div>
    );
}

export default BarChart;
