import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MyContext } from "../infra/MyContext.js";
class InputName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  handleOnChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <>
            <div className="inputWrapper">
              <TextField
                onChange={this.handleOnChange}
                id="standard-basic"
                label="Enter Your Name"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  return context.onPlayerRegisterToRoom(this.state.name);
                }}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </MyContext.Consumer>
    );
  }
}

export default InputName;
