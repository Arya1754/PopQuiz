import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { handleCategoryChange, handleDifficultyChange, handleTypeChange } from '../redux/actions'; 

const SelectField = (props) => {
  const { label,options } = props;
  const [value, setValue] = useState("");
  const dispatch=useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
    switch(label){
        case "Category":
            dispatch(handleCategoryChange(event.target.value))
            break;
        case "Difficulty":
            dispatch(handleDifficultyChange(event.target.value))
            break;
        case "Type":
            dispatch(handleTypeChange(event.target.value))
            break;
        default:
            return;
  }
};

  return (
    <Box mt={3} width="100%">
      <FormControl size='small' fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}
        >
          {options.map(({id,name}) =>(
            <MenuItem value={id} key={id}>
                {name}
            </MenuItem>))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectField;
