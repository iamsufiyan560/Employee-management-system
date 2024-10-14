# Employee Management System

This project is a full-stack application for managing employees and departments. It consists of a Node.js backend API and a React frontend with advanced table functionality.

## Backend

The backend is built with Express.js and provides APIs for managing employees and departments.

### Structure

- `server.js`: Main entry point for the Express application
- `/routes`: Contains route definitions
  - `employeeRoutes.js`: Employee-related routes
  - `departmentRoutes.js`: Department-related routes
- `/lib`: Contains utility functions
  - `db.js`: Database connection logic

### Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following contents:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:3000
   ```

3. Start the server:
   ```
   npm start
   ```

The server will start on the specified port (default 5000) and connect to the MongoDB database.

### API Endpoints

- Employees:

  - GET `/api/employees/getAllEmployees`: Fetch all employees (paginated)
  - POST `/api/employees`: Add a new employee

- Departments:
  - GET `/api/departments`: Fetch all departments (with cursor-based pagination)
  - POST `/api/departments`: Add a new department

## Frontend

The frontend is a React application featuring an advanced table component for displaying employee data and department management.

### Key Components

- `AdvancedTableComponent`: Main component for displaying employee data
- `AddEmployee`: Component for adding a new employee
- `AddDepartment`: Component for adding a new department

### Features

- Display employee data in a sortable, filterable table
- Pagination for employee data
- Infinite scrolling for department data
- Add new employees and departments

### Setup

1. Navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the frontend directory:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm start
   ```

The frontend will start on `http://localhost:3000` by default.

## Technologies Used

- Backend:

  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - cors for CORS handling
  - dotenv for environment variable management

- Frontend:
  - React
  - @tanstack/react-table for advanced table functionality
  - @tanstack/react-query for data fetching and caching
  - Tailwind CSS for styling
  - shadcn/ui for UI components

## Future Improvements

- Implement authentication and authorization
- Add unit and integration tests
- Enhance error handling and validation
- Implement real-time updates using WebSockets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
