import React from 'react'
import {Box,Button, CircularProgress, Typography} from '@mui/material'
import SelectField from '../compoents/SelectField'
import TextFieldComp from '../compoents/TextFieldComp'
import useAxios from '../hooks/useAxios'
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { response, error, isLoading } = useAxios({ url: "/api_category.php" });
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box mt={20} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h5" mt={20} color="error">
        Something Went Wrong!
      </Typography>
    );
  }

  const categories = response && response.trivia_categories ? response.trivia_categories : [];

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" }
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True/False" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/questions');
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        mx: 'auto',
        maxWidth: '600px',
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        mb={3} 
        color="#6a1b9a"
      >
        Quiz App
      </Typography>
      <SelectField options={categories} label="Category" />
      <SelectField options={difficultyOptions} label="Difficulty" />
      <SelectField options={typeOptions} label="Type" />
      <TextFieldComp />
      <Box mt={3} width="100%">
        <Button 
          fullWidth 
          variant="contained" 
          type="submit" 
          sx={{
            background: 'linear-gradient(45deg, #6a1b9a, #00bcd4)', 
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            textTransform: 'uppercase',
            borderRadius: '8px',
            '&:hover': {
              background: 'linear-gradient(45deg, #a28bdf, #81d4fa)',
              color: 'darkblue'
            }
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;

