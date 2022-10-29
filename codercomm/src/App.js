import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Router/>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
