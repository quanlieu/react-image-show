import React from 'react';
import {
  addStyleToHead, removeStyleFromHead, getTranslateXY
} from '../utils/style-sheet.js';

class Images extends React.PureComponent {
  constructor(props) {
    super(props);

    
    this.state = {
      noTransition: false,
      imagesTrackStyle: {}
    }

    this.styleNodes = this.createCss(props);

    this.handleLoaded = this.handleLoaded.bind(this);
    this.handleTouchImage = this.handleTouchImage.bind(this);
    this.handleMoveImage = this.handleMoveImage.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchCancel = this.handleTouchCancel.bind(this);
  }

  createCss(props) {
    const {
      imagesWidth, imagesHeight, imagesHeightMobile, fixedImagesHeight
    } = props;
    const mediaString = '@media screen and (min-width: 992px)';
    let styleNodes = [];

    if (fixedImagesHeight) {
      styleNodes.push(
        addStyleToHead([
          {
            selector: '.slide-show .ss-images-size',
            content: `height:${imagesHeightMobile};`
          }
        ])
      );
  
      styleNodes.push(
        addStyleToHead(
          [
            {
              selector: '.slide-show .ss-images-size',
              content: `width:${imagesWidth};height:${imagesHeight};`
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
              selector: '.slide-show .ss-images-size',
              content: `width:${imagesWidth};`
            }
          ],
          mediaString
        )
      );
    }

    return styleNodes;
  }

  componentWillUnmount() {
    removeStyleFromHead(this.styleNodes);
  }

  componentWillReceiveProps(nextProps) {
    const { activeIndex } = nextProps;
    this.setState({imagesTrackStyle: this.calculateTrackStyle(activeIndex)});
  }

  calculateTrackStyle(activeIndex) {
    const { fixedImagesHeight } = this.props;
    const activeImage = this.imagesTrack.childNodes[activeIndex];
    const imageBoundingClientRect = activeImage.getBoundingClientRect();
    // Images width and track width are the same
    // Width can be store to calculate less, but causes bug when window resize
    const translateX = -activeIndex * imageBoundingClientRect.width ;
    
    return {
      transform: `translateX(${translateX}px)`,
      height: fixedImagesHeight ? 'inherit' : imageBoundingClientRect.height + 'px'
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

    this.setState({noTransition: true})
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

    this.setState({noTransition: false });
  }

  handleTouchCancel(e) {
    e.currentTarget.style.transform =
      `translateX(${this.startingSwipeStatus.translateStartX}px)`;
    this.setState({noTransition: false});
  }

  render() {
    const { activeIndex, images, fixedImagesHeight } = this.props;
    const { noTransition, imagesTrackStyle } = this.state;

    return (
      <div
        className={
          `ss-images ss-images-size${fixedImagesHeight ? " ss-fixed-height" : ""}`
        }
      >
        <div
          className={`ss-images-track${noTransition ? " ss-no-transition" : ""}`}
          style={imagesTrackStyle}
          ref={imagesTrack => { this.imagesTrack = imagesTrack }}
          onTouchStart={this.handleTouchImage}
          onTouchMove={this.handleMoveImage}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchCancel}
          onClick={this.handleTouchImage}
        >
          {images.map((v, i) => (
            <div className="ss-images-size ss-slide-image" key={i}>
              <img src={v} onLoad={this.handleLoaded} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Images;