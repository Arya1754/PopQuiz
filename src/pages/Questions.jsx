import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { decode } from 'html-entities';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { handleScoreChange } from '../redux/actions';

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const Questions = () => {
  const { 
    question_category, 
    question_difficulty, 
    question_type, 
    amount_of_question, 
    score 
  } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) apiUrl += `&category=${question_category}`;
  if (question_difficulty) apiUrl += `&difficulty=${question_difficulty}`;
  if (question_type) apiUrl += `&type=${question_type}`;

  const { response, loading, error } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      const answers = [...question.incorrect_answers];
      answers.splice(getRandomInt(question.incorrect_answers.length + 1), 0, question.correct_answer);
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={20} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error || response?.results.length === 0) {
    return (
      <Box mt={20} display="flex" justifyContent="center">
        <Typography variant="h6" color="error">
          {error || 'No questions available. Please try again later.'}
        </Typography>
      </Box>
    );
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate('/score');
    }
  };

  return (
    <Box
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
      <Typography variant="h4" fontWeight="bold" mb={3} color="#6a1b9a">
        Question {questionIndex + 1}
      </Typography>
      <Typography variant="h6" mb={3}>
        {decode(response.results[questionIndex].question)}
      </Typography>
      {options.map((data, id) => (
        <Box mt={2} key={id} sx={{ width: '100%' }}>
          <Button
            onClick={handleClickAnswer}
            variant="contained"
            fullWidth
            sx={{
              background: 'linear-gradient(45deg, #6a1b9a, #00bcd4)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              textTransform: 'uppercase',
              borderRadius: '8px',
              '&:hover': {
                background: 'linear-gradient(45deg, #a28bdf, #81d4fa)',
                color: 'black'
              }
            }}
          >
            {decode(data)}
          </Button>
        </Box>
      ))}
      <Box mt={5}>
        <Typography variant="h5" color="#00bcd4">
          Score: {score} / {response.results.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default Questions;
