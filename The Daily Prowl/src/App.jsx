import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import Page6 from './Page6';
import Page8 from './Page8';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/third" element={<ThirdPage />} />
        <Route path="/sixth" element={<Page6 />} />
        <Route path="/eighth" element={<Page8 />} />
      </Routes>
    </Router>
  );
}

export default App;