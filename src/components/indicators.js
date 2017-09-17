import React from 'react';

const Indicators = props => {
  const { count, onClick, activeIndex } = props
  let indicators = [];

  for (let i = 0; i < count; i++) {
    indicators.push(
      <li key={i} onClick={onClick} data-index={i}>
        <span className={i === activeIndex ? "active" : ""}/>
      </li>
    );
  }

  return (
    <ul className="indicators">
      {indicators}
    </ul>
  )
};

export default Indicators