import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import Page5 from './Page5';
import Page6 from './Page6';
import Page8 from './Page8';
import EventsPage from './EventsPage';
import EventDetailPage from './EventDetailPage';
import Page7 from './Page7';

import SecPage from './SecurityPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/third" element={<ThirdPage />} />
        <Route path="/fifth" element={<Page5 />} />
        <Route path="/sixth" element={<Page6 />} />
        <Route path="/eighth" element={<Page8 />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/seventh" element={<Page7 />} />
        <Route path="/priv" element={<SecPage/>} />
      </Routes>
    </Router>
  );
}

export default App;