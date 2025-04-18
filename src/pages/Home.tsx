import { useEffect, useState } from 'react';
import { Table, Button, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import EditInventoryModal from '../components/EditInventoryModal';

interface Inventory {
  id: string;
  name: string;
  date: Date;
  status: '40' | '50';
}

const Home = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const isAdmin = localStorage.getItem('role') === 'admin';

  useEffect(() => {
    // Données mockées - Remplacer par API
    setInventories([
      { 
        id: '1', 
        name: 'Inventaire Mars', 
        date: new Date('2024-03-01'), 
        status: '50' 
      },
      { 
        id: '2', 
        name: 'Inventaire Avril', 
        date: new Date('2024-04-01'), 
        status: '40' 
      }
    ]);
  }, []);

  const handleSave = (updatedData: { date: Date; status: '40' | '50' }) => {
    if (!selectedInventory) return;
    
    setInventories(prev => prev.map(inv => 
      inv.id === selectedInventory.id 
        ? { ...inv, ...updatedData } 
        : inv
    ));
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Inventaires en cours
      </Typography>

      <Table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Action</th>
            {isAdmin && <th>Modification</th>}
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory.id}>
              <td>{inventory.name}</td>
              <td>{inventory.date.toLocaleDateString()}</td>
              <td>{inventory.status === '40' ? '🟡 En cours' : '🟢 Validé'}</td>
              <td>
                <Button
                  component={Link}
                  to={`/inventory/${inventory.id}`}
                  variant="contained"
                  color="primary"
                >
                  Ouvrir
                </Button>
              </td>
              {isAdmin && (
                <td>
                  <IconButton 
                    onClick={() => {
                      setSelectedInventory(inventory);
                      setEditModalOpen(true);
                    }}
                  >
                    <EditIcon color="action" />
                  </IconButton>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedInventory && (
        <EditInventoryModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          inventory={selectedInventory}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Home;