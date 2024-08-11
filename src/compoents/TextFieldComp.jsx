import React from 'react'
import {Box,FormControl,TextField} from '@mui/material'
import { handleAmountChange } from "../redux/actions";
import { useDispatch } from "react-redux";

const TextFieldComp = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(handleAmountChange(event.target.value));
  };

  return (
    <Box mt={3} width="100%">
      <FormControl fullWidth size='small'>
        <TextField onChange={handleChange}
        variant="outlined"
        label="Amount of Questions"
        type="number"
        size="small"
        inputProps={{ min: 1 }}
        sx={{
          '& input': {
            textAlign: 'center', 
          },
        }}/>
      </FormControl>
    </Box>
  )
}

export default TextFieldComp
