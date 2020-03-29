import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
        <TextField id="standard-basic" label="Enter Your Name" />
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.props.handler(this.state.value)}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default EnterName;
