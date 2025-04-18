import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Home from './pages/Home';
import InventoryPage from './pages/InventoryPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        
        <Route path="/inventory/:id" element={
          <PrivateRoute>
            <InventoryPage />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
};

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Router>
      <AppWrapper />
    </Router>
  </LocalizationProvider>
);

export default App;