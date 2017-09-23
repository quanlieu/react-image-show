import React from 'react';
import {
  addStyleToHead, removeStyleFromHead, getTranslateXY
} from '../utils/style-sheet.js';

class Images extends React.PureComponent {
  constructor(props) {
    super(props);

    
    this.state = {
      isSwiping: false,
      imagesTrackStyle: {}
    }

    this.createCss = this.createCss.bind(this);
    this.handleLoaded = this.handleLoaded.bind(this);
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
            selector: '.slide-show .images-size',
            content: `height:${imgHeightMobile};`
          }
        ])
      );
  
      styleNodes.push(
        addStyleToHead(
          [
            {
              selector: '.slide-show .images-size',
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
              selector: '.slide-show .images-size',
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

  componentWillReceiveProps(nextProps) {
    const { activeIndex } = nextProps;
    this.setState({imagesTrackStyle: this.calculateTrackStyle(activeIndex)});
  }

  calculateTrackStyle(activeIndex) {
    const { fixedHeight } = this.props;
    const activeImage = this.imagesTrack.childNodes[activeIndex];
    const imageBoundingClientRect = activeImage.getBoundingClientRect();
    // Images width and track width are the same
    // Width can be store to calculate less, but causes bug when window resize
    const translateX = -activeIndex * imageBoundingClientRect.width ;
    
    return {
      transform: `translateX(${translateX}px)`,
      height: fixedHeight ? 'inherit' : imageBoundingClientRect.height + 'px'
    }
  }

  handleLoaded() {
    const { activeIndex } = this.props;
    this.setState({imagesTrackStyle: this.calculateTrackStyle(activeIndex)});
  }

  handleTouchImage(e) {
    this.startingSwipeStatus = {
      touchStartX: e.touches[0].pageX,
      translateStartX: getTranslateXY(e.currentTarget).x,
      trackWidth: e.currentTarget.getBoundingClientRect().width,
      swiped: 0
    }

    this.setState({isSwiping: true})
  }

  handleMoveImage(e) {
    const imagesTrack = e.currentTarget;
    const { touchStartX, translateStartX } = this.startingSwipeStatus;
    const swiped = e.touches[0].pageX - touchStartX;
    this.startingSwipeStatus.swiped = swiped;
    // TODO: This appear too often, make a function for this
    imagesTrack.style.transform = `translateX(${translateStartX + swiped}px)`;
  }

  handleTouchEnd(e) {
    const imagesTrack = e.currentTarget;
    const { trackWidth, translateStartX, swiped } = this.startingSwipeStatus;
    const { activeIndex } = this.props;
    const swipedRatio = swiped / trackWidth;

    if (swipedRatio < -0.15 && activeIndex < this.props.images.length - 1) {
      this.props.onGoRight();
    } else if (swipedRatio > 0.15 && activeIndex > 0) {
      this.props.onGoLeft();
    } else {
      imagesTrack.style.transform = `translateX(${translateStartX}px)`;
    }

    this.setState({isSwiping: false });
  }

  handleTouchCancel(e) {
    e.currentTarget.style.transform =
      `translateX(${this.startingSwipeStatus.translateStartX}px)`;
    this.setState({isSwiping: false});
  }

  render() {
    const { activeIndex, images, fixedHeight } = this.props;
    const { isSwiping, imagesTrackStyle, m } = this.state;

    return (
      <div
        className={`images images-size${fixedHeight ? " fixed-height" : ""}`}
      >
        <div
          className={`images-track${isSwiping ? " swiping" : ""}`}
          style={imagesTrackStyle}
          ref={imagesTrack => { this.imagesTrack = imagesTrack }}
          onTouchStart={this.handleTouchImage}
          onTouchMove={this.handleMoveImage}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchCancel}
          onClick={this.handleTouchImage}
        >
          {images.map((v, i) => (
            <div className="images-size slide-image" key={i}>
              <img src={v} onLoad={this.handleLoaded} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Images;