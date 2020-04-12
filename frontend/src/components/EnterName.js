import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MyContext } from "../infra/MyContext.js";
const EnterName = () => {
  const [name, setName] = useState("");

  const handleOnChange = (event) => {
    setName(event.target.value);
  };

  return (
    <MyContext.Consumer>
      {(context) => (
        <>
          <div className="Enter Name">
            <TextField
              onChange={handleOnChange}
              id="standard-basic"
              label="Enter Your Name"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                return context.onNameEntered(name);
              }}
            >
              Submit
            </Button>
          </div>
        </>
      )}
    </MyContext.Consumer>
  );
};

export default EnterName;
