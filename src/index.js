import React from 'react';
import './index.less'

class SlideShow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }
  render() {
    const { images } = this.props
    return (
      <div>
        <i className="arrow left" />
        {images.map((v, i) =>
          <img src={v} alt="" />
        )}
      </div>
    );
  }
}

export default SlideShow