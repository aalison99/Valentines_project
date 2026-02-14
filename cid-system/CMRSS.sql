CREATE TABLE PoliceOfficer (
    OfficerID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50),
    Ranks VARCHAR(30),
    Department VARCHAR(50),
    ContactNumber VARCHAR(15)
);

CREATE TABLE Criminal (
    CriminalID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50),
    Age INT,
    Gender VARCHAR(10),
    Address VARCHAR(100),
    CrimeHistory TEXT
);

CREATE TABLE CrimeRecord (
    CrimeID VARCHAR(10) PRIMARY KEY,
    CrimeType VARCHAR(50),
    DateTime DATETIME,
    Location VARCHAR(100),
    Description TEXT,
    CriminalID VARCHAR(10),
    FOREIGN KEY (CriminalID) REFERENCES Criminal(CriminalID)
);

CREATE TABLE Victim (
    VictimID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50),
    Age INT,
    ContactNumber VARCHAR(15),
    Address VARCHAR(100),
    CrimeID VARCHAR(10),
    FOREIGN KEY (CrimeID) REFERENCES CrimeRecord(CrimeID)
);
 
CREATE TABLE Witness (
    WitnessID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50),
    ContactNumber VARCHAR(15),
    Statement TEXT,
    CrimeID VARCHAR(10),
    FOREIGN KEY (CrimeID) REFERENCES CrimeRecord(CrimeID)
);

CREATE TABLE Investigation (
    InvestigationID VARCHAR(10) PRIMARY KEY,
    CrimeID VARCHAR(10),
    OfficerID VARCHAR(10),
    InvestigationStatus VARCHAR(30),
    EvidenceDetails TEXT,
    FOREIGN KEY (CrimeID) REFERENCES CrimeRecord(CrimeID),
    FOREIGN KEY (OfficerID) REFERENCES PoliceOfficer(OfficerID)
);

CREATE TABLE CourtCase (
    CaseID VARCHAR(10) PRIMARY KEY,
    CrimeID VARCHAR(10),
    CaseStatus VARCHAR(20),
    LawyerName VARCHAR(50),
    HearingDate DATE,
    FOREIGN KEY (CrimeID) REFERENCES CrimeRecord(CrimeID)
);


INSERT INTO CourtCase VALUES
('CC701', 'C301', 'Pending', 'Adv. Suresh Nair', '2025-06-12'),
('CC702', 'C302', 'Closed', 'Adv. Reema Shah', '2024-12-20');

INSERT INTO Investigation VALUES
('I601', 'C301', 'PO101', 'Ongoing', 'Fingerprints, CCTV footage'),
('I602', 'C302', 'PO102', 'Closed', 'Digital forensics report');

INSERT INTO Witness VALUES
('W501', 'Anil Kapoor', '7777777777', 'Saw the robber flee in a black car.', 'C301'),
('W502', 'Priya Sharma', '6666666666', 'Reported the fraudulent message.', 'C302');

INSERT INTO Victim VALUES
('V401', 'Karan Malhotra', 40, '9999999999', 'Noida', 'C301'),
('V402', 'Sneha Rao', 35, '8888888888', 'Mumbai', 'C302');

INSERT INTO CrimeRecord VALUES
('C301', 'Robbery', '2024-09-12 14:00:00', 'Sector 21, Noida', 'Armed robbery at bank', 'CR201'),
('C302', 'Fraud', '2024-10-05 11:30:00', 'Bandra, Mumbai', 'Online transaction fraud', 'CR202');

INSERT INTO Criminal VALUES
('CR201', 'Vikram Singh', 32, 'Male', 'Delhi', 'Robbery, Assault'),
('CR202', 'Meena Kumari', 28, 'Female', 'Mumbai', 'Fraud');

INSERT INTO PoliceOfficer VALUES 
('PO101', 'Raj Verma', 'Inspector', 'Homicide', '9876543210'),
('PO102', 'Asha Mehta', 'Sub-Inspector', 'Cyber Crime', '9823456781'),
('PO103', 'Ravi Kumar', 'Head Constable', 'Traffic', '9812234567');

Select * from CourtCase;

DROP TRIGGER IF EXISTS trg_prevent_criminal_delete;

DELIMITER $$

CREATE TRIGGER trg_prevent_criminal_delete
BEFORE DELETE ON Criminal
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1 FROM CrimeRecord WHERE CriminalID = OLD.CriminalID
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete: Criminal is linked to a crime record.';
    END IF;
END$$
DELIMITER ;
SELECT * FROM Criminal INNER JOIN CrimeRecord;
CREATE VIEW CrimeDetails AS
SELECT Name, CrimeType, Description
FROM Criminal 
JOIN CrimeRecord;
SELECT * FROM CrimeDetails;
ALTER TABLE CourtCase
ADD JudgeName varchar(30);
ALTER TABLE CourtCase DROP COLUMN JudgeName;
SELECT * FROM CourtCase;
ALTER TABLE PoliceOfficer
RENAME COLUMN Ranks TO Designation;
SELECT * FROM PoliceOfficer;
SELECT * FROM CrimeRecord
WHERE CrimeType IN ('Theft', 'Robbery', 'Fraud');
SELECT * FROM Victim
WHERE Name LIKE 'Sn%';
SELECT * FROM CrimeRecord
WHERE DateTime BETWEEN '2024-01-01' AND '2025-03-31';
DELIMITER $$

CREATE TRIGGER trg_prevent_criminal_delete
BEFORE DELETE ON Criminal
FOR EACH ROW
BEGIN
  DECLARE crime_count INT;

  SELECT COUNT(*) INTO crime_count
  FROM CrimeRecord
  WHERE CrimeID = OLD.Crime_ID;

  IF crime_count > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Cannot delete Criminal: associated crime record exists.';
  END IF;
END$$

DELIMITER ;
DELETE FROM Criminal WHERE CriminalID = 101; #showz error 

SELECT Victim.Name AS VictimName,
       Victim.Age,
       CrimeRecord.CrimeType,
       CrimeRecord.Description
FROM Victim
INNER JOIN CrimeRecord ON Victim.CrimeID = CrimeRecord.CrimeID;

SELECT CrimeRecord.CrimeID,
       CrimeRecord.CrimeType,
       Victim.Name AS VictimName,
       Victim.ContactNumber
FROM CrimeRecord
LEFT JOIN Victim ON CrimeRecord.CrimeID = Victim.CrimeID;

SELECT Victim.Name AS VictimName,
       Victim.Age,
       CrimeRecord.CrimeType,
       CrimeRecord.Location
FROM CrimeRecord
RIGHT JOIN Victim ON CrimeRecord.CrimeID = Victim.CrimeID;

SELECT CrimeRecord.CrimeID,
       CrimeRecord.CrimeType,
       Victim.Name AS VictimName
FROM CrimeRecord
LEFT JOIN Victim ON CrimeRecord.CrimeID = Victim.CrimeID

UNION

SELECT CrimeRecord.CrimeID,
       CrimeRecord.CrimeType,
       Victim.Name AS VictimName
FROM CrimeRecord
RIGHT JOIN Victim ON CrimeRecord.CrimeID = Victim.CrimeID;

CREATE VIEW VictimCrimeSummary AS
SELECT 
    Victim.VictimID,
    Victim.Name AS VictimName,
    Victim.Age,
    Victim.ContactNumber,
    CrimeRecord.CrimeID,
    CrimeRecord.CrimeType,
    CrimeRecord.Location,
    CrimeRecord.Description
FROM Victim
INNER JOIN CrimeRecord ON Victim.CrimeID = CrimeRecord.CrimeID;

SELECT * FROM VictimCrimeSummary;

CREATE VIEW CrimeCountByLocation AS
SELECT Location, COUNT(*) AS TotalCrimes
FROM CrimeRecord
GROUP BY Location;

SELECT * FROM CrimeCountByLocation;
