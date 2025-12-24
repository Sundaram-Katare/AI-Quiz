// filepath: d:\Visual Code\Full - 2\AI Quiz\frontend\src\App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import CreateQuiz from './components/CreateQuiz';
import PlayQuiz from './components/PlayQuiz';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally verify token, but for simplicity, assume valid
      setUser({}); // Set user object if needed
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({});
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      {user && <Navbar logout={logout} />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login login={login} />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup login={login} />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/create-quiz" element={user ? <CreateQuiz /> : <Navigate to="/login" />} />
        <Route path="/play-quiz/:id" element={user ? <PlayQuiz /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;