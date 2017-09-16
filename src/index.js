import React from 'react';
import './index.less'

class SlideShow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };

    this.length = props.images.length;

    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
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

  goTo(activeIndex) {
    this.setState({activeIndex});
  }

  render() {
    const { images } = this.props;
    const { activeIndex } = this.state;
    
    return (
      <div className="slide-show">
        <span className="arrow left" onClick={this.handleLeftClick} />
        {images.map((v, i) => (
          <img className={`item${activeIndex === i ? " active" : ""}`} src={v} key={i} />
        ))}
        <span className="arrow right" onClick={this.handleRightClick} />
      </div>
    );
  }
}

export default SlideShow