import { useState } from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material';
import { Link } from 'react-router-dom';
import EditFieldPopup from '../components/EditFieldPopup';

interface Article {
  id: string;
  code: string;
  designation: string;
  palette: number;
  casier: number;
  unit: number;
}

type EditableField = 'code' | 'designation' | 'palette' | 'casier' | 'unit';

const InventoryPage = () => {
  const [articles, setArticles] = useState<Article[]>([
    { id: '1', code: 'ART-001', designation: 'Article 1', palette: 10, casier: 5, unit: 3 },
  ]);

  const [editPopup, setEditPopup] = useState<{
    article: Article;
    field: EditableField;
  } | null>(null);

  const handleSaveField = (newValue: string | number) => {
    if (!editPopup) return;

    const updated = articles.map(article =>
      article.id === editPopup.article.id
        ? { ...article, [editPopup.field]: typeof article[editPopup.field] === 'number' ? Number(newValue) : newValue }
        : article
    );
    setArticles(updated);
    setEditPopup(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Saisie des quantités</Typography>
      <Link to="/" style={{ marginBottom: 20, display: 'block' }}>
        <Button variant="outlined">Retour</Button>
      </Link>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code article</TableCell>
            <TableCell>Désignation</TableCell>
            <TableCell>Palette</TableCell>
            <TableCell>Casier</TableCell>
            <TableCell>Unité</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <Button variant="text" onClick={() => setEditPopup({ article, field: 'code' })}>
                  {article.code}
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="text" onClick={() => setEditPopup({ article, field: 'designation' })}>
                  {article.designation}
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => setEditPopup({ article, field: 'palette' })}>
                  {article.palette}
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => setEditPopup({ article, field: 'casier' })}>
                  {article.casier}
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => setEditPopup({ article, field: 'unit' })}>
                  {article.unit}
                </Button>
              </TableCell>
              <TableCell>{article.palette + article.casier + article.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editPopup && (
        <EditFieldPopup
          open={!!editPopup}
          fieldLabel={editPopup.field}
          initialValue={editPopup.article[editPopup.field]}
          onClose={() => setEditPopup(null)}
          onSave={handleSaveField}
        />
      )}
    </div>
  );
};

export default InventoryPage;
