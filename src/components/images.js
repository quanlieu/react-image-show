import React from 'react';

class Images extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      dragX: 0
    }

    this.handleTouchImage = this.handleTouchImage.bind(this);
    this.handleMoveImage = this.handleMoveImage.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchCancel = this.handleTouchCancel.bind(this);
  }

  handleTouchImage(e) {
    const boundingClientRect =  e.currentTarget.getBoundingClientRect();
    this.touchStartX = e.touches[0].pageX;
    this.pixelsInOnePercent = boundingClientRect.width / 100;
    this.setState({isDragging: true})
  }

  handleMoveImage(e) {
    const distance = e.touches[0].pageX - this.touchStartX;
    const distanceInPercent = distance / this.pixelsInOnePercent;
    this.setState({dragX: distanceInPercent});
  }

  handleTouchEnd(e) {
    const { dragX } = this.state;
    if (dragX < -15) {
      this.props.onGoRight();
    } else if (dragX > 15) {
      this.props.onGoLeft();
    }
    
    this.setState({isDragging: false, dragX: 0});
  }

  handleTouchCancel(e) {
    this.setState({isDragging: false, dragX: 0});
  }

  render() {
    const { activeIndex, images } = this.props;
    const { isDragging, dragX } = this.state;
    
    return (
      <div className="images-container images-container-size">
        {images.map((v, i) => (
          <div
            style={{
              transform: `translateX(${100 * (i - activeIndex) + dragX}%)`
            }}
            className={
              `slide-image${activeIndex === i ? " active" : ""}${isDragging ? " dragging" : ""}`
            }
            key={i}
            onTouchStart={this.handleTouchImage}
            onTouchMove={this.handleMoveImage}
            onTouchEnd={this.handleTouchEnd}
            onTouchCancel={this.handleTouchCancel}
          >
            <img src={v} key={i} />
          </div>
        ))}
      </div>
    );
  }
};

export default Images;