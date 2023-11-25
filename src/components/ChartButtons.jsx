import React from 'react';

const ChartButtons = ({ children, selected, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <span
      onClick={handleClick}
      className={`chart-button ${selected ? 'active' : ''}`}
    >
      {children}
    </span>
  );
};

export default ChartButtons;
