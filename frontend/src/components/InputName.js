import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MyContext } from "../infra/MyContext.js";
const InputName = () => {
  const context = useContext(MyContext);
  const [name, setName] = useState("");

  const handleOnChange = (event) => {
    setName(event.target.value);
  };
  return (
    <div className="inputWrapper">
      <TextField
        onChange={handleOnChange}
        id="standard-basic"
        label="Enter Your Name"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          return context.onPlayerRegisterToRoom(name);
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default InputName;
