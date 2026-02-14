const express = require('express');
const router = express.Router();

// Get all witnesses
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  
  db.query('SELECT * FROM Witness', (err, results) => {
    if (err) {
      console.error('Error fetching witnesses:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get a specific witness
router.get('/:id', (req, res) => {
  const db = req.app.locals.db;
  const witnessId = req.params.id;
  
  db.query('SELECT * FROM Witness WHERE WitnessID = ?', [witnessId], (err, results) => {
    if (err) {
      console.error('Error fetching witness:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Witness not found' });
    }
    
    res.json(results[0]);
  });
});

// Create a new witness
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { WitnessID, Name, ContactNumber, Statement, CrimeID } = req.body;
  
  if (!WitnessID || !Name || !Statement || !CrimeID) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const witness = { WitnessID, Name, ContactNumber, Statement, CrimeID };
  
  db.query('INSERT INTO Witness SET ?', witness, (err, result) => {
    if (err) {
      console.error('Error creating witness:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.status(201).json({ message: 'Witness created successfully', id: WitnessID });
  });
});

// Update a witness
router.put('/:id', (req, res) => {
  const db = req.app.locals.db;
  const witnessId = req.params.id;
  const { Name, ContactNumber, Statement, CrimeID } = req.body;
  
  if (!Name || !Statement || !CrimeID) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const witness = { Name, ContactNumber, Statement, CrimeID };
  
  db.query('UPDATE Witness SET ? WHERE WitnessID = ?', [witness, witnessId], (err, result) => {
    if (err) {
      console.error('Error updating witness:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Witness not found' });
    }
    
    res.json({ message: 'Witness updated successfully' });
  });
});

// Delete a witness
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  const witnessId = req.params.id;
  
  db.query('DELETE FROM Witness WHERE WitnessID = ?', [witnessId], (err, result) => {
    if (err) {
      console.error('Error deleting witness:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Witness not found' });
    }
    
    res.json({ message: 'Witness deleted successfully' });
  });
});

// Get witnesses by crime ID
router.get('/crime/:crimeId', (req, res) => {
  const db = req.app.locals.db;
  const crimeId = req.params.crimeId;
  
  db.query('SELECT * FROM Witness WHERE CrimeID = ?', [crimeId], (err, results) => {
    if (err) {
      console.error('Error fetching witnesses by crime ID:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json(results);
  });
});

module.exports = router;