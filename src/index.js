import React from 'react';
import Arrows from './components/arrows';
import Indicators from './components/indicators';
import Images from './components/images';
import Thumbnails from './components/thumbnails';
import { addStyleToHead, removeStyleFromHead } from './utils/style-sheet.js';
import './less/index.less';

class SlideShow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };

    this.styleNodes = this.createCss(props);

    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
    this.goTo = this.goTo.bind(this);
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
    // else {
    //   this.goTo(length - 1);
    // }
  }

  handleRightClick() {
    const { activeIndex } = this.state;
    const { length } = this.props;

    if (activeIndex !== length - 1) {
      this.goTo(this.state.activeIndex + 1);
    }
    // else {
    //   this.goTo(0);
    // }
  }

  handleIndicatorClick(e) {
    this.goTo(+e.currentTarget.dataset.index);
  }

  goTo(activeIndex) {
    this.setState({activeIndex});
  }

  render() {
    const {
      images, indicators, thumbnails, arrows, fixedImagesHeight, 
      imagesWidth, imagesHeight, imagesHeightMobile, thumbnailsWidth
    } = this.props;
    const { activeIndex } = this.state;

    if (!images || !images.length) {
      return <div />;
    }

    const length = images.length;

    return (
      <div>
        <div className="slide-show slide-show-size">
          {arrows && <Arrows
            onLeftClick={this.handleLeftClick}
            onRightClick={this.handleRightClick}
          />}
          <Images
            images={images}
            activeIndex={activeIndex}
            onGoLeft={this.handleLeftClick}
            onGoRight={this.handleRightClick}
            fixedImagesHeight={fixedImagesHeight}
            imagesWidth={imagesWidth}
            imagesHeight={imagesHeight}
            imagesHeightMobile={imagesHeightMobile}
          />
          {indicators && <Indicators
            count={length} activeIndex={activeIndex}
            onClick={this.handleIndicatorClick}
          />}
        </div>
        {thumbnails && <div className="slide-show slide-show-size">
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
  thumbnails: false
};

export default SlideShow