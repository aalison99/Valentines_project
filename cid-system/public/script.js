document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Load dashboard data
    loadDashboardData();
    
    // Load data for all sections
    loadPoliceOfficers();
    loadCriminals();
    loadCrimeRecords();
    loadVictims();
    loadWitnesses();
    loadInvestigations();
    loadCourtCases();
    
    // Setup form submission handlers
    setupPoliceForm();
    setupCriminalForm();
    setupCrimeForm();
    // Add other form setup functions here
});

// Dashboard data loading
function loadDashboardData() {
    // Load counts
    fetch('/api/police')
        .then(response => response.json())
        .then(data => {
            document.getElementById('police-count').textContent = data.length;
        })
        .catch(error => console.error('Error loading police count:', error));
    
    fetch('/api/criminals')
        .then(response => response.json())
        .then(data => {
            document.getElementById('criminal-count').textContent = data.length;
        })
        .catch(error => console.error('Error loading criminal count:', error));
    
    fetch('/api/crime-records')
        .then(response => response.json())
        .then(data => {
            document.getElementById('crime-count').textContent = data.length;
            
            // Load recent crimes
            const recentCrimes = data.slice(0, 5); // Get 5 most recent crimes
            const recentCrimesHtml = recentCrimes.map(crime => `
                <tr>
                    <td>${crime.CrimeID}</td>
                    <td>${crime.CrimeType}</td>
                    <td>${new Date(crime.DateTime).toLocaleString()}</td>
                    <td>${crime.Location}</td>
                </tr>
            `).join('');
            
            document.getElementById('recent-crimes').innerHTML = recentCrimesHtml || '<tr><td colspan="4" class="text-center">No recent crimes</td></tr>';
        })
        .catch(error => console.error('Error loading crime count:', error));
    
    fetch('/api/court-cases')
        .then(response => response.json())
        .then(data => {
            document.getElementById('case-count').textContent = data.length;
        })
        .catch(error => console.error('Error loading court case count:', error));
    
    // Load ongoing investigations
    fetch('/api/investigations')
        .then(response => response.json())
        .then(data => {
            const ongoingInvestigations = data.filter(inv => inv.InvestigationStatus === 'Ongoing').slice(0, 5);
            const ongoingInvestigationsHtml = ongoingInvestigations.map(inv => `
                <tr>
                    <td>${inv.InvestigationID}</td>
                    <td>${inv.CrimeID}</td>
                    <td>${inv.OfficerID}</td>
                    <td>${inv.InvestigationStatus}</td>
                </tr>
            `).join('');
            
            document.getElementById('ongoing-investigations').innerHTML = ongoingInvestigationsHtml || '<tr><td colspan="4" class="text-center">No ongoing investigations</td></tr>';
        })
        .catch(error => console.error('Error loading investigations:', error));
}

// Police Officers
function loadPoliceOfficers() {
    fetch('/api/police')
        .then(response => response.json())
        .then(data => {
            const policeTableHtml = data.map(officer => `
                <tr>
                    <td>${officer.OfficerID}</td>
                    <td>${officer.Name}</td>
                    <td>${officer.Ranks}</td>
                    <td>${officer.Department}</td>
                    <td>${officer.ContactNumber}</td>
                    <td>
                        <button class="btn btn-sm btn-primary btn-action" onclick="editPoliceOfficer('${officer.OfficerID}')">Edit</button>
                        <button class="btn btn-sm btn-danger btn-action" onclick="deletePoliceOfficer('${officer.OfficerID}')">Delete</button>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('police-table').innerHTML = policeTableHtml || '<tr><td colspan="6" class="text-center">No police officers found</td></tr>';
        })
        .catch(error => console.error('Error loading police officers:', error));
}

function setupPoliceForm() {
    document.getElementById('savePolice').addEventListener('click', function() {
        const officerId = document.getElementById('policeId').value;
        const policeData = {
            OfficerID: document.getElementById('policeOfficerId').value,
            Name: document.getElementById('policeName').value,
            Ranks: document.getElementById('policeRank').value,
            Department: document.getElementById('policeDepartment').value,
            ContactNumber: document.getElementById('policeContact').value
        };
        
        if (!policeData.OfficerID || !policeData.Name || !policeData.Ranks || !policeData.Department || !policeData.ContactNumber) {
            alert('Please fill all required fields');
            return;
        }
        
        const url = officerId ? `/api/police/${officerId}` : '/api/police';
        const method = officerId ? 'PUT' : 'POST';
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(policeData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Close modal and reload data
            const policeModal = bootstrap.Modal.getInstance(document.getElementById('policeModal'));
            policeModal.hide();
            loadPoliceOfficers();
            loadDashboardData();
        })
        .catch(error => console.error('Error saving police officer:', error));
    });
}

function editPoliceOfficer(officerId) {
    fetch(`/api/police/${officerId}`)
        .then(response => response.json())
        .then(officer => {
            document.getElementById('policeId').value = officer.OfficerID;
            document.getElementById('policeOfficerId').value = officer.OfficerID;
            document.getElementById('policeName').value = officer.Name;
            document.getElementById('policeRank').value = officer.Ranks;
            document.getElementById('policeDepartment').value = officer.Department;
            document.getElementById('policeContact').value = officer.ContactNumber;
            
            document.getElementById('policeModalLabel').textContent = 'Edit Police Officer';
            document.getElementById('policeOfficerId').readOnly = true;
            
            const policeModal = new bootstrap.Modal(document.getElementById('policeModal'));
            policeModal.show();
        })
        .catch(error => console.error('Error fetching police officer:', error));
}

function deletePoliceOfficer(officerId) {
    if (confirm('Are you sure you want to delete this police officer?')) {
        fetch(`/api/police/${officerId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loadPoliceOfficers();
            loadDashboardData();
        })
        .catch(error => console.error('Error deleting police officer:', error));
    }
}

// Criminals
function loadCriminals() {
    fetch('/api/criminals')
        .then(response => response.json())
        .then(data => {
            const criminalTableHtml = data.map(criminal => `
                <tr>
                    <td>${criminal.CriminalID}</td>
                    <td>${criminal.Name}</td>
                    <td>${criminal.Age}</td>
                    <td>${criminal.Gender}</td>
                    <td>${criminal.Address}</td>
                    <td>${criminal.CrimeHistory || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-primary btn-action" onclick="editCriminal('${criminal.CriminalID}')">Edit</button>
                        <button class="btn btn-sm btn-danger btn-action" onclick="deleteCriminal('${criminal.CriminalID}')">Delete</button>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('criminal-table').innerHTML = criminalTableHtml || '<tr><td colspan="7" class="text-center">No criminals found</td></tr>';
        })
        .catch(error => console.error('Error loading criminals:', error));
}

function setupCriminalForm() {
    document.getElementById('saveCriminal').addEventListener('click', function() {
        const criminalId = document.getElementById('criminalIdHidden').value;
        const criminalData = {
            CriminalID: document.getElementById('criminalId').value,
            Name: document.getElementById('criminalName').value,
            Age: document.getElementById('criminalAge').value,
            Gender: document.getElementById('criminalGender').value,
            Address: document.getElementById('criminalAddress').value,
            CrimeHistory: document.getElementById('crimeHistory').value
        };
        
        if (!criminalData.CriminalID || !criminalData.Name || !criminalData.Age || !criminalData.Gender || !criminalData.Address) {
            alert('Please fill all required fields');
            return;
        }
        
        const url = criminalId ? `/api/criminals/${criminalId}` : '/api/criminals';
        const method = criminalId ? 'PUT' : 'POST';
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(criminalData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Close modal and reload data
            const criminalModal = bootstrap.Modal.getInstance(document.getElementById('criminalModal'));
            criminalModal.hide();
            loadCriminals();
            loadDashboardData();
        })
        .catch(error => console.error('Error saving criminal:', error));
    });
}

// Crime Records
function loadCrimeRecords() {
    fetch('/api/crime-records')
        .then(response => response.json())
        .then(data => {
            const crimeTableHtml = data.map(crime => `
                <tr>
                    <td>${crime.CrimeID}</td>
                    <td>${crime.CrimeType}</td>
                    <td>${new Date(crime.DateTime).toLocaleString()}</td>
                    <td>${crime.Location}</td>
                    <td>${crime.CriminalID}</td>
                    <td>
                        <button class="btn btn-sm btn-primary btn-action" onclick="editCrimeRecord('${crime.CrimeID}')">Edit</button>
                        <button class="btn btn-sm btn-danger btn-action" onclick="deleteCrimeRecord('${crime.CrimeID}')">Delete</button>
                        <button class="btn btn-sm btn-info btn-action" onclick="viewCrimeDetails('${crime.CrimeID}')">Details</button>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('crime-table').innerHTML = crimeTableHtml || '<tr><td colspan="6" class="text-center">No crime records found</td></tr>';
        })
        .catch(error => console.error('Error loading crime records:', error));
    
    // Load criminals for the dropdown
    fetch('/api/criminals')
        .then(response => response.json())
        .then(data => {
            const criminalOptions = data.map(criminal => `
                <option value="${criminal.CriminalID}">${criminal.CriminalID} - ${criminal.Name}</option>
            `).join('');
            
            document.getElementById('crimeCriminalId').innerHTML = '<option value="">Select Criminal</option>' + criminalOptions;
        })
        .catch(error => console.error('Error loading criminals for dropdown:', error));
}

function setupCrimeForm() {
    document.getElementById('saveCrime').addEventListener('click', function() {
        const crimeId = document.getElementById('crimeIdHidden').value;
        const crimeData = {
            CrimeID: document.getElementById('crimeId').value,
            CrimeType: document.getElementById('crimeType').value,
            DateTime: document.getElementById('crimeDateTime').value,
            Location: document.getElementById('crimeLocation').value,
            Description: document.getElementById('crimeDescription').value,
            CriminalID: document.getElementById('crimeCriminalId').value
        };
        
        if (!crimeData.CrimeID || !crimeData.CrimeType || !crimeData.DateTime || !crimeData.Location || !crimeData.CriminalID) {
            alert('Please fill all required fields');
            return;
        }
        
        const url = crimeId ? `/api/crime-records/${crimeId}` : '/api/crime-records';
        const method = crimeId ? 'PUT' : 'POST';
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(crimeData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Close modal and reload data
            const crimeModal = bootstrap.Modal.getInstance(document.getElementById('crimeModal'));
            crimeModal.hide();
            loadCrimeRecords();
            loadDashboardData();
        })
        .catch(error => console.error('Error saving crime record:', error));
    });
}

// Placeholder functions for other entities
function loadVictims() {
    // Implementation similar to other entities
    console.log('Loading victims...');
}

function loadWitnesses() {
    // Implementation similar to other entities
    console.log('Loading witnesses...');
}

function loadInvestigations() {
    // Implementation similar to other entities
    console.log('Loading investigations...');
}

function loadCourtCases() {
    // Implementation similar to other entities
    console.log('Loading court cases...');
}

// Helper functions for modals
function resetForm(formId) {
    document.getElementById(formId).reset();
}

// Add event listeners for modal open to reset forms
document.getElementById('policeModal').addEventListener('show.bs.modal', function (event) {
    if (!event.relatedTarget) return; // Skip if opened programmatically
    
    document.getElementById('policeId').value = '';
    document.getElementById('policeOfficerId').readOnly = false;
    document.getElementById('policeModalLabel').textContent = 'Add Police Officer';
    resetForm('policeForm');
});

document.getElementById('criminalModal').addEventListener('show.bs.modal', function (event) {
    if (!event.relatedTarget) return; // Skip if opened programmatically
    
    document.getElementById('criminalIdHidden').value = '';
    document.getElementById('criminalId').readOnly = false;
    document.getElementById('criminalModalLabel').textContent = 'Add Criminal';
    resetForm('criminalForm');
});

document.getElementById('crimeModal').addEventListener('show.bs.modal', function (event) {
    if (!event.relatedTarget) return; // Skip if opened programmatically
    
    document.getElementById('crimeIdHidden').value = '';
    document.getElementById('crimeId').readOnly = false;
    document.getElementById('crimeModalLabel').textContent = 'Add Crime Record';
    resetForm('crimeForm');
});