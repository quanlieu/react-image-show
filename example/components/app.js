import React from 'react';
import Hello from '../../src';
import pic from '../images/300.png';

export default class App extends React.PureComponent {
  render() {
    return (
     <div>
        <Hello><img src={pic} alt=""/></Hello>
      </div>);
  }
}