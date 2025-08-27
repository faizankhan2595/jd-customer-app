import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Card, Button, Select, Modal, DatePicker, message } from "antd";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { axiosInstance } from "App";
import { API_BASE_URL } from "constants/ApiConstant";
import SeriesImage from "assets/images/Mask group.png";

const { Option } = Select;

const SensorAnalysis = () => {
  // Check if current user is a free user (role id 5)
  const userRole = parseInt(localStorage.getItem("role"));
  const isFreeUser = userRole === 5;

  // Highcharts chart refs
  const mainChartRef = useRef(null);
  const spectrumChartRef = useRef(null);
  
  // 3-axis spectrum chart refs for _0.bin files
  const spectrumChartRefX = useRef(null);
  const spectrumChartRefY = useRef(null);
  const spectrumChartRefZ = useRef(null);
  
  // Multi-spectrum chart refs (for cases with both 3-axis and 1-axis)
  const multiSpectrum3AxisRefX = useRef(null);
  const multiSpectrum3AxisRefY = useRef(null);
  const multiSpectrum3AxisRefZ = useRef(null);
  const multiSpectrum1AxisRef = useRef(null);
  const history = useHistory();
  const { machineId, sensorId } = useParams();
  const [selectedMetricType, setSelectedMetricType] = useState("mid_freq_acceleration_p2p");
  const [selectedAxis, setSelectedAxis] = useState("x");
  const [selectedAlarm, setSelectedAlarm] = useState(sensorId);
  const [sensorsData, setSensorsData] = useState([]);
  const [selectorDate, setSelectorDate] = useState("1");
  const [dateRangeModal, setDateRangeModal] = useState(false);
  const [modalStartDate, setModalStartDate] = useState(null);
  const [modalEndDate, setModalEndDate] = useState(null);
  const [startDate, setStartDate] = useState(moment().subtract(1, 'days').format('YYYY-MM-DD hh:mm:ss'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD hh:mm:ss'));
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Analysis data states
  const [mid_freq_acceleration_p2p_x, setMid_freq_acceleration_p2p_x] = useState([]);
  const [mid_freq_acceleration_p2p_y, setMid_freq_acceleration_p2p_y] = useState([]);
  const [mid_freq_acceleration_p2p_z, setMid_freq_acceleration_p2p_z] = useState([]);
  const [high_freq_acceleration_p2p_x, setHigh_freq_acceleration_p2p_x] = useState([]);

  const [mid_freq_displacement_x, setMid_freq_displacement_x] = useState([]);
  const [mid_freq_displacement_y, setMid_freq_displacement_y] = useState([]);
  const [mid_freq_displacement_z, setMid_freq_displacement_z] = useState([]);

  const [mid_freq_velocity_x, setMid_freq_velocity_x] = useState([]);
  const [mid_freq_velocity_y, setMid_freq_velocity_y] = useState([]);
  const [mid_freq_velocity_z, setMid_freq_velocity_z] = useState([]);

  const [mid_freq_env_x, setMid_freq_env_x] = useState([]);
  const [mid_freq_env_y, setMid_freq_env_y] = useState([]);
  const [mid_freq_env_z, setMid_freq_env_z] = useState([]);

  const [inclination_x, setInclination_x] = useState([]);
  const [inclination_y, setInclination_y] = useState([]);
  const [inclination_z, setInclination_z] = useState([]);

  const [motorServiceTemperature, setMotorServiceTemperature] = useState([]);
  const [batteryPercentage, setBatteryPercentage] = useState([]);
  const [batteryVoltage, setBatteryVoltage] = useState([]);
  const [rssi, setRssi] = useState([]);
  const [lastZoomTime, setLastZoomTime] = useState({ current: 0 });

  // Spectrum chart states
  const [spectrumData, setSpectrumData] = useState([]);
  const [spectrumLoading, setSpectrumLoading] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [showSpectrum, setShowSpectrum] = useState(false);
  
  // 3-axis spectrum data for _0.bin files
  const [is3AxisSpectrum, setIs3AxisSpectrum] = useState(false);
  const [spectrumDataX, setSpectrumDataX] = useState([]);
  const [spectrumDataY, setSpectrumDataY] = useState([]);
  const [spectrumDataZ, setSpectrumDataZ] = useState([]);

  // Multiple spectrum data (for records that have both _0.bin and _1.bin files)
  const [hasMultipleSpectrums, setHasMultipleSpectrums] = useState(false);
  const [spectrum3AxisData, setSpectrum3AxisData] = useState({ x: [], y: [], z: [] });
  const [spectrum1AxisData, setSpectrum1AxisData] = useState([]);
  const [availableFiles, setAvailableFiles] = useState([]);

  // Metric configuration
  const metricConfig = {
    "mid_freq_acceleration_p2p": {
      label: "Mid Freq Acceleration",
      axes: ["x", "y", "z"],
      unit: "(mm/s²)",
      colors: { x: "#ef4444", y: "#3b82f6", z: "#10b981" },
      fileMapping: { x: "file_1", y: "file_2", z: "file_0" }
    },
    "high_freq_acceleration_p2p": {
      label: "High Freq Acceleration", 
      axes: ["z"],
      unit: "(mm/s²)",
      colors: { z: "#f59e0b" },
      fileMapping: { z: "file_0" }
    },
    "mid_freq_velocity": {
      label: "Mid Freq Velocity",
      axes: ["x", "y", "z"],
      unit: "(mm/s)",
      colors: { x: "#ef4444", y: "#3b82f6", z: "#10b981" },
      fileMapping: { x: "file_1", y: "file_2", z: "file_0" }
    },
    "mid_freq_displacement": {
      label: "Mid Freq Displacement",
      axes: ["x", "y", "z"],
      unit: "(μm)",
      colors: { x: "#ef4444", y: "#3b82f6", z: "#10b981" },
      fileMapping: { x: "file_1", y: "file_2", z: "file_0" }
    },
    "inclination": {
      label: "Inclination",
      axes: ["x", "y", "z"],
      unit: "(degrees)",
      colors: { x: "#ef4444", y: "#3b82f6", z: "#10b981" },
      fileMapping: { x: "file_1", y: "file_2", z: "file_0" }
    },
    "mid_freq_env": {
      label: "Mid Freq Envelope",
      axes: ["x", "y", "z"],
      unit: "(Hz)",
      colors: { x: "#ef4444", y: "#3b82f6", z: "#10b981" },
      fileMapping: { x: "file_1", y: "file_2", z: "file_0" }
    },
    "temperature": {
      label: "Temperature",
      axes: [""],
      unit: "(°C)",
      colors: { "": "#f59e0b" },
      fileMapping: { "": null }
    },
    "battery_voltage": {
      label: "Voltage", 
      axes: [""],
      unit: "(V)",
      colors: { "": "#10b981" },
      fileMapping: { "": null }
    },
    "battery_percentage": {
      label: "Battery %",
      axes: [""],
      unit: "(%)",
      colors: { "": "#3b82f6" },
      fileMapping: { "": null }
    },
    "RSSI": {
      label: "RSSI",
      axes: [""],
      unit: "(dBm)",
      colors: { "": "#8b5cf6" },
      fileMapping: { "": null }
    }
  };

  // Get current data based on selected metric and axis
  const getCurrentChartData = () => {
    const stateMap = {
      "mid_freq_acceleration_p2p_x": mid_freq_acceleration_p2p_x,
      "mid_freq_acceleration_p2p_y": mid_freq_acceleration_p2p_y,
      "mid_freq_acceleration_p2p_z": mid_freq_acceleration_p2p_z,
      "high_freq_acceleration_p2p_z": high_freq_acceleration_p2p_x,
      "mid_freq_velocity_x": mid_freq_velocity_x,
      "mid_freq_velocity_y": mid_freq_velocity_y,
      "mid_freq_velocity_z": mid_freq_velocity_z,
      "mid_freq_displacement_x": mid_freq_displacement_x,
      "mid_freq_displacement_y": mid_freq_displacement_y,
      "mid_freq_displacement_z": mid_freq_displacement_z,
      "inclination_x": inclination_x,
      "inclination_y": inclination_y,
      "inclination_z": inclination_z,
      "mid_freq_env_x": mid_freq_env_x,
      "mid_freq_env_y": mid_freq_env_y,
      "mid_freq_env_z": mid_freq_env_z,
      "temperature_": motorServiceTemperature,
      "battery_voltage_": batteryVoltage,
      "battery_percentage_": batteryPercentage,
      "RSSI_": rssi
    };
    
    const key = `${selectedMetricType}_${selectedAxis}`;
    return stateMap[key] || [];
  };

  // Get current metrics values for display
  const getCurrentMetricsValues = () => {
    if (rawData.length === 0) return {};
    
    const latestData = rawData[rawData.length - 1];
    return {
      temperature: latestData.temperature || "N/A",
      battery_voltage: latestData.battery_voltage || "N/A", 
      battery_percentage: latestData.battery_percentage || "N/A",
      rssi: latestData.rssi || "N/A"
    };
  };

  // Enhanced function to fetch multiple spectrum data for a single point
  const fetchAllSpectrumData = async (pointData) => {
    console.log('fetchAllSpectrumData called with pointData:', pointData);
    
    // Free users can only access limited spectrum analysis
    if (isFreeUser) {
      message.error("Advanced spectrum analysis is available for premium users only");
      return;
    }
    
    try {
      setSpectrumLoading(true);
      
      // Reset all spectrum states
      setHasMultipleSpectrums(false);
      setIs3AxisSpectrum(false);
      setSpectrumData([]);
      setSpectrum3AxisData({ x: [], y: [], z: [] });
      setSpectrum1AxisData([]);
      setAvailableFiles([]);
      
      // Check which files are available in the rawData for this point
      const dataIndex = rawData.findIndex(item => 
        moment(item.datetime).format('YYYY-MM-DD HH:mm:ss') === moment(pointData.x).format('YYYY-MM-DD HH:mm:ss')
      );
      
      if (dataIndex === -1) {
        message.error("Could not find data record for this point");
        return;
      }
      
      const recordData = rawData[dataIndex];
      const files = [];
      
      // Check for available binary files
      if (recordData.file_0 && recordData.file_0.trim() !== '') {
        files.push({ type: '_0.bin', path: recordData.file_0, label: '3-axis mid-frequency' });
      }
      if (recordData.file_1 && recordData.file_1.trim() !== '') {
        files.push({ type: '_1.bin', path: recordData.file_1, label: '1-axis high-frequency' });
      }
      
      console.log('Available files for analysis:', files);
      setAvailableFiles(files);
      
      if (files.length === 0) {
        message.error("No binary files available for spectrum analysis");
        return;
      }
      
      // Fetch spectrum data for all available files
      const spectrumPromises = files.map(file => fetchSingleSpectrumData(file.path, file.type));
      const spectrumResults = await Promise.all(spectrumPromises);
      
      // Process results
      let has3Axis = false;
      let has1Axis = false;
      let tempSpectrum3AxisData = { x: [], y: [], z: [] };
      let tempSpectrum1AxisData = [];
      
      spectrumResults.forEach((result, index) => {
        if (result.success) {
          if (result.axes === 3) {
            has3Axis = true;
            tempSpectrum3AxisData = {
              x: result.data.x_axis.map(item => [parseFloat(item.x), parseFloat(item.y)]),
              y: result.data.y_axis.map(item => [parseFloat(item.x), parseFloat(item.y)]),
              z: result.data.z_axis.map(item => [parseFloat(item.x), parseFloat(item.y)])
            };
          } else if (result.axes === 1) {
            has1Axis = true;
            tempSpectrum1AxisData = result.data.map(item => [parseFloat(item.x), parseFloat(item.y)]);
          }
        } else {
          console.error(`Failed to process ${files[index].path}:`, result.error);
        }
      });
      
      // Set the spectrum data states
      if (has3Axis) {
        setSpectrum3AxisData(tempSpectrum3AxisData);
      }
      if (has1Axis) {
        setSpectrum1AxisData(tempSpectrum1AxisData);
      }
      
      // Set display flags
      if (has3Axis && has1Axis) {
        setHasMultipleSpectrums(true);
        console.log('Multiple spectrums available: 3-axis + 1-axis');
      } else if (has3Axis) {
        setIs3AxisSpectrum(true);
        setSpectrumDataX(tempSpectrum3AxisData.x);
        setSpectrumDataY(tempSpectrum3AxisData.y); 
        setSpectrumDataZ(tempSpectrum3AxisData.z);
        console.log('Single 3-axis spectrum available');
      } else if (has1Axis) {
        setIs3AxisSpectrum(false);
        setSpectrumData(tempSpectrum1AxisData);
        console.log('Single 1-axis spectrum available');
      }
      
      setSelectedPoint(pointData);
      setShowSpectrum(true);
      
    } catch (error) {
      console.error("Error fetching spectrum data:", error);
      message.error("Error fetching spectrum data: " + error.message);
    } finally {
      setSpectrumLoading(false);
    }
  };

  // Helper function to fetch single spectrum data
  const fetchSingleSpectrumData = async (binFilePath, expectedType) => {
    const cleanBinFile = binFilePath?.replace("uploads/", "");
    const apiUrl = `api/getDataFromPythonScript?fileName=${cleanBinFile}`;
    
    console.log(`Fetching spectrum for: ${cleanBinFile} (expected: ${expectedType})`);
    
    const response = await axiosInstance.get(apiUrl);
    return response.data;
  };

  // Helper function to convert data to Highcharts format (memoized)
  const convertToHighchartsData = useCallback((data) => {
    if (!data || data.length === 0) return [];
    
    return data.map((item, index) => {
      return [
        item.x instanceof Date ? item.x.getTime() : index, // Use timestamp for time series
        item.y || 0
      ];
    });
  }, []);

  // Helper function to convert spectrum data to Highcharts format
  const convertSpectrumToHighchartsData = useCallback((spectrumData) => {
    if (!spectrumData || spectrumData.length === 0) return [];
    
    // Data is already in [[x, y], [x, y], ...] format from fetchSpectrumData
    return spectrumData;
  }, []);

  // Create main chart with Highcharts
  const createMainChart = useCallback((data, title, unit, color) => {
    if (!mainChartRef.current || !window.Highcharts) return;

    if (mainChartRef.current.chart) {
      mainChartRef.current.chart.destroy();
    }

    const chartData = convertToHighchartsData(data);
    
    mainChartRef.current.chart = window.Highcharts.stockChart(mainChartRef.current, {
      chart: {
        height: 450
      },
      title: {
        text: title
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Time'
        }
      },
      yAxis: {
        title: {
          text: `${title} ${unit}`
        }
      },
      series: [{
        name: title,
        data: chartData,
        color: color,
        type: 'line',
        point: {
          events: {
            click: function(e) {
              const pointIndex = this.index;
              const originalData = data[pointIndex];
              
              // Check if we have any binary files available for this point
              // Use the new fetchAllSpectrumData to handle multiple files
              fetchAllSpectrumData(originalData);
            }
          }
        }
      }],
      tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M:%S'
      },
      plotOptions: {
        line: {
          marker: {
            enabled: false
          }
        }
      }
    });
  }, [convertToHighchartsData, fetchAllSpectrumData]);

  // Create spectrum chart with Highcharts
  const createSpectrumChart = useCallback((spectrumData) => {
    console.log('createSpectrumChart called with data length:', spectrumData ? spectrumData.length : 0);
    console.log('spectrumChartRef.current:', spectrumChartRef.current);
    console.log('window.Highcharts available:', !!window.Highcharts);
    
    if (!spectrumChartRef.current || !window.Highcharts) {
      console.log('Missing ref or Highcharts, returning');
      return;
    }

    if (spectrumChartRef.current.chart) {
      console.log('Destroying existing chart');
      spectrumChartRef.current.chart.destroy();
    }

    const chartData = convertSpectrumToHighchartsData(spectrumData);
    console.log('Chart data prepared, length:', chartData.length);
    console.log('Sample chart data:', chartData.slice(0, 3));
    
    try {
      console.log('Creating Highcharts chart...');
      spectrumChartRef.current.chart = window.Highcharts.chart(spectrumChartRef.current, {
        chart: {
          height: 450,
          type: 'line',
          zoomType: 'xy'
        },
        title: {
          text: 'Amplitude Spectrum'
        },
        xAxis: {
          title: {
            text: 'Frequency (Hz)'
          }
        },
        yAxis: {
          title: {
            text: 'Log Amplitude'
          }
        },
        series: [{
          name: 'Amplitude Spectrum',
          data: chartData,
          color: '#ef4444',
          lineWidth: 2,
          type: 'line'
        }],
        legend: {
          enabled: false
        },
        plotOptions: {
          line: {
            marker: {
              enabled: false
            },
            states: {
              hover: {
                lineWidthPlus: 1
              }
            }
          }
        },
      });
      console.log('Chart created successfully:', spectrumChartRef.current.chart);
    } catch (error) {
      console.error('Error creating spectrum chart:', error);
    }
  }, [convertSpectrumToHighchartsData]);

  // Create combined 3-axis spectrum chart for _0.bin files
  const create3AxisSpectrumCharts = useCallback((dataX, dataY, dataZ) => {
    console.log('create3AxisSpectrumCharts called - creating single combined chart');
    
    if (!window.Highcharts) {
      console.log('Highcharts not available');
      return;
    }

    // Create single combined chart with all 3 axes
    if (spectrumChartRefX.current) {
      if (spectrumChartRefX.current.chart) {
        spectrumChartRefX.current.chart.destroy();
      }
      
      spectrumChartRefX.current.chart = window.Highcharts.chart(spectrumChartRefX.current, {
        chart: { height: 450, type: 'line', zoomType: 'xy' },
        title: { text: '3-Axis Mid-Frequency Spectrum Analysis' },
        subtitle: { text: 'Combined X, Y, Z axes (fs=6664Hz, nperseg=4096)' },
        xAxis: { 
          title: { text: 'Frequency (Hz)' },
          gridLineWidth: 1
        },
        yAxis: { 
          title: { text: 'Log Amplitude (m/s²)²/Hz' },
          gridLineWidth: 1
        },
        series: [{
          name: 'X-Axis PSD',
          data: dataX,
          color: '#ef4444',
          lineWidth: 2,
          type: 'line'
        }, {
          name: 'Y-Axis PSD',
          data: dataY,
          color: '#3b82f6',
          lineWidth: 2,
          type: 'line'
        }, {
          name: 'Z-Axis PSD',
          data: dataZ,
          color: '#10b981',
          lineWidth: 2,
          type: 'line'
        }],
        legend: { enabled: true },
        plotOptions: {
          line: {
            marker: { enabled: false },
            states: { hover: { lineWidthPlus: 1 } }
          }
        },
        tooltip: {
          shared: true,
          crosshairs: true,
          formatter: function() {
            let tooltip = `<b>Frequency: ${this.x.toFixed(2)} Hz</b><br/>`;
            this.points.forEach(point => {
              tooltip += `<span style="color:${point.color}">${point.series.name}: ${point.y.toExponential(2)}</span><br/>`;
            });
            return tooltip;
          }
        }
      });
    }
  }, []);

  // Create multi-spectrum charts (both 3-axis and 1-axis for same data point)
  const createMultiSpectrumCharts = useCallback((spectrum3Axis, spectrum1Axis) => {
    console.log('createMultiSpectrumCharts called');
    
    if (!window.Highcharts) {
      console.log('Highcharts not available');
      return;
    }

    // Create single combined 3-axis chart
    if (multiSpectrum3AxisRefX.current) {
      if (multiSpectrum3AxisRefX.current.chart) {
        multiSpectrum3AxisRefX.current.chart.destroy();
      }
      
      multiSpectrum3AxisRefX.current.chart = window.Highcharts.chart(multiSpectrum3AxisRefX.current, {
        chart: { height: 420, type: 'line', zoomType: 'xy' },
        title: { text: '3-Axis Mid-Frequency Spectrum Analysis' },
        subtitle: { text: 'Combined X, Y, Z axes (fs=6664Hz, nperseg=4096)' },
        xAxis: { 
          title: { text: 'Frequency (Hz)' },
          gridLineWidth: 1
        },
        yAxis: { 
          title: { text: 'Log Amplitude (m/s²)²/Hz' },
          gridLineWidth: 1
        },
        series: [{
          name: 'X-Axis PSD',
          data: spectrum3Axis.x,
          color: '#ef4444',
          lineWidth: 2,
          type: 'line'
        }, {
          name: 'Y-Axis PSD',
          data: spectrum3Axis.y,
          color: '#3b82f6',
          lineWidth: 2,
          type: 'line'
        }, {
          name: 'Z-Axis PSD',
          data: spectrum3Axis.z,
          color: '#10b981',
          lineWidth: 2,
          type: 'line'
        }],
        legend: { enabled: true },
        plotOptions: {
          line: {
            marker: { enabled: false },
            states: { hover: { lineWidthPlus: 1 } }
          }
        },
        tooltip: {
          shared: true,
          crosshairs: true,
          formatter: function() {
            let tooltip = `<b>Frequency: ${this.x.toFixed(2)} Hz</b><br/>`;
            this.points.forEach(point => {
              tooltip += `<span style="color:${point.color}">${point.series.name}: ${point.y.toExponential(2)}</span><br/>`;
            });
            return tooltip;
          }
        }
      });
    }

    // Create single-axis high-frequency chart
    if (multiSpectrum1AxisRef.current) {
      if (multiSpectrum1AxisRef.current.chart) {
        multiSpectrum1AxisRef.current.chart.destroy();
      }
      
      multiSpectrum1AxisRef.current.chart = window.Highcharts.chart(multiSpectrum1AxisRef.current, {
        chart: { height: 370, type: 'line', zoomType: 'xy' },
        title: { text: '1-Axis High-Frequency Spectrum Analysis' },
        subtitle: { text: 'Single axis (fs=2560Hz, nperseg=65536)' },
        xAxis: { 
          title: { text: 'Frequency (Hz)' }
        },
        yAxis: { title: { text: 'Log Amplitude' } },
        series: [{
          name: '1-Axis PSD',
          data: spectrum1Axis,
          color: '#f59e0b',
          lineWidth: 2,
          type: 'line'
        }],
        legend: { enabled: false },
        plotOptions: {
          line: {
            marker: { enabled: false },
            states: { hover: { lineWidthPlus: 1 } }
          }
        },
        tooltip: {
          formatter: function() {
            return `<b>Frequency: ${this.x.toFixed(2)} Hz</b><br/>Amplitude: ${this.y.toExponential(2)}`;
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    fetchSensorsData();
    if (sensorId) {
      setSelectedAlarm(sensorId);
      fetchSensorData(sensorId, startDate, endDate);
    }
  }, [machineId, sensorId]);

  const fetchSensorsData = async () => {
    try {
      const response = await axiosInstance.get(`api/web/machines/${machineId}/sensors`);
      setSensorsData(response.data.items || []);
    } catch (error) {
      console.error("Error fetching sensors data:", error);
    }
  };

  const fetchSensorData = async (sensor_id, start_date, end_date) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`api/machine-data?machine_id=${machineId}&deviceID=${sensor_id}&start_date=${start_date}&end_date=${end_date}`);
      const rawData = response.data.data;
      setRawData(rawData);

      // Process all chart data with proper number parsing and file mapping
      setMid_freq_acceleration_p2p_x(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_acceleration_p2p_x) || 0,
            extraValue: item.file_1?.replace("uploads/", ""),
          }
        })
        return data
      });

      setMid_freq_acceleration_p2p_y(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_acceleration_p2p_y) || 0,
            extraValue: item.file_2?.replace("uploads/", ""),
          }
        })
        return data
      });

      setMid_freq_acceleration_p2p_z(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_acceleration_p2p_z) || 0,
            extraValue: item.file_0?.replace("uploads/", ""),
          }
        })
        return data
      });

      setHigh_freq_acceleration_p2p_x(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.high_freq_acceleration_p2p_z) || 0,
            extraValue: item.file_0?.replace("uploads/", ""),
          }
        })
        return data
      });

      setMid_freq_displacement_x(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_displacement_x) || 0,
            extraValue: item.file_1?.replace("uploads/", ""),
          }
        })
        return data
      });

      setMid_freq_displacement_y(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_displacement_y) || 0,
            extraValue: item.file_2?.replace("uploads/", ""),
          }
        })
        return data
      });

      setMid_freq_displacement_z(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_displacement_z) || 0,
            extraValue: item.file_0?.replace("uploads/", ""),
          }
        })
        return data
      });

      setMid_freq_velocity_x(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_velocity_x) || 0,
            extraValue: item.file_1?.replace("uploads/", ""),
          }
        })
        return data
      });

      setMid_freq_velocity_y(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_velocity_y) || 0,
            extraValue: item.file_2?.replace("uploads/", ""),
          }
        })
        return data
      });

      setMid_freq_velocity_z(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_velocity_z) || 0,
            extraValue: item.file_0?.replace("uploads/", ""),
          }
        })
        return data
      });

      setMid_freq_env_x(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_env_x) || 0,
            extraValue: item.file_1?.replace("uploads/", ""),
          }
        })
        return data
      });

      setMid_freq_env_y(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_env_y) || 0,
            extraValue: item.file_2?.replace("uploads/", ""),
          }
        })
        return data
      });

      setMid_freq_env_z(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.mid_freq_env_z) || 0,
            extraValue: item.file_0?.replace("uploads/", ""),
          }
        })
        return data
      });

      setInclination_x(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.inclination_x) || 0,
            extraValue: item.file_1?.replace("uploads/", ""),
          }
        })
        return data
      });

      setInclination_y(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.inclination_y) || 0,
            extraValue: item.file_2?.replace("uploads/", ""),
          }
        })
        return data
      });

      setInclination_z(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.inclination_z) || 0,
            extraValue: item.file_0?.replace("uploads/", ""),
          }
        })
        return data
      });

      // Additional chart data - using correct field names from API
      setMotorServiceTemperature(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.temperature) || 0, // API uses 'temperature' not 'motor_service_temperature'
          }
        })
        return data
      });

      setBatteryPercentage(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.battery_percentage) || 0,
          }
        })
        return data
      });

      setBatteryVoltage(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.battery_voltage) || 0,
          }
        })
        return data
      });

      setRssi(() => {
        const data = rawData.map((item) => {
          return {
            x: moment(item.datetime).toDate(),
            y: parseFloat(item.RSSI) || 0, // API uses 'RSSI' (uppercase) not 'rssi'
          }
        })
        return data
      });

    } catch (error) {
      console.error("Error fetching sensor data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMetricTypeChange = (value) => {
    setSelectedMetricType(value);
    // Reset axis to first available axis for the selected metric
    const availableAxes = metricConfig[value]?.axes || ["x"];
    setSelectedAxis(availableAxes[0]);
  };

  const handleAxisChange = (value) => {
    setSelectedAxis(value);
  };

  const download = async (sensor_id, start_date, end_date) => {
    if (rawData.length === 0) {
      message.error("No data found");
      return;
    }
    let url = `${API_BASE_URL}/api/downloadMultipleRawFilesAndZipAndServe?machine_id=${machineId}&deviceID=${sensor_id}&start_date=${start_date}&end_date=${end_date}`;
    window.open(url, '_blank');
  };

  const handleDateRangeSubmit = () => {
    if (modalStartDate && modalEndDate) {
      const start = moment(modalStartDate).format('YYYY-MM-DD hh:mm:ss');
      const end = moment(modalEndDate).format('YYYY-MM-DD hh:mm:ss');
      setStartDate(start);
      setEndDate(end);
      setSelectorDate("Date-Range");
      if (selectedAlarm) {
        fetchSensorData(selectedAlarm, start, end);
      }
    }
    setDateRangeModal(false);
  };

  // Update main chart when data changes
  useEffect(() => {
    const chartData = getCurrentChartData();
    const currentConfig = metricConfig[selectedMetricType];
    const currentColor = currentConfig?.colors?.[selectedAxis] || "#ef4444";
    const currentUnit = currentConfig?.unit || "";
    const chartTitle = `${currentConfig?.label || ""} ${selectedAxis.toUpperCase()}`;
    
    if (chartData.length > 0) {
      createMainChart(chartData, chartTitle, currentUnit, currentColor);
    }
  }, [selectedMetricType, selectedAxis, rawData, createMainChart]);

  // Update spectrum chart when spectrum data changes (single-axis)
  useEffect(() => {
    if (spectrumData && spectrumData.length > 0 && showSpectrum && !is3AxisSpectrum && !hasMultipleSpectrums) {
      console.log('Creating single-axis spectrum chart with data length:', spectrumData.length);
      // Add a small delay to ensure the DOM element is rendered
      setTimeout(() => {
        createSpectrumChart(spectrumData);
      }, 100);
    }
  }, [spectrumData, createSpectrumChart, showSpectrum, is3AxisSpectrum, hasMultipleSpectrums]);

  // Update 3-axis spectrum chart when data changes
  useEffect(() => {
    if (is3AxisSpectrum && showSpectrum && !hasMultipleSpectrums && 
        spectrumDataX && spectrumDataX.length > 0 && 
        spectrumDataY && spectrumDataY.length > 0 && 
        spectrumDataZ && spectrumDataZ.length > 0) {
      console.log('Creating 3-axis spectrum chart');
      setTimeout(() => {
        create3AxisSpectrumCharts(spectrumDataX, spectrumDataY, spectrumDataZ);
      }, 100);
    }
  }, [spectrumDataX, spectrumDataY, spectrumDataZ, create3AxisSpectrumCharts, showSpectrum, is3AxisSpectrum, hasMultipleSpectrums]);

  // Update multi-spectrum charts when data changes
  useEffect(() => {
    if (hasMultipleSpectrums && showSpectrum && 
        spectrum3AxisData && spectrum1AxisData && spectrum1AxisData.length > 0) {
      console.log('Creating multi-spectrum charts');
      setTimeout(() => {
        createMultiSpectrumCharts(spectrum3AxisData, spectrum1AxisData);
      }, 100);
    }
  }, [spectrum3AxisData, spectrum1AxisData, createMultiSpectrumCharts, showSpectrum, hasMultipleSpectrums]);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => history.push(`/app/machine-and-sensors/machine-details/${machineId}`)}>← Back to Machine Details</Button>
      </div>
      
      <Card>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '15px'
        }}>
          <div><img src={SeriesImage} alt="Series" /></div>
          <div style={{
            fontWeight: 'bold',
            fontSize: '16px'
          }}>Sensor Analysis {isFreeUser && <span style={{ color: '#f59e0b' }}>(Limited Features)</span>}</div>
          <div>
            <Button 
              type="primary" 
              disabled={rawData.length === 0} 
              loading={loading} 
              onClick={() => download(selectedAlarm, startDate, endDate)}
            >
              Acquire Raw Data
            </Button>
          </div>

          <div style={{ width: '200px' }}>
            <Select 
              value={selectorDate} 
              onChange={(e) => {
                if (e === "Date Range") {
                  setDateRangeModal(true);
                  return;
                }
                setSelectorDate(e);
                let start, end;
                if (e === "1") {
                  start = moment().subtract(1, 'days').format('YYYY-MM-DD hh:mm:ss');
                  end = moment().format('YYYY-MM-DD hh:mm:ss');
                } else if (e === "7") {
                  start = moment().subtract(7, 'days').format('YYYY-MM-DD hh:mm:ss');
                  end = moment().format('YYYY-MM-DD hh:mm:ss');
                } else if (e === "30") {
                  start = moment().subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss');
                  end = moment().format('YYYY-MM-DD hh:mm:ss');
                } else if (e === "60") {
                  start = moment().subtract(60, 'days').format('YYYY-MM-DD hh:mm:ss');
                  end = moment().format('YYYY-MM-DD hh:mm:ss');
                }
                setStartDate(start);
                setEndDate(end);
                if (selectedAlarm) {
                  fetchSensorData(selectedAlarm, start, end);
                }
              }} 
              style={{ width: '100%' }}
            >
              <Select.Option value="1">1 Day</Select.Option>
              <Select.Option value="7">7 Day</Select.Option>
              <Select.Option value="30">30 Day</Select.Option>
              <Select.Option value="60">60 Day</Select.Option>
              <Select.Option value="Date Range">Date Range</Select.Option>
            </Select>
          </div>
        </div>

        <div style={{ width: "300px", marginBottom: "30px" }}>
          <Select 
            value={selectedAlarm}
            placeholder="Select Sensor"
            onChange={(e) => {
              setSelectedAlarm(e);
              localStorage.setItem('deviceId2', e);
              fetchSensorData(e, startDate, endDate);
            }}
            style={{ width: "100%" }}
          >
            {sensorsData.map((item) => (
              <Option key={item.sensor_id} value={item.sensor_id}>
                {item.sensor_type + " #" + (item.sensor_id_label !== null ? item.sensor_id_label : item.sensor_id)}
              </Option>
            ))}
          </Select>
        </div>

        {/* Spectrum Chart - shown when a point is clicked */}
        {showSpectrum && (
          <Card 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  {hasMultipleSpectrums ? 
                    `Analysis` :
                    is3AxisSpectrum ? 
                      `3-Axis Combined Spectrum (${spectrumDataX ? spectrumDataX.length : 0} points per axis)` : 
                      `Amplitude Spectrum (${spectrumData ? spectrumData.length : 0} points)`
                  }
                </span>
                <Button size="small" onClick={() => setShowSpectrum(false)}>✕ Close</Button>
              </div>
            }
            style={{ marginBottom: '20px' }}
            loading={spectrumLoading}
          >
            {selectedPoint && (
              <div style={{ marginBottom: '15px', padding: '10px', background: '#f0f2f5', borderRadius: '6px' }}>
                <div><strong>Time:</strong> {moment(selectedPoint.x).format('DD-MM-YYYY HH:mm:ss')}</div>
                <div><strong>Value:</strong> {selectedPoint.y}</div>
              </div>
            )}

            {/* Single spectrum charts (either 3-axis OR 1-axis, not both) */}
            {!hasMultipleSpectrums && is3AxisSpectrum && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#1890ff', marginBottom: '15px' }}>3-Axis Mid-Frequency Spectrum Analysis</h3>
                  <div style={{ width: '100%', height: '470px', overflowX: 'auto' }}>
                    <div ref={spectrumChartRefX} style={{ width: '100%', height: '470px' }}></div>
                  </div>
                </div>
              </>
            )}

            {!hasMultipleSpectrums && !is3AxisSpectrum && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#fa8c16', marginBottom: '15px' }}>1-Axis High-Frequency Spectrum Analysis</h3>
                  <div style={{ width: '100%', height: '470px', overflowX: 'auto' }}>
                    <div ref={spectrumChartRef} style={{ width: '100%', height: '470px' }}></div>
                  </div>
                </div>
              </>
            )}

            {/* Multi-spectrum charts (both 3-axis and 1-axis for same data point) */}
            {hasMultipleSpectrums && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#1890ff', marginBottom: '15px' }}>Mid-Frequency Analysis</h3>
                  <div style={{ width: '100%', height: '420px', overflowX: 'auto' }}>
                    <div ref={multiSpectrum3AxisRefX} style={{ width: '100%', height: '420px' }}></div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#fa8c16', marginBottom: '15px' }}>High-Frequency Analysis</h3>
                  <div style={{ width: '100%', height: '370px', overflowX: 'auto' }}>
                    <div ref={multiSpectrum1AxisRef} style={{ width: '100%', height: '370px' }}></div>
                  </div>
                </div>
              </>
            )}
          </Card>
        )}

        {/* Single Trend chart */}
        <Card 
          title={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* First row: Trend title and Metric Type Toggle Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span>Trend</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {Object.entries(metricConfig).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => handleMetricTypeChange(key)}
                      style={{
                        padding: '4px 12px',
                        fontSize: '12px',
                        border: 'none',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        backgroundColor: selectedMetricType === key ? '#1890ff' : 'rgba(255, 255, 255, 0.1)',
                        color: selectedMetricType === key ? 'white' : '#666',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Second row: Axis Toggle Buttons (center aligned) */}
              {(metricConfig[selectedMetricType]?.axes || []).filter(axis => axis !== "").length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  {(metricConfig[selectedMetricType]?.axes || []).filter(axis => axis !== "").map((axis) => (
                    <button
                      key={axis}
                      onClick={() => handleAxisChange(axis)}
                      style={{
                        padding: '6px 16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: 'none',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        backgroundColor: selectedAxis === axis ? metricConfig[selectedMetricType]?.colors?.[axis] || '#1890ff' : 'rgba(255, 255, 255, 0.1)',
                        color: selectedAxis === axis ? 'white' : '#666',
                        transition: 'all 0.2s ease',
                        minWidth: '45px'
                      }}
                    >
                      {axis.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          }
          style={{ marginBottom: '20px' }}
        >
          <div style={{ width: '100%', height: '450px', overflowX: 'auto' }}>
            <div ref={mainChartRef} style={{ width: '100%', height: '450px' }}></div>
          </div>
        </Card>
      </Card>

      {/* Date Range Modal */}
      <Modal
        title="Select Date Range"
        visible={dateRangeModal}
        onOk={handleDateRangeSubmit}
        onCancel={() => setDateRangeModal(false)}
      >
        <div style={{ marginBottom: '16px' }}>
          <label>Start Date:</label>
          <DatePicker
            showTime
            value={modalStartDate ? moment(modalStartDate) : null}
            onChange={(date) => setModalStartDate(date)}
            style={{ width: '100%', marginTop: '8px' }}
          />
        </div>
        <div>
          <label>End Date:</label>
          <DatePicker
            showTime
            value={modalEndDate ? moment(modalEndDate) : null}
            onChange={(date) => setModalEndDate(date)}
            style={{ width: '100%', marginTop: '8px' }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SensorAnalysis;