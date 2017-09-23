import React from 'react';
import { addStyleToHead, removeStyleFromHead } from '../utils/style-sheet.js';

class Thumbnails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      thumbnailsTrackStyle: { left: '0px' }
    }
    this.handleImageClick = this.handleImageClick.bind(this);
    this.createCss();
  }

  createCss() {
    const { thumbnailsWidth } = this.props;
    const mediaString = '@media screen and (min-width: 992px)';
    let styleNodes = [];

    styleNodes.push(addStyleToHead(
      {
        selector: '.slide-show .thumbnails',
        content: `width:${thumbnailsWidth};`
      },
      mediaString
    ));

    this.styleNodes = styleNodes;
  }

  componentWillReceiveProps(nextProps) {
    const { activeIndex } = nextProps;
    const left = this.calculateOffsetLeft(activeIndex);
    this.setState({
      thumbnailsTrackStyle: {
        left: left + 'px'
      }
    })
  }

  componentWillUnmount() {
    removeStyleFromHead(this.styleNodes);
  }

  handleImageClick(e) {
    this.props.goTo(+e.currentTarget.dataset.index);
  }

  calculateOffsetLeft(activeIndex) {
    const totalImage = this.props.images.length;
    const { thumbnailsTrack } = this;
    const trackWidth = thumbnailsTrack.getBoundingClientRect().width;
    const scrollWidth = thumbnailsTrack.scrollWidth;
    const maxScroll = scrollWidth - trackWidth;
    const pixelPerIndex = maxScroll / (totalImage - 1);

    // Number rounding can cause miscalculation, take special care of the last thumbnail
    if (activeIndex === totalImage - 1) {
      return -maxScroll;
    }

    return -activeIndex * pixelPerIndex;
  }

  render() {
    const { images, activeIndex } = this.props;
    const { thumbnailsTrackStyle } = this.state;
    return (
      <div className="thumbnails">
        <div
          className="thumbnails-track" style={thumbnailsTrackStyle}
          ref={thumbnailsTrack => { this.thumbnailsTrack = thumbnailsTrack }}
        >
          {images.map((v, i) => {
            return (
              <div
                key={i}
                className="thumbnail"
                onClick={this.handleImageClick}
                data-index={i}
              >
                <img src={v} alt="" className={activeIndex === i ? "active" : ""} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Thumbnails