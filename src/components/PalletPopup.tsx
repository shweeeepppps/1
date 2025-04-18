import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';

interface Props {
  article: {
    id: string;
    code: string;
    palette: number;
  };
  onClose: () => void;
  onSave: (qty: number) => void;
}

const PalletPopup = ({ article, onClose, onSave }: Props) => {
  const [qty, setQty] = useState(article.palette);

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 4,
        width: 400
      }}>
        <Typography variant="h6">
          Modification palette pour {article.code}
        </Typography>
        
        <TextField
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        
        <Button 
          variant="contained" 
          onClick={() => onSave(qty)}
          sx={{ mt: 2 }}
        >
          Enregistrer
        </Button>
      </Box>
    </Modal>
  );
};

export default PalletPopup;