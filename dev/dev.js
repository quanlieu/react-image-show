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

    this.state = {
      isShowIndicators: true,
      isShowThumbnails: true,
      isShowArrows: true,
      isShowFixedHeight: true
    }

    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox(e) {
    const { name } = e.currentTarget;
    this.setState({[name]: !this.state[name]})
  }

  render() {
    const {
      isShowIndicators, isShowThumbnails, isShowArrows, isShowFixedHeight
    } = this.state
    
    return (
      <div>
        <h1>Adjust some of these setting</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="isShowIndicators">Show indicators</label>
              </td>
              <td>
                <input
                  name="isShowIndicators"
                  id="isShowIndicators"
                  type="checkbox"
                  checked={isShowIndicators}
                  onChange={this.handleCheckbox}
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <label htmlFor="isShowThumbnails">Show thumbnails</label>
              </td>
              <td>
                <input
                  name="isShowThumbnails"
                  id="isShowThumbnails"
                  type="checkbox"
                  checked={isShowThumbnails}
                  onChange={this.handleCheckbox}
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <label htmlFor="isShowArrows">Show arrows</label>
              </td>
              <td>
                <input
                  name="isShowArrows"
                  id="isShowArrows"
                  type="checkbox"
                  checked={isShowArrows}
                  onChange={this.handleCheckbox}
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <label htmlFor="isShowFixedHeight">Fixed height</label>
              </td>
              <td>
                <input
                  name="isShowFixedHeight"
                  id="isShowFixedHeight"
                  type="checkbox"
                  checked={isShowFixedHeight}
                  onChange={this.handleCheckbox}
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        {isShowFixedHeight && <SlideShow
          images={this.images}
          indicators={isShowIndicators}
          thumbnails={isShowThumbnails}
          arrows={isShowArrows}
          fixedImagesHeight
        />}
        {!isShowFixedHeight &&<SlideShow
          images={this.images}
          indicators={isShowIndicators}
          thumbnails={isShowThumbnails}
          arrows={isShowArrows}
        />}
      </div>
    );
  }
}