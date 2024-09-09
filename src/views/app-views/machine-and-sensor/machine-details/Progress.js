import React, { useState, useEffect } from 'react';

const ProgressBar = ({ progress }) => {
    const [color, setColor] = useState('');
  
    useEffect(() => {
      if (progress <= 10) {
        setColor('#00A843');
      } else if (progress <= 20) {
        setColor('#FFCB21');
      } else if (progress <= 30) {
        setColor('#FB8920');
      } else if (progress <= 40) {
        setColor('#F93737');
      }
    }, [progress]);
  
    const calculateArrowPosition = () => {
      const percentage = (progress / 40) * 100;
      return `${percentage > 100 ? 100 : percentage}%`;
    };
  
    return (
      <div className='d-flex' style={{ position: 'relative', width: '380px', height: '15px', border: 'none' }}>
        <div style={{ width: '25%', height: '100%', backgroundColor: '#00A843' }}></div>
        <div style={{ width: '25%', height: '100%', backgroundColor: '#FFCB21' }}></div>
        <div style={{ width: '25%', height: '100%', backgroundColor: '#FB8920' }}></div>
        <div style={{ width: '25%', height: '100%', backgroundColor: '#F93737' }}></div>
        <div
          style={{
            position: 'absolute',
            bottom: '-5px',
            left: calculateArrowPosition(),
            marginLeft: '-5px',
            width: '0',
            height: '0',
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: `5px solid ${color}`,
          }}
        ></div>
      </div>
    );
  };
export default ProgressBar