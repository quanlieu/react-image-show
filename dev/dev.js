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
    this.NORMAL = 'NORMAL';
    this.FIXED_HEIGHT = 'FIXED_HEIGHT';
    this.INFINITE = 'INFINITE';
    this.FIXED_INFINITE = 'FIXED_INFINITE';

    this.state = {
      isShowIndicators: true,
      isShowThumbnails: true,
      isShowArrows: true,
      sliderType: this.FIXED_HEIGHT
    }

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.renderSettingTable = this.renderSettingTable.bind(this);
  }

  handleCheckbox(e) {
    const { name } = e.currentTarget;
    this.setState({[name]: !this.state[name]});
  }

  handleRadio(e) {
    this.setState({sliderType: e.currentTarget.id});
  }

  renderSettingTable() {
    const {
      isShowIndicators, isShowThumbnails, isShowArrows, sliderType
    } = this.state

    return (
      <div>
        <h1 className="text-center">Try these settings</h1>
        <table className="margin-auto">
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
              <td>
                <label htmlFor={this.NORMAL}>Normal slider</label>
              </td>
              <td>
                <input
                  name="sliderType"
                  id={this.NORMAL}
                  type="radio"
                  checked={sliderType === this.NORMAL}
                  onChange={this.handleRadio}
                />
              </td>
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
              <td>
                <label htmlFor={this.FIXED_HEIGHT}>Fixed height</label>
              </td>
              <td>
                <input
                  name="sliderType"
                  id={this.FIXED_HEIGHT}
                  type="radio"
                  checked={sliderType === this.FIXED_HEIGHT}
                  onChange={this.handleRadio}
                />
              </td>
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
              <td>
                <label htmlFor={this.INFINITE}>Infinite scrolling</label>
              </td>
              <td>
                <input
                  name="sliderType"
                  id={this.INFINITE}
                  type="radio"
                  checked={sliderType === this.INFINITE}
                  onChange={this.handleRadio}
                />
              </td>
            </tr>
            <tr>
              <td></td><td></td>
              <td>
                <label htmlFor={this.FIXED_INFINITE}>Infinite and fixed</label>
              </td>
              <td>
                <input
                  name="sliderType"
                  id={this.FIXED_INFINITE}
                  type="radio"
                  checked={sliderType === this.FIXED_INFINITE}
                  onChange={this.handleRadio}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const { sliderType } = this.state;

    const sliderStatus = {
      indicators: this.state.isShowIndicators,
      thumbnails: this.state.isShowThumbnails,
      arrows: this.state.isShowArrows
    };
    
    return (
      <div>
        {this.renderSettingTable()}
        {sliderType === this.NORMAL && (
          <SlideShow
            images={this.images}
            {...sliderStatus}
          />
        )}
        {sliderType === this.FIXED_HEIGHT && (
          <SlideShow
            images={this.images}
            {...sliderStatus}
            fixedImagesHeight
          />
        )}
        {sliderType === this.INFINITE && (
          <SlideShow
            images={this.images}
            {...sliderStatus}
            infinite
          />
        )}
        {sliderType === this.FIXED_INFINITE && (
          <SlideShow
            images={this.images}
            {...sliderStatus}
            fixedImagesHeight infinite
          />
        )}
      </div>
    );
  }
}