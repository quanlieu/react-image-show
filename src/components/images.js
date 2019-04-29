import React from 'react';
import {
  addStyleToHead, removeStyleFromHead, getTranslateXY
} from '../utils/style-sheet.js';
import { NORMAL, FIRST_TO_LAST, LAST_TO_FIRST } from '../utils/constants.js';

class Images extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      noTransition: true,
      imagesTrackStyle: {}
    }

    this.styleNodes = this.createCss(props);
    this.activeIndex = this.calculateActiveIndex(props);

    this.handleLoaded = this.handleLoaded.bind(this);
    this.handleTouchImage = this.handleTouchImage.bind(this);
    this.handleMoveImage = this.handleMoveImage.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchCancel = this.handleTouchCancel.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

    this.handleClickImage = this.handleClickImage.bind(this);
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
    const activeIndex = this.calculateActiveIndex(nextProps);
    this.setState({
      imagesTrackStyle: this.calculateTrackStyle(activeIndex),
      noTransition: false
    });
    this.activeIndex = activeIndex;
  }

  calculateActiveIndex(nextProps) {
    const { activeIndex, infinite, navigateStatus } = nextProps;
    if (infinite) {
      nextProps.updateNavigationStatus(NORMAL);
      switch (navigateStatus) {
        case FIRST_TO_LAST:
          return 0;
        case LAST_TO_FIRST:
          return nextProps.images.length + 1;
        default:
          return activeIndex + 1;
      }
    } else {
      return activeIndex;
    }
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
    this.setState({imagesTrackStyle: this.calculateTrackStyle(this.activeIndex)});
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
    const { activeIndex } = this;
    const swipedRatio = swiped / trackWidth;

    if (this.props.infinite) {
      if (swipedRatio < -0.15) {
        this.props.onGoRight();
      } else if (swipedRatio > 0.15) {
        this.props.onGoLeft();
      } else {
        imagesTrack.style.transform = `translateX(${translateStartX}px)`;
      }
    } else {
      if (swipedRatio < -0.15 && activeIndex < this.props.images.length - 1) {
        this.props.onGoRight();
      } else if (swipedRatio > 0.15 && activeIndex > 0) {
        this.props.onGoLeft();
      } else {
        imagesTrack.style.transform = `translateX(${translateStartX}px)`;
      }
    }

    this.setState({noTransition: false });
  }

  handleTouchCancel(e) {
    e.currentTarget.style.transform =
      `translateX(${this.startingSwipeStatus.translateStartX}px)`;
    this.setState({noTransition: false});
  }

  handleTransitionEnd(e) {
    const { activeIndex } = this;
    const { images } = this.props;
    
    if (activeIndex === 0) {
      this.activeIndex = images.length;
      this.setState({
        imagesTrackStyle: this.calculateTrackStyle(this.activeIndex),
        noTransition: true
      });
    }

    if (activeIndex === images.length + 1) {
      this.activeIndex = 1;
      this.setState({
        imagesTrackStyle: this.calculateTrackStyle(1),
        noTransition: true
      });
    }
  }

  handleClickImage(index) {
    return (e) => {
      this.props.onImageClick(e, index);
    };
  }

  render() {
    const { images, fixedImagesHeight, infinite } = this.props;
    const { noTransition, imagesTrackStyle } = this.state;
    const trackEvents = {
      onTouchStart: this.handleTouchImage,
      onTouchMove: this.handleMoveImage,
      onTouchEnd: this.handleTouchEnd,
      onTouchCancel: this.handleTouchCancel,
      onTransitionEnd: infinite ? this.handleTransitionEnd : undefined
    }

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
          {...trackEvents}
        >
          {infinite && (
            <div className="ss-images-size ss-slide-image">
              <img src={images[images.length - 1]} />
            </div>
          )}
          {images.map((v, i) => (
            <div className="ss-images-size ss-slide-image" key={i} onClick={this.handleClickImage(i)}>
              <img src={v} onLoad={i === 0 ? this.handleLoaded : undefined} />
            </div>
          ))}
          {infinite && (
            <div className="ss-images-size ss-slide-image">
              <img src={images[0]} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Images;
