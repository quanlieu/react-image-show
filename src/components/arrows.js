import React from 'react';

const Arrows = props => {
  const { onLeftClick, onRightClick } = props;
  return (
    <div className="arrows">
      <span className="arrow left" onClick={onLeftClick} />
      <span className="arrow right" onClick={onRightClick} />
    </div>
  );
};

export default Arrows