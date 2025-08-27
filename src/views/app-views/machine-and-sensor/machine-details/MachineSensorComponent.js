import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { message } from 'antd';

function MachineSensorComponent({ data,id,machine_name }) {
    // Check if current user is a free user (role id 5)
    const userRole = parseInt(localStorage.getItem("role"));
    const isFreeUser = userRole === 5;
    
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
                                gap: '5px'
                            }}
                        >
                            {!isData ? (
                                <button
                                    onClick={()=>{
                                        history.push(`/app/machine-and-sensors/sensor-list/add-new/${id}?machine_name=${machine_name}`);
                                    }}
                                    style={{
                                        backgroundColor: bgColor,
                                        color: textColor,
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '6px 4px',
                                        cursor: 'pointer',
                                        marginTop: '10px',
                                        width: '90%',
                                        margin: 'auto',
                                    }}
                                >
                                    Add Sensor
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={()=>{
                                            if (isFreeUser) {
                                                message.info("Advanced sensor analysis is available for premium users. You can still access basic analysis through the chart data points.");
                                            }
                                            history.push(`/app/machine-and-sensors/sensor-analysis/${id}/${item.sensor_id}`);
                                        }}
                                        style={{
                                            backgroundColor: isFreeUser ? '#f0f0f0' : bgColor,
                                            color: isFreeUser ? '#999' : textColor,
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '4px 2px',
                                            cursor: 'pointer',
                                            marginTop: '10px',
                                            width: '45%',
                                            fontSize: '11px',
                                            position: 'relative'
                                        }}
                                        title={isFreeUser ? "Limited features for free users" : "Access full sensor analysis"}
                                    >
                                        Analysis {isFreeUser && '⚠️'}
                                    </button>
                                    <button
                                        onClick={()=>{
                                            history.push(`/app/machine-and-sensors/sensor-list/edit-sensor/${id}/${item.id}?machine_name=${machine_name}`);
                                        }}
                                        style={{
                                            backgroundColor: bgColor,
                                            color: textColor,
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '4px 2px',
                                            cursor: 'pointer',
                                            marginTop: '10px',
                                            width: '45%',
                                            fontSize: '11px'
                                        }}
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
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
                                Add Sensor
                            </button>
                            </div>
                    </div>
                    : <></>
            }
        </div>
    );
}

export default MachineSensorComponent;
