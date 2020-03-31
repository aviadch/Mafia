import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MyContext } from "../infra/MyContext.js";
class EnterName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleOnChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="Enter Name">
              <TextField
                onChange={this.handleOnChange}
                id="standard-basic"
                label="Enter Your Name"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  return context.onNameEntered(this.state.name);
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

export default EnterName;
