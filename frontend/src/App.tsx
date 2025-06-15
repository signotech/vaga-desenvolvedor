import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import JobsList from './pages/jobs/JobsList';
import JobsForm from './pages/jobs/JobsForm';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">
              <Link to="/">JobBoard</Link>
            </h1>

            <nav className="space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>

              <Link
                to="/jobs"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Vagas
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/jobs/new" element={<JobsForm />} />
            <Route path="/jobs/:jobId/edit" element={<JobsForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
