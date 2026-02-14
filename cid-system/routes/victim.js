const express = require('express');
const router = express.Router();

// Get all victims
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  
  db.query('SELECT * FROM Victim', (err, results) => {
    if (err) {
      console.error('Error fetching victims:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get a specific victim
router.get('/:id', (req, res) => {
  const db = req.app.locals.db;
  const victimId = req.params.id;
  
  db.query('SELECT * FROM Victim WHERE VictimID = ?', [victimId], (err, results) => {
    if (err) {
      console.error('Error fetching victim:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Victim not found' });
    }
    
    res.json(results[0]);
  });
});

// Create a new victim
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { VictimID, Name, Age, ContactNumber, Address, CrimeID } = req.body;
  
  if (!VictimID || !Name || !Age || !Address || !CrimeID) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const victim = { VictimID, Name, Age, ContactNumber, Address, CrimeID };
  
  db.query('INSERT INTO Victim SET ?', victim, (err, result) => {
    if (err) {
      console.error('Error creating victim:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.status(201).json({ message: 'Victim created successfully', id: VictimID });
  });
});

// Update a victim
router.put('/:id', (req, res) => {
  const db = req.app.locals.db;
  const victimId = req.params.id;
  const { Name, Age, ContactNumber, Address, CrimeID } = req.body;
  
  if (!Name || !Age || !Address || !CrimeID) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const victim = { Name, Age, ContactNumber, Address, CrimeID };
  
  db.query('UPDATE Victim SET ? WHERE VictimID = ?', [victim, victimId], (err, result) => {
    if (err) {
      console.error('Error updating victim:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Victim not found' });
    }
    
    res.json({ message: 'Victim updated successfully' });
  });
});

// Delete a victim
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  const victimId = req.params.id;
  
  db.query('DELETE FROM Victim WHERE VictimID = ?', [victimId], (err, result) => {
    if (err) {
      console.error('Error deleting victim:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Victim not found' });
    }
    
    res.json({ message: 'Victim deleted successfully' });
  });
});

// Get victims by crime ID
router.get('/crime/:crimeId', (req, res) => {
  const db = req.app.locals.db;
  const crimeId = req.params.crimeId;
  
  db.query('SELECT * FROM Victim WHERE CrimeID = ?', [crimeId], (err, results) => {
    if (err) {
      console.error('Error fetching victims by crime ID:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json(results);
  });
});

module.exports = router;