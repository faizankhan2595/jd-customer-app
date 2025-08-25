import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function MachineSensorComponent({ data,id,machine_name }) {
    const totalSlots = Math.max(5, data.length);
    const emptySlots = totalSlots - data.length;
    const allSlots = [...data, ...Array(emptySlots).fill(null)];
    const emptySlotsCount = [...Array(1).fill(null)];
    const history = useHistory();

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                // justifyContent: 'space-between',
                gap: '10px',
                padding: '20px',
                maxHeight:'33vh',
                overflowY: 'auto',
                backgroundColor: '#fff',
            }}
        >
            {allSlots.map((item, index) => {
                const isData = item !== null;
                const bgColor = isData ? '#4688E4' : '#666'; // blue or grey
                const textColor = isData ? '#fff' : '#ddd';

                return (
                    <div
                        key={index}
                        style={{
                            width: '19%',
                            border: `10px solid ${bgColor}`,
                            borderRadius: '8px',
                            cursor: 'pointer'
                            //   padding: '10px',

                        }}
                    >
                        <h4 style={{
                            color: '#fff',
                            background: bgColor
                        }}>
                            JD Sensor {index + 1}
                        </h4>
                        <div style={{ fontSize: '12px', color: '#333', padding: '4px' }}>
                            <h4>
                                {isData ? item.sensor_name : 'No Data Available'}
                            </h4>
                            <p>Vibration Intensity: {isData ? item.vibration : ''}</p>
                            <p>Battery Life: {isData ? item.battery : ''}</p>
                            <p>Temperature: {isData ? item.temperature : ''}</p>
                            <p>Updated Time: {isData ? item.updatedAt : ''}</p>

                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '10px',
                            }}
                        >
                            <button
                                // disabled={!isData}
                                onClick={()=>{
                                    if(!isData){
                                        history.push(`/app/machine-and-sensors/sensor-list/add-new/${id}?machine_name=${machine_name}`);
                                    }else{

                                        history.push(`/app/machine-and-sensors/sensor-list/edit-sensor/${id}/${item.id}?machine_name=${machine_name}`);
                                    }
                               
                                }}
                                style={{
                                    backgroundColor: bgColor,
                                    color: textColor,
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '6px 4px',
                                    cursor:  'pointer',
                                    marginTop: '10px',
                                    width: '50%',
                                    margin: 'auto',
                                }}
                            >
                                Details
                            </button>
                        </div>
                    </div>
                );
            })}

            {
                allSlots.length > 5 ?
                    <div

                        style={{
                            width: '19%',
                            border: `10px solid #666`,
                            borderRadius: '8px',
                            cursor: 'pointer'
                            //   padding: '10px',

                        }}
                    >
                        <h4 style={{
                            color: '#fff',
                            background: '#666'
                        }}>
                            JD Sensor {allSlots.length + 1}
                        </h4>
                        <div style={{ fontSize: '12px', color: '#333', padding: '4px' }}>
                            <h4>
                                {'No Data Available'}
                            </h4>
                            <p>Vibration Intensity:</p>
                            <p>Battery Life: </p>
                            <p>Temperature: </p>
                            <p>Updated Time: </p>
                        </div>
                         <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '10px',
                            }}
                        >
                        <button
                                onClick={()=>{
                                     history.push(`/app/machine-and-sensors/sensor-list/add-new/${id}?machine_name=${machine_name}`);
                                }}
                                style={{
                                    backgroundColor:  '#666',
                                    color:  '#ddd',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '6px 4px',
                                    cursor: 'pointer' ,
                                    marginTop: '10px',
                                    width: '50%',
                                    margin: 'auto',
                                }}
                            >
                                Details
                            </button>
                            </div>
                    </div>
                    : <></>
            }
        </div>
    );
}

export default MachineSensorComponent;
