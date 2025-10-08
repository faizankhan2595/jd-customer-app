import React, { useState, useEffect } from 'react';
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

    // Window width state for responsive card sizing
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Listen for window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate responsive card width
    const getCardWidth = () => {
        if (windowWidth < 768) return '100%';        // 1 card per row on mobile
        if (windowWidth < 1024) return 'calc(50% - 10px)';  // 2 cards per row on tablet
        if (windowWidth < 1440) return 'calc(33.33% - 10px)'; // 3 cards per row on small desktop
        return '19%';                                 // 5 cards per row on large screens
    };

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
                            width: getCardWidth(),
                            minWidth: windowWidth < 768 ? '100%' : '200px',
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
                            <p>Vibration Intensity: {isData ? `X: ${item.latest_vibration_x || 'N/A'}, Y: ${item.latest_vibration_y || 'N/A'}, Z: ${item.latest_vibration_z || 'N/A'}` : ''}</p>
                            <p>Battery Life: {isData ? `${item.latest_battery_percentage || 'N/A'}%` : ''}</p>
                            <p>Temperature: {isData ? `${item.latest_temperature || 'N/A'}°C` : ''}</p>
                            <p>Updated Time: {isData ? (item.latest_updated_at ? new Date(item.latest_updated_at).toLocaleString() : 'N/A') : ''}</p>

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
                                                message.warning("Sensor analysis is only available for premium users. Please upgrade your plan to access this feature.");
                                                return;
                                            }
                                            history.push(`/app/machine-and-sensors/sensor-analysis/${id}/${item.sensor_id}`);
                                        }}
                                        disabled={isFreeUser}
                                        style={{
                                            backgroundColor: isFreeUser ? '#d9d9d9' : bgColor,
                                            color: isFreeUser ? '#8c8c8c' : textColor,
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '4px 2px',
                                            cursor: isFreeUser ? 'not-allowed' : 'pointer',
                                            marginTop: '10px',
                                            width: '45%',
                                            fontSize: '11px',
                                            position: 'relative',
                                            opacity: isFreeUser ? 0.6 : 1
                                        }}
                                        title={isFreeUser ? "Premium feature - upgrade to access sensor analysis" : "Access full sensor analysis"}
                                    >
                                        Analysis {isFreeUser && '🔒'}
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
                            width: getCardWidth(),
                            minWidth: windowWidth < 768 ? '100%' : '200px',
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
                            <p>Vibration Intensity: N/A</p>
                            <p>Battery Life: N/A</p>
                            <p>Temperature: N/A</p>
                            <p>Updated Time: N/A</p>
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
