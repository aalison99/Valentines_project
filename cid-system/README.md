# Criminal Investigation Database Management System

A full-stack web application for managing criminal investigation data, built with Node.js, Express, and HTML/CSS/JavaScript.

## Features

- Complete CRUD operations for all entities:
  - Police Officers
  - Criminals
  - Crime Records
  - Victims
  - Witnesses
  - Investigations
  - Court Cases
- Dashboard with summary statistics
- Responsive UI using Bootstrap
- RESTful API endpoints
- In-memory database (no MySQL required)

## Prerequisites

- Node.js (v14 or higher)

## Quick Start

1. Clone the repository or download the source code.

2. **Using the launcher script (recommended):**
   
   **On macOS/Linux:**
   ```
   cd cid-system
   chmod +x start-cid.sh
   ./start-cid.sh
   ```
   
   **On Windows:**
   ```
   cd cid-system
   start-cid.bat
   ```
   
   The launcher script will:
   - Check if Node.js is installed
   - Install dependencies if needed
   - Start the application

3. **Manual start:**
   ```
   cd cid-system
   npm install
   npm start
   ```
   or
   ```
   cd cid-system
   npm install
   node app.js
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Using with MySQL (Optional)

By default, the application uses an in-memory database for demonstration purposes.
If you want to use a real MySQL database:

1. Make sure MySQL (v5.7 or higher) is installed and running

2. Update the database connection details in `app.js`

3. Comment out the mock database code and uncomment the MySQL connection code in `app.js`

4. Set up the database:
   ```
   npm run setup
   ```
   or
   ```
   node db-setup.js
   ```

5. Start the application as normal

## Deploying to a Live Server

To deploy the application to a production server:

1. Transfer the application files to your server

2. Make the deployment script executable:
   ```
   chmod +x deploy.sh
   ```

3. Run the deployment script:
   ```
   ./deploy.sh
   ```

The deployment script will:
- Install Node.js if not already installed
- Install PM2 process manager for running the application
- Install dependencies
- Start the application with PM2
- Configure the application to restart automatically on server reboot
- Display the URL where you can access the application

### Server Requirements

- Linux-based operating system (Ubuntu, CentOS, etc.)
- Sudo/root access for installing packages
- Open port 3000 (or modify the port in app.js)

### Security Considerations for Production

Before deploying to a production environment, consider:

1. Setting up a proper database with authentication
2. Adding user authentication to the application
3. Using HTTPS with a valid SSL certificate
4. Setting up a reverse proxy (Nginx/Apache) to serve the application
5. Implementing proper data validation and sanitization

## API Endpoints

The application provides the following API endpoints:

### Police Officers
- `GET /api/police` - Get all police officers
- `GET /api/police/:id` - Get a specific police officer
- `POST /api/police` - Create a new police officer
- `PUT /api/police/:id` - Update a police officer
- `DELETE /api/police/:id` - Delete a police officer

### Criminals
- `GET /api/criminals` - Get all criminals
- `GET /api/criminals/:id` - Get a specific criminal
- `GET /api/criminals/:id/crimes` - Get a criminal with their crime records
- `POST /api/criminals` - Create a new criminal
- `PUT /api/criminals/:id` - Update a criminal
- `DELETE /api/criminals/:id` - Delete a criminal

### Crime Records
- `GET /api/crime-records` - Get all crime records
- `GET /api/crime-records/:id` - Get a specific crime record
- `GET /api/crime-records/:id/details` - Get a crime record with all related information
- `POST /api/crime-records` - Create a new crime record
- `PUT /api/crime-records/:id` - Update a crime record
- `DELETE /api/crime-records/:id` - Delete a crime record

Similar endpoints exist for Victims, Witnesses, Investigations, and Court Cases.

## Database Schema

The application uses the following database schema:

- **PoliceOfficer**: Information about police officers
- **Criminal**: Information about criminals
- **CrimeRecord**: Details of crime incidents
- **Victim**: Information about victims
- **Witness**: Information about witnesses
- **Investigation**: Details of ongoing or completed investigations
- **CourtCase**: Information about court proceedings

## License

This project is open-source and available under the MIT License.