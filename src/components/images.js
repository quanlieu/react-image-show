import React from 'react';

const Images = props => {
  const { activeIndex, images } = props;
  return (
    <div className="images-container images-container-size">
      {images.map((v, i) => (
        <div
          style={{
            transform: `translateX(${100 * (i - activeIndex)}%)`
          }}
          className={`slide-image${activeIndex === i ? " active" : ""}`}
          key={i}
        >
          <img src={v} key={i} />
        </div>
      ))}
    </div>
  );
};

export default Images