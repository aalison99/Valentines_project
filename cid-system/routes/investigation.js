const express = require('express');
const router = express.Router();

// Get all investigations
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  
  db.query('SELECT * FROM Investigation', (err, results) => {
    if (err) {
      console.error('Error fetching investigations:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get a specific investigation
router.get('/:id', (req, res) => {
  const db = req.app.locals.db;
  const investigationId = req.params.id;
  
  db.query('SELECT * FROM Investigation WHERE InvestigationID = ?', [investigationId], (err, results) => {
    if (err) {
      console.error('Error fetching investigation:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Investigation not found' });
    }
    
    res.json(results[0]);
  });
});

// Create a new investigation
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { InvestigationID, CrimeID, OfficerID, InvestigationStatus, EvidenceDetails } = req.body;
  
  if (!InvestigationID || !CrimeID || !OfficerID || !InvestigationStatus) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const investigation = { InvestigationID, CrimeID, OfficerID, InvestigationStatus, EvidenceDetails };
  
  db.query('INSERT INTO Investigation SET ?', investigation, (err, result) => {
    if (err) {
      console.error('Error creating investigation:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.status(201).json({ message: 'Investigation created successfully', id: InvestigationID });
  });
});

// Update an investigation
router.put('/:id', (req, res) => {
  const db = req.app.locals.db;
  const investigationId = req.params.id;
  const { CrimeID, OfficerID, InvestigationStatus, EvidenceDetails } = req.body;
  
  if (!CrimeID || !OfficerID || !InvestigationStatus) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const investigation = { CrimeID, OfficerID, InvestigationStatus, EvidenceDetails };
  
  db.query('UPDATE Investigation SET ? WHERE InvestigationID = ?', [investigation, investigationId], (err, result) => {
    if (err) {
      console.error('Error updating investigation:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Investigation not found' });
    }
    
    res.json({ message: 'Investigation updated successfully' });
  });
});

// Delete an investigation
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  const investigationId = req.params.id;
  
  db.query('DELETE FROM Investigation WHERE InvestigationID = ?', [investigationId], (err, result) => {
    if (err) {
      console.error('Error deleting investigation:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Investigation not found' });
    }
    
    res.json({ message: 'Investigation deleted successfully' });
  });
});

// Get investigations by crime ID
router.get('/crime/:crimeId', (req, res) => {
  const db = req.app.locals.db;
  const crimeId = req.params.crimeId;
  
  db.query('SELECT * FROM Investigation WHERE CrimeID = ?', [crimeId], (err, results) => {
    if (err) {
      console.error('Error fetching investigations by crime ID:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json(results);
  });
});

// Get investigations by officer ID
router.get('/officer/:officerId', (req, res) => {
  const db = req.app.locals.db;
  const officerId = req.params.officerId;
  
  db.query('SELECT * FROM Investigation WHERE OfficerID = ?', [officerId], (err, results) => {
    if (err) {
      console.error('Error fetching investigations by officer ID:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json(results);
  });
});

// Get investigation with related information
router.get('/:id/details', (req, res) => {
  const db = req.app.locals.db;
  const investigationId = req.params.id;
  
  db.query(
    'SELECT i.*, cr.CrimeType, cr.DateTime as CrimeDateTime, cr.Location as CrimeLocation, ' +
    'po.Name as OfficerName, po.Ranks as OfficerRank, po.Department as OfficerDepartment ' +
    'FROM Investigation i ' +
    'JOIN CrimeRecord cr ON i.CrimeID = cr.CrimeID ' +
    'JOIN PoliceOfficer po ON i.OfficerID = po.OfficerID ' +
    'WHERE i.InvestigationID = ?',
    [investigationId],
    (err, results) => {
      if (err) {
        console.error('Error fetching investigation details:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ error: 'Investigation not found' });
      }
      
      res.json(results[0]);
    }
  );
});

module.exports = router;