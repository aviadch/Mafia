import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const InputName = (props) => {
  const [name, setName] = useState('');

  const handleOnChange = (event) => {
    setName(event.target.value);
  };
  return (
    <div className="inputWrapper">
      <TextField
        onChange={handleOnChange}
        id="standard-basic"
        label={props.label}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          return props.onSubmit(name);
        }}
      >
        Submit
      </Button>
    </div>
  );
};

InputName.propTypes;

export default InputName;
