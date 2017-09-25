import React from 'react';

const Indicators = props => {
  const { count, onClick, activeIndex } = props
  let indicators = [];

  for (let i = 0; i < count; i++) {
    indicators.push(
      <div key={i} onClick={onClick} data-index={i}>
        <span className={i === activeIndex ? "ss-active" : ""}/>
      </div>
    );
  }

  return (
    <div className="ss-indicators">
      {indicators}
    </div>
  )
};

export default Indicators