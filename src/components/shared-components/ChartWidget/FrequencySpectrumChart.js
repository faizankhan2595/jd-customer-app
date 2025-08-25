import { Card, Table } from 'antd';
import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

function FrequencySpectrumChart({ frequencyData = [], title = "Amplitude Spectrum" }) {
  // Calculate data for chart with useMemo to prevent recalculation on re-renders
  const {
    optimizedData,
    sortedPoints,
    yMin,
    yMax,
    xMin,
    xMax
  } = useMemo(() => {
    // Ensure frequencyData is valid
    if (!Array.isArray(frequencyData) || frequencyData.length === 0) {
      return {
        optimizedData: [],
        sortedPoints: [],
        yMin: 1e+0,
        yMax: 1e+5,
        xMin: 0,
        xMax: 4e+4
      };
    }

    // Filter out invalid points
    const validPoints = frequencyData.filter(point => 
      point && !isNaN(point.x) && !isNaN(point.y) && point.y > 0
    );
    
    // Calculate min/max for axes
    let xValues = validPoints.map(point => point.x);
    let yValues = validPoints.map(point => point.y);
    
    const xMin = xValues.length ? Math.max(0, Math.min(...xValues)) : 0;
    const xMax = xValues.length ? Math.max(...xValues) * 1.05 : 4e+4;
    const yMin = yValues.length ? Math.max(1e-16, Math.min(...yValues) * 0.1) : 1e+0;
    const yMax = yValues.length ? Math.max(...yValues) * 10 : 1e+5;
    
    // Get top 3 peaks
    const topPeaks = [...validPoints]
      .sort((a, b) => b.y - a.y)
      .slice(0, 3);
      
    // Data optimization for large datasets
    let optimizedData = validPoints;
    
    // If we have more than 5000 points, downsample
    if (validPoints.length > 5000) {
      // Keep all significant peaks and downsample the rest
      // First identify significant points (top 100 by amplitude)
      const significantPoints = [...validPoints]
        .sort((a, b) => b.y - a.y)
        .slice(0, 100);
      
      const significantIds = new Set(significantPoints.map(p => p.x));
      
      // Create buckets for downsampling (divide x-axis into 2000 segments)
      const bucketSize = (xMax - xMin) / 2000;
      const buckets = {};
      
      // Sort the remaining points into buckets
      for (const point of validPoints) {
        // Always keep significant points
        if (significantIds.has(point.x)) {
          continue;
        }
        
        // Put the rest in buckets
        const bucketIndex = Math.floor((point.x - xMin) / bucketSize);
        if (!buckets[bucketIndex]) {
          buckets[bucketIndex] = [];
        }
        buckets[bucketIndex].push(point);
      }
      
      // For each bucket, keep the point with maximum amplitude
      const sampledPoints = Object.values(buckets).map(bucketPoints => {
        if (bucketPoints.length === 0) return null;
        return bucketPoints.reduce((max, current) => 
          current.y > max.y ? current : max, bucketPoints[0]);
      }).filter(Boolean);
      
      // Combine significant points with sampled points
      optimizedData = [...significantPoints, ...sampledPoints];
    }
    
    return {
      optimizedData,
      sortedPoints: topPeaks,
      yMin,
      yMax,
      xMin,
      xMax
    };
  }, [frequencyData]);

  const colors = ['#FF0000', '#00FF00', '#0000FF']; 

  // Build chart options with optimized settings
  const chartOptions = {
    chart: {
      type: 'scatter',
      zoom: {
        enabled: true,
        type: 'xy',
      },
      animations: {
        enabled: false
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      background: '#FFFFFF',
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 2,
      opacity: 0.8,
      strokeWidth: 0
    },
    yaxis: {
      type: 'log',
      min: yMin,
      max: yMax,
      labels: {
        formatter: function (val) {
          return val.toExponential(0);
        },
      },
      title: {
        text: 'Amplitude',
        style: {
          fontSize: '14px',
          fontWeight: 'normal'
        }
      },
      logarithmic: true,
      forceNiceScale: true,
    },
    xaxis: {
      type: 'numeric',
      min: xMin,
      max: xMax,
      tickAmount: 8,
      labels: {
        formatter: function (val) {
          return val.toExponential(0);
        },
      },
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
        formatter: (val) => `${val.toFixed(2)} Hz`,
      },
      y: {
        formatter: (val) => `${val.toExponential(2)}`,
      },
      shared: false,
      intersect: true,
      followCursor: false,
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      borderColor: '#E0E0E0',
      strokeDashArray: 0,
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
          text: `#${index + 1}: ${point.y.toExponential(2)}`,
          borderColor: '#000',
          offsetY: 0,
          style: {
            color: '#fff',
            background: colors[index],
          },
        },
      })),
    },
  };

  // Table Columns with Colors
  const columns = [
    {
      render: (text, record, index) => (
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: colors[index],
          }}
        ></div>
      ),
    },
    {
      title: 'Frequency (Hz)',
      dataIndex: 'x',
      key: 'frequency',
      render: (freq) => freq.toFixed(2),
    },
    {
      title: 'Amplitude',
      dataIndex: 'y',
      key: 'amplitude',
      render: (amplitude) => (
        <div style={{ fontWeight: 'bold' }}>
          {amplitude.toExponential(2)}
        </div>
      ),
    },
  ];

  // Memoize series data to prevent unnecessary recalculations
  const seriesData = useMemo(() => [{
    name: 'Amplitude',
    data: optimizedData,
  }], [optimizedData]);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Card style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold', fontSize: '17px', color: '#000000' }}>
          {title}
        </div>
        <ReactApexChart
          options={chartOptions}
          series={seriesData}
          type="scatter"
          height={370}
        />
      </Card>

      {/* Table for Top 3 Peaks */}
      {sortedPoints.length > 0 && (
        <Card style={{ width: '20%' }}>
          <Table
            dataSource={sortedPoints}
            columns={columns}
            pagination={false}
            size="small"
            rowKey={(record, index) => `peak-${index}`}
          />
        </Card>
      )}
    </div>
  );
}

export default FrequencySpectrumChart;