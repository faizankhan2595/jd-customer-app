import React, { useState, useEffect } from 'react';

const ProgressBar = ({ progress, statusRanges, maxValue = 10 }) => {
  const [color, setColor] = useState('');

  // Default color mapping for different status types
  const defaultColorMap = {
    'Critical': '#F93737',
    'Warning': '#FB8920',
    'Satisfactory': '#FFCB21',
    'Good': '#00A843'
  };

  useEffect(() => {
    if (!statusRanges || statusRanges.length === 0) return;

    // Find which range the current progress falls into
    const currentRange = statusRanges.find(range =>
      progress >= range.min && progress <= range.max
    );

    if (currentRange) {
      setColor(defaultColorMap[currentRange.type] || '#cccccc');
    }
  }, [progress, statusRanges]);

  const calculateArrowPosition = () => {
    const percentage = (progress / maxValue) * 100;
    return `${percentage > 100 ? 100 : percentage}%`;
  };

  const generateSegments = () => {
    if (!statusRanges || statusRanges.length === 0) return [];

    // Sort ranges by min value to ensure proper order
    const sortedRanges = [...statusRanges].sort((a, b) => a.min - b.min);

    return sortedRanges.map((range, index) => {
      // For overlapping ranges, calculate actual segment width
      // If this is not the first range, start from the previous range's max
      const segmentStart = index === 0 ? range.min : sortedRanges[index - 1].max;
      const segmentEnd = range.max;
      const segmentWidth = ((segmentEnd - segmentStart) / maxValue) * 100;

      return {
        width: `${segmentWidth}%`,
        backgroundColor: defaultColorMap[range.type] || '#cccccc',
        type: range.type
      };
    });
  };

  const segments = generateSegments();

  return (
    // <div className='d-flex' style={{ position: 'relative', width: '380px', height: '15px', border: 'none' }}>
    <div className='d-flex' style={{ position: 'relative', width: '100%', height: '15px', border: 'none' }}>
      {segments.map((segment, index) => (
        <div
          key={index}
          style={{
            width: segment.width,
            height: '100%',
            backgroundColor: segment.backgroundColor
          }}
        ></div>
      ))}
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

export default ProgressBar;
