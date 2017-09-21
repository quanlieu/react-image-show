import React from 'react';

const Indicators = props => {
  const { count, onClick, activeIndex } = props
  let indicators = [];

  for (let i = 0; i < count; i++) {
    indicators.push(
      <div key={i} onClick={onClick} data-index={i}>
        <span className={i === activeIndex ? "active" : ""}/>
      </div>
    );
  }

  return (
    <div className="indicators">
      {indicators}
    </div>
  )
};

export default Indicators