import React from 'react';
import Arrows from './components/arrows';
import Indicators from './components/indicators';
import { addStyleToHead, removeFromHead } from './utils/style-sheet.js'
import './less/index.less';

// Left right arrows only appear in desktop
// On desktop, width and height can be set
// On mobile, width always 100% only height can be set
// The behavior is to fit height and then crop width to main aspect ratio,
//     too narrow images will be center
class SlideShow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };

    this.length = props.images.length;

    this.createCss = this.createCss.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
    this.goTo = this.goTo.bind(this);

    this.createCss();
  }

  createCss() {
    const { width, imgWidth, imgHeight, imgHeightMobile } = this.props;
    const mediaString = '@media screen and (min-width: 992px)';
    let cssNodes = [];

    cssNodes.push(addStyleToHead(
      {
        selector: '.slide-show.slide-show-size',
        content: `width:${width};`
      },
      mediaString
    ));

    cssNodes.push(
      addStyleToHead([
        {
          selector: '.images-container.images-container-size',
          content: `height:${imgHeightMobile};`
        }
      ])
    );

    cssNodes.push(
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

    this.cssNodes = cssNodes;
  }

  componentWillUnmount() {
    const { cssNodes } = this;
    for (let i = 0; i < cssNodes.length; i++) {
      removeFromHead(cssNodes[i]);
    }
  }

  handleLeftClick() {
    const { activeIndex } = this.state;
    const { length } = this;

    if (activeIndex !== 0) {
      this.goTo(this.state.activeIndex - 1);
    } else {
      this.goTo(length - 1);
    }
  }

  handleRightClick() {
    const { activeIndex } = this.state;
    const { length } = this;

    if (activeIndex !== length - 1) {
      this.goTo(this.state.activeIndex + 1);
    } else {
      this.goTo(0);
    }
  }

  handleIndicatorClick(e) {
    this.goTo(+e.currentTarget.dataset.index);
  }

  goTo(activeIndex) {
    this.setState({activeIndex});
  }

  render() {
    const { images } = this.props;
    const length = images.length;
    const { activeIndex } = this.state;
    
    return (
      <div className="slide-show slide-show-size">
        <Arrows
          onLeftClick={this.handleLeftClick} onRightClick={this.handleRightClick}
        />
        <div className="images-container images-container-size">
          {images.map((v, i) => (
            <div
              style={{
                transform: `translateX(${100 * (i - activeIndex)}%)`,
                transition: 'all 500ms ease-out'
              }}
              className={`slide-image${activeIndex === i ? " active" : ""}`}
              key={i}
            >
              <img src={v} key={i} />
            </div>
          ))}
          <Indicators
            count={length} activeIndex={activeIndex}
            onClick={this.handleIndicatorClick}
          />
        </div>
      </div>
    );
  }
}

SlideShow.defaultProps = {
  width: '920px',
  imgWidth: '800px',
  imgHeight: '450px',
  imgHeightMobile: '56vw'
};

export default SlideShow