import React from 'react';
import Indicators from './components/indicators';
import './index.less';

class SlideShow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };

    this.length = props.images.length;

    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
    this.goTo = this.goTo.bind(this);
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
      <div className="slide-show">
        <span className="arrow left" onClick={this.handleLeftClick} />
        <div className="item-container">
          {images.map((v, i) => (
            <div
              style={{
                transform: `translate(${100 * (i - activeIndex)}% , 0)`,
                transition: 'all 450ms ease-out'
              }}
              key={i} className={`item${activeIndex === i ? " active" : ""}`}
            >
              <img src={v} key={i} />
            </div>
          ))}
          <Indicators
            count={length} activeIndex={activeIndex}
            onClick={this.handleIndicatorClick}
          />
        </div>
        <span className="arrow right" onClick={this.handleRightClick} />
      </div>
    );
  }
}

export default SlideShow