import { Card } from 'antd';
import { axiosInstance } from 'App';
import TopLineChart from 'components/shared-components/ChartWidget/Top3LineChat';
import FrequencySpectrumChart from 'components/shared-components/ChartWidget/FrequencySpectrumChart'; // Import the new component
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

function GraphType() {
  const { id, graphType, deviceId, bin, xAxis, yAxis } = useParams();

  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [z, setZ] = useState([]);
  const [frequencyData, setFrequencyData] = useState([]); // New state for frequency data
  const [fileType, setFileType] = useState(''); // To track if it's a single_axis or 3_axis file
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bin) {
      const tempBin = bin.split('.')[0];
      const temp = tempBin.split('_')[tempBin.split('_').length - 1];
      if (temp == 1) {
        setShow(false);
      } else {
        setShow(true);
      }
    }
    fetchSensorData();
  }, [bin]);

  const fetchSensorData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`api/getDataFromPythonScript?fileName=${bin}`);
      console.log('API Response:', response.data);

      // Check if the response has the new data structure
      if (response.data.success) {
        // Set the file type
        setFileType(response.data.fileType || 'three_axis');
        if (response.data.fileType === 'single_axis') {
          // If it's a single axis file, set the frequency data
          setFrequencyData(response.data.frequencyDomain.frequencies.map((point, i) => ({
            x: i + 1,
            y: point
          })));

          setZ(response.data.timeDomain.data.map((point, i) => ({
            x: i + 1,
            y: point
          })))

        } else {
          const rawData = response.data.timeDomain.subSeries;

          setX(() => {
            const data = rawData[0].data.map((item, index) => {
              return {
                x: index + 1,
                y: item
              }
            })
            return data
          })

          setY(() => {
            const data = rawData[1].data.map((item, index) => {
              return {
                x: index + 1,
                y: item
              }
            })
            return data
          })


          setZ(() => {
            const data = rawData[2].data.map((item, index) => {
              return {
                x: index + 1,
                y: item
              }
            })
            return data
          })

        }

      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Card>
        <div style={{
          fontWeight: 'bold',
          color: '#000000',
        }}>
          {bin}
        </div>
        <div>
          X: {moment(xAxis).format('DD-MM-YYYY HH:mm:ss')}
        </div>
        <div>
          Y: {yAxis}
        </div>
      </Card>

      {/* Frequency Spectrum Chart */}
      {frequencyData && frequencyData.length > 0 && (
        <FrequencySpectrumChart
          frequencyData={frequencyData}
          title="Amplitude Spectrum"
        />
      )}

      {/* Time Domain Charts */}
      {show && (
        <>
          <TopLineChart graphType={graphType} title={"Amplitude X"} series={x} />
          <TopLineChart graphType={graphType} title={"Amplitude Y"} series={y} />
        </>
      )}
      <TopLineChart graphType={graphType} title={"Amplitude Z"} series={z} />
    </div>
  );
}

export default GraphType;