import React from 'react';
import { addStyleToHead, removeStyleFromHead } from '../utils/style-sheet.js';

class Images extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      dragX: 0
    }

    this.createCss = this.createCss.bind(this);
    this.handleTouchImage = this.handleTouchImage.bind(this);
    this.handleMoveImage = this.handleMoveImage.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchCancel = this.handleTouchCancel.bind(this);

    this.styleNodes = this.createCss();
  }

  createCss() {
    const { imgWidth, imgHeight, imgHeightMobile, fixedHeight } = this.props;
    const mediaString = '@media screen and (min-width: 992px)';
    let styleNodes = [];

    if (fixedHeight) {
      styleNodes.push(
        addStyleToHead([
          {
            selector: '.images-container.images-container-size',
            content: `height:${imgHeightMobile};`
          }
        ])
      );
  
      styleNodes.push(
        addStyleToHead(
          [
            {
              selector: '.images-container.images-container-size',
              content: `width:${imgWidth};height:${imgHeight};`
            }
          ],
          mediaString
        )
      );
    } else {
      styleNodes.push(
        addStyleToHead(
          [
            {
              selector: '.images-container.images-container-size',
              content: `width:${imgWidth};`
            }
          ],
          mediaString
        )
      );
    }

    this.styleNodes = styleNodes;
  }

  componentWillUnmount() {
    removeStyleFromHead(this.styleNodes);
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
    const { activeIndex, images, fixedHeight } = this.props;
    const { isDragging, dragX } = this.state;
    
    return (
      <div className={`images-container images-container-size${fixedHeight ? " fixed-height" : ""}`}>
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