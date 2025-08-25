import React, { useState, useEffect } from 'react';

const ProgressBar = ({ progress }) => {
    const [color, setColor] = useState('');
  
    useEffect(() => {
      if (progress <= 10) {
        setColor('#00A843');
      } 
      if (progress <= 7) {
        setColor('#FFCB21');
      } 
       if (progress <= 5) {
        setColor('#FB8920');
      } 
       if (progress <= 2) {
        setColor('#F93737');
      }
    }, [progress]);
  
    const calculateArrowPosition = () => {
      const percentage = (progress / 10) * 100;
      return `${percentage > 100 ? 100 : percentage}%`;
    };
  
    return (
      <div className='d-flex' style={{ position: 'relative', width: '380px', height: '15px', border: 'none' }}>
        <div style={{ width: '20%', height: '100%', backgroundColor: '#F93737' }}></div>
        <div style={{ width: '30%', height: '100%', backgroundColor: '#FB8920' }}></div>
        <div style={{ width: '20%', height: '100%', backgroundColor: '#FFCB21' }}></div>
        <div style={{ width: '30%', height: '100%', backgroundColor: '#00A843' }}></div>
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