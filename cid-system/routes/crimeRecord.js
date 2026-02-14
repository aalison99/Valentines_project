const express = require('express');
const router = express.Router();

// Get all crime records
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  
  db.query('SELECT * FROM CrimeRecord', (err, results) => {
    if (err) {
      console.error('Error fetching crime records:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Get a specific crime record
router.get('/:id', (req, res) => {
  const db = req.app.locals.db;
  const crimeId = req.params.id;
  
  db.query('SELECT * FROM CrimeRecord WHERE CrimeID = ?', [crimeId], (err, results) => {
    if (err) {
      console.error('Error fetching crime record:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Crime record not found' });
    }
    
    res.json(results[0]);
  });
});

// Create a new crime record
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { CrimeID, CrimeType, DateTime, Location, Description, CriminalID } = req.body;
  
  if (!CrimeID || !CrimeType || !DateTime || !Location || !CriminalID) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const crimeRecord = { CrimeID, CrimeType, DateTime, Location, Description, CriminalID };
  
  db.query('INSERT INTO CrimeRecord SET ?', crimeRecord, (err, result) => {
    if (err) {
      console.error('Error creating crime record:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.status(201).json({ message: 'Crime record created successfully', id: CrimeID });
  });
});

// Update a crime record
router.put('/:id', (req, res) => {
  const db = req.app.locals.db;
  const crimeId = req.params.id;
  const { CrimeType, DateTime, Location, Description, CriminalID } = req.body;
  
  if (!CrimeType || !DateTime || !Location || !CriminalID) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }
  
  const crimeRecord = { CrimeType, DateTime, Location, Description, CriminalID };
  
  db.query('UPDATE CrimeRecord SET ? WHERE CrimeID = ?', [crimeRecord, crimeId], (err, result) => {
    if (err) {
      console.error('Error updating crime record:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Crime record not found' });
    }
    
    res.json({ message: 'Crime record updated successfully' });
  });
});

// Delete a crime record
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  const crimeId = req.params.id;
  
  db.query('DELETE FROM CrimeRecord WHERE CrimeID = ?', [crimeId], (err, result) => {
    if (err) {
      console.error('Error deleting crime record:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Crime record not found' });
    }
    
    res.json({ message: 'Crime record deleted successfully' });
  });
});

// Get crime record with all related information
router.get('/:id/details', (req, res) => {
  const db = req.app.locals.db;
  const crimeId = req.params.id;
  
  db.query(
    'SELECT cr.*, c.Name as CriminalName, c.Age as CriminalAge, c.Gender as CriminalGender, ' +
    'v.VictimID, v.Name as VictimName, v.Age as VictimAge, v.ContactNumber as VictimContact, ' +
    'w.WitnessID, w.Name as WitnessName, w.Statement, ' +
    'i.InvestigationID, i.InvestigationStatus, i.EvidenceDetails, ' +
    'cc.CaseID, cc.CaseStatus, cc.LawyerName, cc.HearingDate ' +
    'FROM CrimeRecord cr ' +
    'LEFT JOIN Criminal c ON cr.CriminalID = c.CriminalID ' +
    'LEFT JOIN Victim v ON cr.CrimeID = v.CrimeID ' +
    'LEFT JOIN Witness w ON cr.CrimeID = w.CrimeID ' +
    'LEFT JOIN Investigation i ON cr.CrimeID = i.CrimeID ' +
    'LEFT JOIN CourtCase cc ON cr.CrimeID = cc.CrimeID ' +
    'WHERE cr.CrimeID = ?',
    [crimeId],
    (err, results) => {
      if (err) {
        console.error('Error fetching crime details:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ error: 'Crime record not found' });
      }
      
      res.json(results);
    }
  );
});

module.exports = router;