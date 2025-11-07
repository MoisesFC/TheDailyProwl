import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SecondPage from './SecondPage';
import Page6 from './Page6';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/sixth" element={<Page6 />} />
      </Routes>
    </Router>
  );
}

export default App;