/**
 * Mock Database Service for CID System
 * 
 * This module provides in-memory database functionality for the CID system
 * when a real MySQL connection is not available.
 * 
 * USAGE:
 * 1. Import this module instead of mysql2
 * 2. Use the provided methods to interact with the mock database
 */

// In-memory database tables
const db = {
  PoliceOfficer: [
    { OfficerID: 'PO101', Name: 'Raj Verma', Ranks: 'Inspector', Department: 'Homicide', ContactNumber: '9876543210' },
    { OfficerID: 'PO102', Name: 'Asha Mehta', Ranks: 'Sub-Inspector', Department: 'Cyber Crime', ContactNumber: '9823456781' },
    { OfficerID: 'PO103', Name: 'Ravi Kumar', Ranks: 'Head Constable', Department: 'Traffic', ContactNumber: '9812234567' }
  ],
  Criminal: [
    { CriminalID: 'CR201', Name: 'Vikram Singh', Age: 32, Gender: 'Male', Address: 'Delhi', CrimeHistory: 'Robbery, Assault' },
    { CriminalID: 'CR202', Name: 'Meena Kumari', Age: 28, Gender: 'Female', Address: 'Mumbai', CrimeHistory: 'Fraud' }
  ],
  CrimeRecord: [
    { CrimeID: 'C301', CrimeType: 'Robbery', DateTime: '2024-09-12 14:00:00', Location: 'Sector 21, Noida', Description: 'Armed robbery at bank', CriminalID: 'CR201' },
    { CrimeID: 'C302', CrimeType: 'Fraud', DateTime: '2024-10-05 11:30:00', Location: 'Bandra, Mumbai', Description: 'Online transaction fraud', CriminalID: 'CR202' }
  ],
  Victim: [
    { VictimID: 'V401', Name: 'Karan Malhotra', Age: 40, ContactNumber: '9999999999', Address: 'Noida', CrimeID: 'C301' },
    { VictimID: 'V402', Name: 'Sneha Rao', Age: 35, ContactNumber: '8888888888', Address: 'Mumbai', CrimeID: 'C302' }
  ],
  Witness: [
    { WitnessID: 'W501', Name: 'Anil Kapoor', ContactNumber: '7777777777', Statement: 'Saw the robber flee in a black car.', CrimeID: 'C301' },
    { WitnessID: 'W502', Name: 'Priya Sharma', ContactNumber: '6666666666', Statement: 'Reported the fraudulent message.', CrimeID: 'C302' }
  ],
  Investigation: [
    { InvestigationID: 'I601', CrimeID: 'C301', OfficerID: 'PO101', InvestigationStatus: 'Ongoing', EvidenceDetails: 'Fingerprints, CCTV footage' },
    { InvestigationID: 'I602', CrimeID: 'C302', OfficerID: 'PO102', InvestigationStatus: 'Closed', EvidenceDetails: 'Digital forensics report' }
  ],
  CourtCase: [
    { CaseID: 'CC701', CrimeID: 'C301', CaseStatus: 'Pending', LawyerName: 'Adv. Suresh Nair', HearingDate: '2025-06-12' },
    { CaseID: 'CC702', CrimeID: 'C302', CaseStatus: 'Closed', LawyerName: 'Adv. Reema Shah', HearingDate: '2024-12-20' }
  ]
};

// Mock query function
function query(sql, params, callback) {
  // Simple SQL parsing to determine the operation and table
  const sqlLower = sql.toLowerCase();
  let results = [];
  let error = null;
  
  try {
    // SELECT operation
    if (sqlLower.startsWith('select')) {
      // Extract table name
      let tableName = '';
      if (sqlLower.includes('from')) {
        const fromIndex = sqlLower.indexOf('from') + 5;
        const whereIndex = sqlLower.indexOf('where');
        const endIndex = whereIndex > -1 ? whereIndex : sqlLower.length;
        tableName = sql.substring(fromIndex, endIndex).trim().split(' ')[0];
      }
      
      // Handle WHERE clause for ID lookups
      if (params && params.length > 0 && sqlLower.includes('where') && sqlLower.includes('=')) {
        const idField = Object.keys(db[tableName][0])[0]; // Assume first field is ID
        results = db[tableName].filter(item => item[idField] === params[0]);
      } else {
        results = [...db[tableName]];
      }
    }
    // INSERT operation
    else if (sqlLower.startsWith('insert')) {
      const tableName = sqlLower.split('into')[1].split('set')[0].trim();
      const newItem = params;
      db[tableName].push(newItem);
      results = { affectedRows: 1, insertId: newItem.id };
    }
    // UPDATE operation
    else if (sqlLower.startsWith('update')) {
      const tableName = sqlLower.split('update')[1].split('set')[0].trim();
      const idField = Object.keys(db[tableName][0])[0]; // Assume first field is ID
      const id = params[1];
      const updateData = params[0];
      
      const index = db[tableName].findIndex(item => item[idField] === id);
      if (index !== -1) {
        db[tableName][index] = { ...db[tableName][index], ...updateData };
        results = { affectedRows: 1 };
      } else {
        results = { affectedRows: 0 };
      }
    }
    // DELETE operation
    else if (sqlLower.startsWith('delete')) {
      const tableName = sqlLower.split('from')[1].split('where')[0].trim();
      const idField = Object.keys(db[tableName][0])[0]; // Assume first field is ID
      const id = params[0];
      
      const initialLength = db[tableName].length;
      db[tableName] = db[tableName].filter(item => item[idField] !== id);
      results = { affectedRows: initialLength - db[tableName].length };
    }
  } catch (err) {
    error = err;
    console.error('Mock DB Error:', err);
  }
  
  if (callback) {
    callback(error, results);
  }
  
  return { results, error };
}

// Mock connection object
const mockConnection = {
  connect: (callback) => {
    console.log('Connected to mock database');
    if (callback) callback(null);
    return mockConnection;
  },
  query,
  end: () => {
    console.log('Mock database connection closed');
    return mockConnection;
  }
};

// Mock createConnection function
function createConnection() {
  return mockConnection;
}

module.exports = {
  createConnection,
  mockDb: db
};