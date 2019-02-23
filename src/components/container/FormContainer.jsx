import React, { Component } from 'react';

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: 'This is the title of this page',
    };
  }

  render() {
    const { title } = this.state;
    return (
      <h2>{ title }</h2>
    );
  }
}
export default FormContainer;
