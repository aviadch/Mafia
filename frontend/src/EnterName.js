import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MyContext } from "./MyContext.js";
class EnterName extends Component {
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <>
            <div className="Enter Name">
              <TextField id="standard-basic" label="Enter Your Name" />
              <Button
                variant="contained"
                color="primary"
                onClick={context.onNameEnteredHandle}
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
