import { Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAmountChange, handleScoreChange } from '../redux/actions';

import HomeIcon from '@mui/icons-material/Home';


const FinalScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { score } = useSelector((state) => state);

  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(50));
    navigate('/');
  };

  return (
    <Box
      className="final-screen-box" // Add class
    >
      <Typography 
        variant="h3" 
        fontWeight="bold" 
        mb={3}
        className="final-screen-title" 
      >
        Final Score: <span className="final-screen-score">{score}</span>
      </Typography>
      <Button
        onClick={handleBackToSettings}
        variant="contained"
        className="final-screen-button"
        startIcon={<HomeIcon />}
      >
      </Button>
    </Box>
  );
};

export default FinalScreen;
