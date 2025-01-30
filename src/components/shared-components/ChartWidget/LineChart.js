import { Card } from 'antd';
import moment from 'moment';
import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function LineChart({ series, title ,label}) {
    const history = useHistory();
    const data = {
        series: [{
            name: 'Amplitude', // Custom label for the series
            data: series,
        }],
        options: {
            chart: {
                type: 'line',
                zoom: {
                    enabled: true, // Enable zoom functionality
                    type: 'x',     // Zoom along the x-axis (options: 'x', 'y', 'xy')
                    autoScaleYaxis: true, // Adjust y-axis automatically when zoomed
                },
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return val?.toFixed(2);
                    }
                }
            },
            stroke: {
                curve: 'straight',
                width: 1
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    formatter: function (value) {
                        const date = moment(value);
                        return date.format("HH:mm");
                    },
                    show: true,
                },
                tickAmount: 6,
            },
            tooltip: {
                x: {
                    formatter: (val) => {
                        return moment(val).format('HH:mm DD-MM-YYYY');
                    },
                },
            },
            annotations: {
                yaxis: [
                    {
                        y: 8, // Max Threshold
                        borderColor: '#64E926', // Green color
                        strokeDashArray: 0, // Solid line
                        label: {
                            borderColor: '#00E396',
                            style: {
                                color: '#fff',
                                background: '#00E396',
                            },
                            // text: 'Max Threshold',
                        },
                    },
                    {
                        y: 4, 
                        borderColor: '#FF4768',
                        strokeDashArray: 0,
                        label: {
                            borderColor: '#FF4560',
                            style: {
                                color: '#fff',
                                background: '#FF4560',
                            },
                            // text: 'Min Threshold',
                        },
                    },
                ],
                points: [
                    {
                        x: moment('2024-12-12 10:57', 'YYYY-MM-DD HH:mm').valueOf(),  // Example time (change as needed)
                        y: 3,  // Max Threshold
                        marker: {
                            size: 6,  // Dot size (radius * 2 for full diameter)
                            fillColor: '#0000FF',  // Blue color
                            strokeColor: '#0000FF', // Blue color
                            radius: 2,  // 2px radius (dot)
                        },
                        events: {
                            click: function (event, chartContext, config) {
                                const clickedDot = config.config.annotations.points[config.index];
                                console.log("dasdasdsead");
                                if (clickedDot) {
                                    history.push('/new-page');  // Redirect to a new page
                                }
                            },
                        },
                    },
              
                ],
            },
        },
    };
    return (
        <div>  <Card>
            <div style={{
                fontWeight: 'bold',
                fontSize: '17px',
                color: '#000000',
            }}>{title}</div>
            <ReactApexChart options={data.options} series={data.series} type="line" height={370} />
            <div style={{
                fontWeight: 'bold',
                fontSize: '12px',
                color: '#72849A',
                textAlign: 'center',
                marginTop: '10px'
            }}>{label}</div>
        </Card></div>
    )
}

export default LineChart