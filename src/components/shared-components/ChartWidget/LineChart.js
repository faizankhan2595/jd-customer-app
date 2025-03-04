import { Card, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef } from 'react'
import ReactApexChart from 'react-apexcharts';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function LineChart({ series, title, label, graphType, start_date, end_date, disabled, dateSelector }) {
    const history = useHistory();
    const { id } = useParams();
    const lastZoomTime = useRef(0);
    const [chartData, setChartData] = React.useState({
        series: [],
        options: {},
    })
    const handleZoom = (chartContext, { xaxis }) => {
        const diff = xaxis.max - xaxis.min;
        lastZoomTime.current = Date.now();
        let format = "DD-MM-YYYY"; // Default: Show Full Date
        // if (dateSelector == "1") {
        //     return date.format("HH:mm");  // Show hours and minutes
        // } else if (dateSelector == "7") {
        //     return date.format("dddd, DD-MM-YYYY");  // Show week name + date
        // } else {
        //     return date.format("DD-MM-YYYY");  // Default to date format
        // }
        if (diff < 1000 * 60 * 60 * 24) {  // Less than 1 day → Show Hours
            format = "HH:mm";
        } else if (diff < 1000 * 60 * 60 * 24 * 7) {  // Less than 1 week → Show Day
            format = "dddd, DD-MM-YYYY";
        } else if (diff < 1000 * 60 * 60 * 24 * 30) {  // Less than 1 month → Show Week
            format = "DD-MM-YYYY";
        } else if (diff < 1000 * 60 * 60 * 24 * 365) {  // Less than 1 year → Show Month
            format = "MMM-YYYY";
        }

        chartContext.updateOptions({
            xaxis: {
                labels: { formatter: (value) => moment(value).format(format) },
            },
            tooltip: {
                x: { formatter: (val) => moment(val).format(format) },
            },
        });
    };

    const handleClick = (data, index) => {
        if (!graphType) {
            return;
        }
        // if (disabled) {
        //     return;
        // }
        if (index == -1) {
            return;
        }
        if (data.length == 0) {
            return;
        }
        if (Date.now() - lastZoomTime.current < 500) return;
        const bin = data[index].extraValue;

        if (bin == null || bin == "") {
            message.error("No data available for this point");
            return;
        }
        console.log(data[index]);


        history.push(`analysisReport/${id}/${graphType}/${bin}/${data[index].x}/${data[index].y}`);
        localStorage.setItem('graphType', graphType)
        localStorage.setItem('tab', 'analysis');
        localStorage.setItem('deviceId', localStorage.getItem('deviceId2'))
        localStorage.setItem('start_date', start_date)
        localStorage.setItem('end_date', end_date)
        localStorage.setItem('dateSelector', dateSelector)
    };


    useEffect(() => {
        setChartData({
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
                    events: {
                        click: function (event, chartContext, config) {
                            if (typeof config.seriesIndex !== 'undefined' && typeof config.dataPointIndex !== 'undefined') {
                                // return;
                                handleClick(config.config?.series[0].data, config.dataPointIndex);

                            }
                        },

                        zoomed: handleZoom,

                    }
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

                            // If dateSelector is a date range, apply dynamic formatting
                            if (dateSelector === "Date-Range" && start_date && end_date) {
                                const start = moment(start_date);
                                const end = moment(end_date);
                                const diff = end.diff(start, "days");

                                if (diff < 1) {
                                    return date.format("HH:mm");
                                } else if (diff < 7) {
                                    return date.format("ddd, DD-MM");
                                } else if (diff < 30) {
                                    return date.format("DD-MM-YYYY");
                                } else {
                                    return date.format("MMM YYYY");
                                }
                            }
                            else {
                                if (dateSelector == "1") {
                                    return date.format("HH:mm");  // Show hours and minutes
                                } else if (dateSelector == "7") {
                                    return date.format("dddd, DD-MM-YYYY");  // Show week name + date
                                } else {
                                    return date.format("DD-MM-YYYY");
                                } 
                            }
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
                    // yaxis: [
                    //     {
                    //         y: 8, // Max Threshold
                    //         borderColor: '#64E926', // Green color
                    //         strokeDashArray: 0, // Solid line
                    //         label: {
                    //             borderColor: '#00E396',
                    //             style: {
                    //                 color: '#fff',
                    //                 background: '#00E396',
                    //             },
                    //             // text: 'Max Threshold',
                    //         },
                    //     },
                    //     {
                    //         y: 4,
                    //         borderColor: '#FF4768',
                    //         strokeDashArray: 0,
                    //         label: {
                    //             borderColor: '#FF4560',
                    //             style: {
                    //                 color: '#fff',
                    //                 background: '#FF4560',
                    //             },
                    //             // text: 'Min Threshold',
                    //         },
                    //     },
                    // ],
                    // points: [
                    //     {
                    //         x: moment('2024-12-12 10:57', 'YYYY-MM-DD HH:mm').valueOf(),  // Example time (change as needed)
                    //         y: 3,  // Max Threshold
                    //         marker: {
                    //             size: 6,  // Dot size (radius * 2 for full diameter)
                    //             fillColor: '#0000FF',  // Blue color
                    //             strokeColor: '#0000FF', // Blue color
                    //             radius: 2,  // 2px radius (dot)
                    //         },

                    //     },

                    // ],
                },
            },
        });
    }, [series, dateSelector]);

    return (
        <div>  <Card>
            <div style={{
                fontWeight: 'bold',
                fontSize: '17px',
                color: '#000000',
            }}>{title}</div>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={370}
                key={JSON.stringify(chartData.series)} // Forces re-render
            />
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