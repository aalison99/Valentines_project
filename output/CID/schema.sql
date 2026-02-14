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