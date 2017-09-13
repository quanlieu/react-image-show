import React from 'react';

class Hello extends React.PureComponent {
  render() {
    return (
     <div className="text-center text-danger">
        <h1>Hello World</h1>
        {this.props.children}
      </div>
    );
  }
}

export default Hello