import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import Questions from './pages/Questions';
import FinalPage from './pages/FinalPage';
import {Container} from '@mui/material';
import {Box} from '@mui/material';

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
        <Routes>
        <Route path="/" element={<Settings />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/score" element={<FinalPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
        </Box>
      
      </Container>
    </Router>
  );
}

export default App;
