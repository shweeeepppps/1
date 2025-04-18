import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { Logout, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Utilisateur';
  const role = localStorage.getItem('role') || 'user';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main', mb: 4 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          🏭 Gestion des Inventaires
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <Person />
          </Avatar>
          <Box>
            <Typography variant="subtitle1">{username}</Typography>
            <Typography variant="caption">
              ({role === 'admin' ? 'Administrateur' : 'Agent'})
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ ml: 2 }}
          >
            Déconnexion
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;