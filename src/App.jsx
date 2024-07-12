// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CountryProvider } from './CountryContext';
import BorderDetails from './BorderDetails';

import './App.css';

import Countries from './Country'; // Assuming this component exists for other routes

function App() {
  return (
    <Router>
      <CountryProvider>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/border/:code" element={<BorderDetails />} />
        </Routes>
      </CountryProvider>
    </Router>
  );
}

export default App;
