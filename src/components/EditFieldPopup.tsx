// src/components/EditFieldPopup.tsx

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface EditFieldPopupProps {
  open: boolean;
  fieldLabel: string;
  initialValue: string | number;
  onClose: () => void;
  onSave: (newValue: string | number) => void;
}

const EditFieldPopup: React.FC<EditFieldPopupProps> = ({ open, fieldLabel, initialValue, onClose, onSave }) => {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit {fieldLabel}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label={fieldLabel}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={typeof initialValue === 'number' ? 'number' : 'text'}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFieldPopup;
