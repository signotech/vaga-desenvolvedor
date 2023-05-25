import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import VagasPage from './pages/Vagas';
import CandidaturasPage from './pages/Candidaturas';
import Login from './pages/Login';

const App: React.FC = () => {
  const menuItems = [
    { label: 'Vagas', route: '/vagas' },
    { label: 'Candidaturas', route: '/candidaturas' },
  ];

  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <div>
        {isAuthenticated && <Nav menuItems={menuItems} />}
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/vagas" replace />} />
              <Route path="/vagas" element={<VagasPage />} />
              <Route path="/candidaturas" element={<CandidaturasPage />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
