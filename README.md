# Student Management System (CRUD Application)

A full-stack React application for managing student records with Create, Read, Update, and Delete (CRUD) operations. This project demonstrates a complete student management system with a modern user interface and RESTful API integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Components Overview](#components-overview)
- [Usage Guide](#usage-guide)

## 🎯 Overview

This is a React-based Student Management System that allows users to:
- View a list of all students in a table format
- Add new student records
- View detailed information about a specific student
- Edit existing student information
- Delete student records

The application uses **json-server** as a mock REST API backend, which reads from a `db.json` file to simulate a real database.

## ✨ Features

- **View Students**: Display all students in a responsive table with pagination-ready structure
- **Create Student**: Add new student records with form validation
- **Read Student**: View detailed information about individual students
- **Update Student**: Edit existing student information
- **Delete Student**: Remove student records with confirmation dialog
- **Form Validation**: Real-time validation with error messages
- **Responsive Design**: Modern UI with CSS styling
- **Navigation**: Seamless routing between different views

## 🛠 Technologies Used

- **React 19.2.3**: Frontend framework
- **React Router DOM 7.11.0**: Client-side routing
- **json-server 0.17.4**: Mock REST API server
- **React Hooks**: useState, useEffect for state management
- **Fetch API**: For HTTP requests to the backend
- **CSS3**: Styling and responsive design

## 📁 Project Structure

```
CRUD/
├── studentdata/
│   ├── src/
│   │   ├── App.js              # Main app component with routing
│   │   ├── App.css             # Global styles
│   │   ├── index.js            # React app entry point
│   │   ├── index.css           # Base styles
│   │   ├── StudentTable.js     # List all students component
│   │   ├── CreateStudent.js    # Create new student form
│   │   ├── EditStudent.js      # Edit student form
│   │   └── ViewDetails.js      # View student details
│   ├── package.json            # Dependencies and scripts
│   └── README.md              # This file
└── db.json                    # JSON database file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager) or **yarn**
- A code editor (VS Code recommended)

## 🚀 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd CRUD/studentdata
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install all required packages including:
   - React and React DOM
   - React Router DOM
   - json-server (as dev dependency)
   - Testing libraries

## ▶️ Running the Application

This application requires **two separate terminal windows** to run properly:

### Terminal 1: Start the JSON Server (Backend API)

The JSON server provides the REST API endpoints. It reads from `db.json` file located in the parent directory.

```bash
npm run server
```

Or manually:
```bash
json-server --watch ../db.json --port 3000
```

You should see:
```
\{^_^}/ hi!

Loading ../db.json
Done

Resources
http://localhost:3000/students

Home
http://localhost:3000
```

**Keep this terminal running!**

### Terminal 2: Start the React Application (Frontend)

In a new terminal window, navigate to the project directory and start the React development server:

```bash
cd studentdata
npm start
```

The application will automatically open in your browser at `http://localhost:3000` (or the next available port, typically 3001 if 3000 is occupied by json-server).

**Note:** If port 3000 is already in use by json-server, React will automatically use port 3001.

## 🌐 API Endpoints

The json-server provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get a specific student by ID |
| POST | `/students` | Create a new student |
| PUT | `/students/:id` | Update an existing student |
| DELETE | `/students/:id` | Delete a student |

### Example API Usage

```javascript
// Get all students
fetch('http://localhost:3000/students')
  .then(res => res.json())
  .then(data => console.log(data));

// Get a specific student
fetch('http://localhost:3000/students/1')
  .then(res => res.json())
  .then(data => console.log(data));

// Create a new student
fetch('http://localhost:3000/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: '5', name: 'John Doe', place: 'New York', phone: '1234567890' })
});

// Update a student
fetch('http://localhost:3000/students/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: '1', name: 'Jane Doe', place: 'California', phone: '0987654321' })
});

// Delete a student
fetch('http://localhost:3000/students/1', {
  method: 'DELETE'
});
```

## 🧩 Components Overview

### 1. **App.js**
- Main application component
- Sets up React Router with BrowserRouter
- Defines all routes:
  - `/` - Student table (home page)
  - `/student/create` - Create new student
  - `/student/edit/:studentid` - Edit student
  - `/student/view/:studentid` - View student details

### 2. **StudentTable.js**
- Displays all students in a table format
- Features:
  - Fetches students on component mount
  - View, Edit, and Delete buttons for each student
  - Navigation to create new student page
  - Delete confirmation dialog

### 3. **CreateStudent.js**
- Form to add new students
- Features:
  - Form validation with error messages
  - Required field validation
  - POST request to create student
  - Redirects to home page after successful creation

### 4. **EditStudent.js**
- Form to edit existing students
- Features:
  - Pre-fills form with existing student data
  - Fetches student data on component mount
  - PUT request to update student
  - Form validation
  - Redirects to home page after successful update

### 5. **ViewDetails.js**
- Displays detailed information about a student
- Features:
  - Fetches student data based on URL parameter
  - Shows all student fields in a readable format
  - Back button to return to home page

## 📖 Usage Guide

### Viewing Students
1. The home page (`/`) displays all students in a table
2. Each row shows: Serial Number, Name, Place, Phone, and Action buttons

### Creating a New Student
1. Click the **"Add New Student"** button on the home page
2. Fill in the form fields:
   - **ID**: Unique identifier
   - **Name**: Student's full name
   - **Place**: Student's location
   - **Phone**: Contact number
3. Click **"Create"** to save
4. You'll be redirected to the home page with the new student listed

### Viewing Student Details
1. Click the **"View"** button next to any student
2. A detailed view page will show all information about that student
3. Click **"Back to Home"** to return

### Editing a Student
1. Click the **"Edit"** button next to any student
2. The form will be pre-filled with existing data
3. Modify the fields as needed
4. Click **"Update"** to save changes
5. You'll be redirected to the home page

### Deleting a Student
1. Click the **"Delete"** button next to any student
2. Confirm the deletion in the popup dialog
3. The student will be removed from the database
4. The page will refresh to show updated list

## 🔧 Troubleshooting

### Issue: Data not loading
- **Solution**: Make sure json-server is running on port 3000
- Check that `db.json` exists in the parent directory (`../db.json`)

### Issue: Cannot create/update/delete
- **Solution**: Verify json-server is running and accessible at `http://localhost:3000`
- Check browser console for error messages

### Issue: Port already in use
- **Solution**: 
  - For json-server: Change port in `package.json` script: `--port 3001`
  - For React: It will automatically use the next available port

### Issue: CORS errors
- **Solution**: json-server handles CORS automatically, but if issues persist, check that both servers are running

## 📝 Data Structure

The `db.json` file structure:

```json
{
  "students": [
    {
      "id": "1",
      "name": "John Kumar",
      "place": "Kerala",
      "phone": "1234567890"
    }
  ]
}
```

## 🎓 Learning Concepts Demonstrated

This project demonstrates:
- **React Hooks**: useState, useEffect
- **React Router**: useNavigate, useParams, BrowserRouter, Routes, Route
- **RESTful API**: GET, POST, PUT, DELETE operations
- **Form Handling**: Controlled components, form validation
- **State Management**: Component-level state with hooks
- **Async Operations**: Fetch API with promises
- **Error Handling**: Try-catch and error logging

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Student Management System - CRUD Application

---

**Happy Coding! 🚀**
