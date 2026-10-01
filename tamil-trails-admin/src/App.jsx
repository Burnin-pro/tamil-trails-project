import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [auth, setAuth] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });

  const handleSetAuth = (status) => {
    setAuth(status);
    if (status) {
      localStorage.setItem('adminAuth', 'true');
    } else {
      localStorage.removeItem('adminAuth');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={!auth ? <Login setAuth={handleSetAuth} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard auth={auth} setAuth={handleSetAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
