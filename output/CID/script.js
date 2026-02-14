// Fetch crime data from backend API
fetch("http://localhost:3000/api/crimes")
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#crimeTable tbody");
    
    data.forEach(crime => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${crime.CrimeID}</td>
        <td>${crime.Description}</td>
        <td>${crime.CriminalID}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.log('Error:', err));
  