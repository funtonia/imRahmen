import React, { Component } from 'react';

/* This component is the input form for new versions. This component is not all done yet, it still needs styling and 
  some functionality. The issues for this can be found in GitLab. */

class VersionInputForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        title: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
      e.preventDefault();
      this.props.handleSubmit(this.state.title, this.state.createDate, this.state.changeDate);
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit} >
            <div className="input-form">
              <p>Name:</p>
              <input type="text" name="name" onChange={this.handleChange} value={this.state.title} />
              <br />
            </div>
        </form>
    );
  }
}

export default VersionInputForm;
