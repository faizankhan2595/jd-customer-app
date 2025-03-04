import { Card, Table, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

function TopLineChart({ series, title, label }) {
    // Convert `y` to a number and `x` to timestamp
    let formattedSeries = series.map((point,index) => ({
        x:  point.x,
        y: Number(point.y) // Ensure `y` is a number
    }));

    // Sort and get the top 3 points
    const sortedPoints = series
        .filter(point => !isNaN(point.y))
        .sort((a, b) => b.y - a.y)
        .slice(0, 3);

    const colors = ['#FF0000', '#00FF00', '#0000FF']; // Red, Green, Blue

    const data = {
        series: [
            {
                name: 'Amplitude',
                data: formattedSeries,
            },
        ],
        options: {
            chart: {
                type: 'line',
                zoom: {
                    enabled: true,
                    type: 'x',
                    autoScaleYaxis: true,
                },

                    animations: {
                      enabled: false
                    },
                    markers: {
                        size: 0
                     }
                 
                  
            },
            dataLabels: {
                enabled: false,
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return !isNaN(val) ? Math.round(val) : 'N/A'; // Round y value to nearest integer
                    },
                },
                title: {
                    text: 'Amplitude',
                    style: {
                      fontSize: '14px',
                      fontWeight: 'normal'
                    }
                  },
            },
            stroke: {
                curve: 'straight',
                width: 1,
            },
            xaxis: {
                type: 'numeric', // Numeric type for x-axis
                min: Math.min(...formattedSeries.map(p => p.x)), // Set min value based on x
                max: Math.max(...formattedSeries.map(p => p.x)), // Set max value based on x
                labels: {
                    formatter: function (value) {
                        return Math.round(value); // Round x value to nearest integer
                    },
                    show: true,
                },
                tickAmount: 6,
                title: {
                    text: 'Frequency (Hz)',
                    style: {
                      fontSize: '14px',
                      fontWeight: 'normal'
                    }
                  }
            },
            tooltip: {
                x: {
                    formatter: (val) => `Frequency #${Math.round(val)}`, // Display whole number in tooltip
                },
                y:{
                    formatter: (val) => `${(val)}` // Display whole number in tooltip
                }
            },
            annotations: {
                points: sortedPoints.map((point, index) => ({
                    x: point.x,
                    y: point.y,
                    marker: {
                        size: 6,
                        fillColor: colors[index],
                        strokeColor: '#000000',
                        radius: 2,
                    },
                    label: {
                        text: `#${index + 1}: ${Math.round(point.y)}`, // Round annotation to nearest integer
                        borderColor: '#000',
                        offsetY: 0,
                        style: {
                            color: '#fff',
                            background: colors[index],
                        },
                    },
                })),
            },
        },
    };
    
    
    // Table Columns with Colors
    const columns = [
        {
            render:(text, record, index) => <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: colors[index],
            }} ></div>,
        },
        // {
        //     title: 'Time',
        //     dataIndex: 'x',
        //     key: 'time',
        //     render: (time) => moment(time).format('DD-MM-YYYY hh:mm A'),
        // },
        {
            title: 'Frequency (Hz)',
            dataIndex: 'x',
            key: 'point',
            render: (freq) => freq.toFixed(2),
            
        },
        {
            title: 'Amplitude',
            dataIndex: 'y',
            key: 'amplitude',
            render: (amplitude, record, index) => (
               <div style={{ fontWeight: 'bold' }}>
                    {amplitude}
                </div>
            ),
        },
    ];

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <Card style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '17px', color: '#000000' }}>
                    {title}
                </div>
                <ReactApexChart options={data.options} series={data.series} type="line" height={370} />
                <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#72849A', textAlign: 'center', marginTop: '10px' }}>
                    {label}
                </div>
            </Card>

            {/* Table for Top 3 Amplitudes */}
            <Card style={{ width: '20%' }}>
                <Table
                    dataSource={sortedPoints}
                    columns={columns}
                    pagination={false}
                    size="small"
                    rowKey="x"
                />
            </Card>
        </div>
    );
}

export default TopLineChart;
