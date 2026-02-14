const express = require('express');
const router = express.Router();

// Get all police officers
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  
  db.query('SELECT * FROM PoliceOfficer', (err, results) => {
    if (err) {
      console.error('Error fetching police officers:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get a specific police officer
router.get('/:id', (req, res) => {
  const db = req.app.locals.db;
  const officerId = req.params.id;
  
  db.query('SELECT * FROM PoliceOfficer WHERE OfficerID = ?', [officerId], (err, results) => {
    if (err) {
      console.error('Error fetching police officer:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Police officer not found' });
    }
    
    res.json(results[0]);
  });
});

// Create a new police officer
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { OfficerID, Name, Ranks, Department, ContactNumber } = req.body;
  
  if (!OfficerID || !Name || !Ranks || !Department || !ContactNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const officer = { OfficerID, Name, Ranks, Department, ContactNumber };
  
  db.query('INSERT INTO PoliceOfficer SET ?', officer, (err, result) => {
    if (err) {
      console.error('Error creating police officer:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.status(201).json({ message: 'Police officer created successfully', id: OfficerID });
  });
});

// Update a police officer
router.put('/:id', (req, res) => {
  const db = req.app.locals.db;
  const officerId = req.params.id;
  const { Name, Ranks, Department, ContactNumber } = req.body;
  
  if (!Name || !Ranks || !Department || !ContactNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const officer = { Name, Ranks, Department, ContactNumber };
  
  db.query('UPDATE PoliceOfficer SET ? WHERE OfficerID = ?', [officer, officerId], (err, result) => {
    if (err) {
      console.error('Error updating police officer:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Police officer not found' });
    }
    
    res.json({ message: 'Police officer updated successfully' });
  });
});

// Delete a police officer
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  const officerId = req.params.id;
  
  db.query('DELETE FROM PoliceOfficer WHERE OfficerID = ?', [officerId], (err, result) => {
    if (err) {
      console.error('Error deleting police officer:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Police officer not found' });
    }
    
    res.json({ message: 'Police officer deleted successfully' });
  });
});

module.exports = router;