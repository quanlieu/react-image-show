import React from 'react';
import SlideShow from '../src';
import m01 from './images/m01.png';
import m02 from './images/m02.png';
import m03 from './images/m03.png';
import m04 from './images/m04.png';
import m05 from './images/m05.png';
import m06 from './images/m06.png';
import m07 from './images/m07.png';
import m08 from './images/m08.png';
import m09 from './images/m09.png';

export default class Dev extends React.PureComponent {
  constructor(props) {
    super(props);
    this.images = [m01, m02, m03, m04, m05, m06, m07, m08, m09];
  }

  render() {
    return (
      <div>
        <SlideShow images={this.images} indicators thumbnails fixedImagesHeight />
      </div>);
  }
}