import React from "react";
class EnterName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    return (
      <div className="Enter Name">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Enter Your Name"
        />
        <button onClick={() => this.props.handler(this.state.value)}>
          Submit
        </button>
      </div>
    );
  }
}

export default EnterName;
