import { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface EditInventoryModalProps {
  open: boolean;
  onClose: () => void;
  inventory: {
    id: string;
    name: string;
    date: Date;
    status: '40' | '50';
  };
  onSave: (updatedData: { date: Date; status: '40' | '50' }) => void;
}

const EditInventoryModal = ({ open, onClose, inventory, onSave }: EditInventoryModalProps) => {
  const [date, setDate] = useState<Date>(inventory.date);
  const [status, setStatus] = useState<'40' | '50'>(inventory.status);

  const handleSubmit = () => {
    onSave({ date, status });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 4,
        width: 400,
        borderRadius: 2
      }}>
        <Typography variant="h6" gutterBottom>
          Modifier l'inventaire: {inventory.name}
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date de l'inventaire"
            value={date}
            onChange={(newValue) => newValue && setDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
          />
        </LocalizationProvider>

        <TextField
          select
          fullWidth
          label="Statut"
          value={status}
          onChange={(e) => setStatus(e.target.value as '40' | '50')}
          sx={{ mb: 3 }}
        >
          <MenuItem value="40">En cours</MenuItem>
          <MenuItem value="50">Validé</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          color="primary"
        >
          Sauvegarder modifications
        </Button>
      </Box>
    </Modal>
  );
};

export default EditInventoryModal;