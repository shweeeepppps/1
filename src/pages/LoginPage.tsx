import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';
import { Lock, Person } from '@mui/icons-material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'admin2024') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', 'Administrateur');
      localStorage.setItem('role', 'admin');
      navigate('/');
    } else if (username === 'agent' && password === 'depot2024') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', 'Agent Dépôt');
      localStorage.setItem('role', 'user');
      navigate('/');
    } else {
      setError('Identifiants incorrects');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(45deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Paper elevation={6} sx={{ p: 4, width: 350, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Lock sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h5" sx={{ mt: 1 }}>
            Connexion Dépôt
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Identifiant"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }}
            required
          />

          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ startAdornment: <Lock sx={{ mr: 1 }} /> }}
            required
          />

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, py: 1.5 }}
          >
            Se connecter
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;