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

The application uses **MockAPI.io** as a free cloud-based REST API backend for data persistence. This eliminates the need for local server setup and allows easy deployment.

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
- **MockAPI.io**: Free cloud-based REST API service
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
│   │   ├── ViewDetails.js      # View student details
│   │   └── config.js           # API configuration
│   ├── package.json            # Dependencies and scripts
│   └── README.md              # This file
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
   - Testing libraries

## 🌐 API Setup (MockAPI.io)

This project uses **MockAPI.io** as the backend API. You need to set up your MockAPI endpoint:

1. **Create a MockAPI Resource:**
   - Go to [https://mockapi.io/](https://mockapi.io/)
   - Sign up for a free account
   - Create a new project
   - Create a resource named `students` (or your preferred name)
   - MockAPI will provide you with an API URL like: `https://692bf36ec829d464006e0a4d.mockapi.io/students`

2. **Update API Configuration:**
   - Open `src/config.js`
   - Update the `API_BASE_URL` with your MockAPI URL:
   ```javascript
   export const API_BASE_URL = 'https://YOUR-API-ID.mockapi.io';
   ```
   - Update the endpoint name if different from `students`:
   ```javascript
   export const API_ENDPOINTS = {
     STUDENTS: `${API_BASE_URL}/your-endpoint-name`
   };
   ```

## ▶️ Running the Application

Since we're using MockAPI.io (cloud-based), you only need to run the React application:

### Start the React Application

Navigate to the project directory and start the React development server:

```bash
cd studentdata
npm start
```

The application will automatically open in your browser at `http://localhost:3000`.

**That's it!** No need to run a separate backend server. MockAPI.io handles all API requests in the cloud.

## 🌐 API Endpoints

MockAPI.io provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `https://YOUR-API-ID.mockapi.io/students` | Get all students |
| GET | `https://YOUR-API-ID.mockapi.io/students/:id` | Get a specific student by ID |
| POST | `https://YOUR-API-ID.mockapi.io/students` | Create a new student |
| PUT | `https://YOUR-API-ID.mockapi.io/students/:id` | Update an existing student |
| DELETE | `https://YOUR-API-ID.mockapi.io/students/:id` | Delete a student |

**Note:** MockAPI automatically generates unique IDs for new records, so you don't need to provide an `id` field when creating new students (though you can if needed).

### Example API Usage

```javascript
// Get all students
fetch('https://YOUR-API-ID.mockapi.io/students')
  .then(res => res.json())
  .then(data => console.log(data));

// Get a specific student
fetch('https://YOUR-API-ID.mockapi.io/students/1')
  .then(res => res.json())
  .then(data => console.log(data));

// Create a new student (MockAPI auto-generates ID)
fetch('https://YOUR-API-ID.mockapi.io/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John Doe', place: 'New York', phone: '1234567890' })
});

// Update a student
fetch('https://YOUR-API-ID.mockapi.io/students/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Jane Doe', place: 'California', phone: '0987654321' })
});

// Delete a student
fetch('https://YOUR-API-ID.mockapi.io/students/1', {
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
- **Solution**: 
  - Verify your MockAPI endpoint URL is correct in `src/config.js`
  - Check that your MockAPI resource is created and accessible
  - Open browser DevTools (F12) → Network tab to see API requests
  - Check the Console tab for error messages

### Issue: Cannot create/update/delete
- **Solution**: 
  - Verify your MockAPI endpoint URL is correct
  - Check MockAPI.io dashboard to see if requests are being received
  - Ensure you're using the correct HTTP methods (POST, PUT, DELETE)
  - Check browser console for CORS or network errors

### Issue: CORS errors
- **Solution**: MockAPI.io handles CORS automatically. If you see CORS errors:
  - Verify your API URL is correct
  - Check that your MockAPI resource exists
  - Try accessing the API directly in browser to test

### Issue: Port already in use
- **Solution**: React will automatically use the next available port (3001, 3002, etc.)

### Issue: API returns 404
- **Solution**: 
  - Double-check your endpoint name matches the resource name in MockAPI
  - Verify the API base URL in `src/config.js`
  - Test the API endpoint directly in your browser

## 📝 Data Structure

The student data structure used in MockAPI:

```json
{
  "id": "1",
  "name": "John Kumar",
  "place": "Kerala",
  "phone": "1234567890"
}
```

**Note:** MockAPI automatically adds an `id` field (and `createdAt` timestamp) to each record. You can include an `id` field in your POST request, but MockAPI will use its own generated ID if you don't.

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
