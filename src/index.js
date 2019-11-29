import React from 'react';
import Arrows from './components/arrows';
import Indicators from './components/indicators';
import Images from './components/images';
import Thumbnails from './components/thumbnails';
import { addStyleToHead, removeStyleFromHead } from './utils/style-sheet.js';
import { NORMAL, FIRST_TO_LAST, LAST_TO_FIRST } from './utils/constants.js';
import './less/index.less';

class SlideShow extends React.PureComponent {
  constructor(props) {
    super(props);

    // navigateStatus can be NORMAL, FIRST_TO_LAST or LAST_TO_FIRST to indicate that
    //   the navigation's just made is normal, or go from first image to last image ...
    this.state = {
      activeIndex: 0,
      navigateStatus: NORMAL
    };

    this.styleNodes = this.createCss(props);

    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
    this.goTo = this.goTo.bind(this);
    this.updateNavigationStatus = this.updateNavigationStatus.bind(this);

    this.handleClickImage = this.handleClickImage.bind(this);
  }

  createCss(props) {
    const {
      width, imagesWidth, imagesHeight, imagesHeightMobile, fixedImagesHeight
    } = props;
    const mediaString = '@media screen and (min-width: 992px)';
    let styleNodes = [];

    styleNodes.push(addStyleToHead(
      {
        selector: '.slide-show.slide-show-size',
        content: `width:${width};`
      },
      mediaString
    ));

    return styleNodes;
  }

  componentWillUnmount() {
    removeStyleFromHead(this.styleNodes);
  }

  handleLeftClick() {
    const { activeIndex } = this.state;

    if (activeIndex !== 0) {
      this.goTo(this.state.activeIndex - 1);
    }
    else if (this.props.infinite) {
      this.goTo(this.props.images.length - 1);
      this.navigateStatus = FIRST_TO_LAST;
    }
  }

  handleRightClick() {
    const { activeIndex } = this.state;

    if (activeIndex !== this.props.images.length - 1) {
      this.goTo(activeIndex + 1);
    }
    else if (this.props.infinite) {
      this.goTo(0);
      this.navigateStatus = LAST_TO_FIRST;
    }
  }

  handleIndicatorClick(e) {
    this.goTo(+e.currentTarget.dataset.index);
  }

  goTo(activeIndex) {
    this.setState({activeIndex});
  }

  updateNavigationStatus(nextStatus) {
    this.navigateStatus = nextStatus;
  }

  handleClickImage(e, index) {
    if (typeof this.props.onImageClick === 'function') {
      this.props.onImageClick(e, index);
    }
  }

  render() {
    const {
      images, indicators, thumbnails, arrows, fixedImagesHeight, infinite,
      imagesWidth, imagesHeight, imagesHeightMobile, thumbnailsWidth, arrowsWidth
    } = this.props;
    const { activeIndex } = this.state;

    if (!images || !images.length) {
      return <div />;
    }

    const length = images.length;

    return (
      <div>
        <div className="slide-show slide-show-size">
          <Images
            images={images}
            activeIndex={activeIndex}
            onGoLeft={this.handleLeftClick}
            onGoRight={this.handleRightClick}
            goTo={this.goTo}
            fixedImagesHeight={fixedImagesHeight}
            imagesWidth={imagesWidth}
            imagesHeight={imagesHeight}
            imagesHeightMobile={imagesHeightMobile}
            infinite={infinite}
            navigateStatus={this.navigateStatus}
            updateNavigationStatus={this.updateNavigationStatus}
            onImageClick={this.handleClickImage}
          />
          {arrows && <Arrows
            onLeftClick={this.handleLeftClick}
            onRightClick={this.handleRightClick}
            arrowsWidth={arrowsWidth}
          />}
          {indicators && <Indicators
            count={length} activeIndex={activeIndex}
            onClick={this.handleIndicatorClick}
          />}
        </div>
        {thumbnails && <div className="slide-show">
          <Thumbnails
            images={images}
            thumbnailsWidth={thumbnailsWidth}
            activeIndex={activeIndex}
            goTo={this.goTo}
            fixedImagesHeight={fixedImagesHeight}
          />
        </div>}
      </div>
    );
  }
}

SlideShow.defaultProps = {
  images: [],
  width: '920px',
  imagesWidth: '800px',
  thumbnailsWidth: '920px',
  thumbnailsHeight: '12vw',
  imagesHeight: '450px',
  imagesHeightMobile: '56vw',
  arrows: true,
  fixedImagesHeight: false,
  indicators: false,
  thumbnails: false,
  infinite: false,
  onImageClick: undefined
};

export default SlideShow;