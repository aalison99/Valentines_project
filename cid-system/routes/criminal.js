const express = require('express');
const router = express.Router();

// Get all criminals
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  
  db.query('SELECT * FROM Criminal', (err, results) => {
    if (err) {
      console.error('Error fetching criminals:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get a specific criminal
router.get('/:id', (req, res) => {
  const db = req.app.locals.db;
  const criminalId = req.params.id;
  
  db.query('SELECT * FROM Criminal WHERE CriminalID = ?', [criminalId], (err, results) => {
    if (err) {
      console.error('Error fetching criminal:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Criminal not found' });
    }
    
    res.json(results[0]);
  });
});

// Create a new criminal
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { CriminalID, Name, Age, Gender, Address, CrimeHistory } = req.body;
  
  if (!CriminalID || !Name || !Age || !Gender || !Address) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const criminal = { CriminalID, Name, Age, Gender, Address, CrimeHistory };
  
  db.query('INSERT INTO Criminal SET ?', criminal, (err, result) => {
    if (err) {
      console.error('Error creating criminal:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.status(201).json({ message: 'Criminal created successfully', id: CriminalID });
  });
});

// Update a criminal
router.put('/:id', (req, res) => {
  const db = req.app.locals.db;
  const criminalId = req.params.id;
  const { Name, Age, Gender, Address, CrimeHistory } = req.body;
  
  if (!Name || !Age || !Gender || !Address) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const criminal = { Name, Age, Gender, Address, CrimeHistory };
  
  db.query('UPDATE Criminal SET ? WHERE CriminalID = ?', [criminal, criminalId], (err, result) => {
    if (err) {
      console.error('Error updating criminal:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Criminal not found' });
    }
    
    res.json({ message: 'Criminal updated successfully' });
  });
});

// Delete a criminal
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  const criminalId = req.params.id;
  
  db.query('DELETE FROM Criminal WHERE CriminalID = ?', [criminalId], (err, result) => {
    if (err) {
      console.error('Error deleting criminal:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Criminal not found' });
    }
    
    res.json({ message: 'Criminal deleted successfully' });
  });
});

// Get criminal with crime records
router.get('/:id/crimes', (req, res) => {
  const db = req.app.locals.db;
  const criminalId = req.params.id;
  
  db.query(
    'SELECT c.*, cr.CrimeID, cr.CrimeType, cr.DateTime, cr.Location, cr.Description ' +
    'FROM Criminal c ' +
    'JOIN CrimeRecord cr ON c.CriminalID = cr.CriminalID ' +
    'WHERE c.CriminalID = ?',
    [criminalId],
    (err, results) => {
      if (err) {
        console.error('Error fetching criminal with crimes:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ error: 'Criminal not found or has no crime records' });
      }
      
      res.json(results);
    }
  );
});

module.exports = router;