const express = require('express');
const router = express.Router();

// Get all court cases
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  
  db.query('SELECT * FROM CourtCase', (err, results) => {
    if (err) {
      console.error('Error fetching court cases:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get a specific court case
router.get('/:id', (req, res) => {
  const db = req.app.locals.db;
  const caseId = req.params.id;
  
  db.query('SELECT * FROM CourtCase WHERE CaseID = ?', [caseId], (err, results) => {
    if (err) {
      console.error('Error fetching court case:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Court case not found' });
    }
    
    res.json(results[0]);
  });
});

// Create a new court case
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { CaseID, CrimeID, CaseStatus, LawyerName, HearingDate } = req.body;
  
  if (!CaseID || !CrimeID || !CaseStatus || !LawyerName || !HearingDate) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const courtCase = { CaseID, CrimeID, CaseStatus, LawyerName, HearingDate };
  
  db.query('INSERT INTO CourtCase SET ?', courtCase, (err, result) => {
    if (err) {
      console.error('Error creating court case:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.status(201).json({ message: 'Court case created successfully', id: CaseID });
  });
});

// Update a court case
router.put('/:id', (req, res) => {
  const db = req.app.locals.db;
  const caseId = req.params.id;
  const { CrimeID, CaseStatus, LawyerName, HearingDate } = req.body;
  
  if (!CrimeID || !CaseStatus || !LawyerName || !HearingDate) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const courtCase = { CrimeID, CaseStatus, LawyerName, HearingDate };
  
  db.query('UPDATE CourtCase SET ? WHERE CaseID = ?', [courtCase, caseId], (err, result) => {
    if (err) {
      console.error('Error updating court case:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Court case not found' });
    }
    
    res.json({ message: 'Court case updated successfully' });
  });
});

// Delete a court case
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  const caseId = req.params.id;
  
  db.query('DELETE FROM CourtCase WHERE CaseID = ?', [caseId], (err, result) => {
    if (err) {
      console.error('Error deleting court case:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Court case not found' });
    }
    
    res.json({ message: 'Court case deleted successfully' });
  });
});

// Get court cases by crime ID
router.get('/crime/:crimeId', (req, res) => {
  const db = req.app.locals.db;
  const crimeId = req.params.crimeId;
  
  db.query('SELECT * FROM CourtCase WHERE CrimeID = ?', [crimeId], (err, results) => {
    if (err) {
      console.error('Error fetching court cases by crime ID:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json(results);
  });
});

// Get court case with related information
router.get('/:id/details', (req, res) => {
  const db = req.app.locals.db;
  const caseId = req.params.id;
  
  db.query(
    'SELECT cc.*, cr.CrimeType, cr.DateTime as CrimeDateTime, cr.Location as CrimeLocation, ' +
    'c.Name as CriminalName, c.CriminalID ' +
    'FROM CourtCase cc ' +
    'JOIN CrimeRecord cr ON cc.CrimeID = cr.CrimeID ' +
    'JOIN Criminal c ON cr.CriminalID = c.CriminalID ' +
    'WHERE cc.CaseID = ?',
    [caseId],
    (err, results) => {
      if (err) {
        console.error('Error fetching court case details:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ error: 'Court case not found' });
      }
      
      res.json(results[0]);
    }
  );
});

module.exports = router;