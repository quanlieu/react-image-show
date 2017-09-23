import React from 'react';
import SlideShow from '../../src';
import m01 from '../images/m01.png';
import m02 from '../images/m02.png';
import m03 from '../images/m03.png';
import m04 from '../images/m04.png';
import m05 from '../images/m05.png';
import m06 from '../images/m06.png';
import m07 from '../images/m07.png';
import m08 from '../images/m08.png';
import m09 from '../images/m09.png';
import m10 from '../images/m10.png';
import m11 from '../images/m11.png';
import m12 from '../images/m12.png';
import m13 from '../images/m13.png';
import m14 from '../images/m14.png';
import m15 from '../images/m15.png';
import m16 from '../images/m16.png';
import m17 from '../images/m17.png';
import m18 from '../images/m18.png';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.images = [m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15, m16, m17, m18];
  }

  render() {
    return (
     <div>
        <SlideShow images={this.images} />
      </div>);
  }
}