import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from './config';

export default function StudentTable() {
  const [students, setStudents] = useState([]); 
  const navigate = useNavigate();
  const DisplayDetails = (id) => {
    navigate(`/student/view/${id}`);
  }
  const EditDetails = (id) => {
    navigate(`/student/edit/${id}`);
  }
  const RemoveDetails = (id) => {
    if(window.confirm('Are you sure you want to delete this student data?')) {
      fetch(`${API_ENDPOINTS.STUDENTS}/${id}`, {
        method: 'DELETE',
       
      })
         .then(res => {
          alert('Student Data Deleted successfully')
          window.location.reload();
         })
         .catch(err => console.log(err.message))
    }
  }
  useEffect(() => {
    fetch(API_ENDPOINTS.STUDENTS)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch students');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        // Ensure data is an array
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error('Data is not an array:', data);
          setStudents([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching students:', err.message);
        console.error('API URL:', API_ENDPOINTS.STUDENTS);
        console.error('⚠️ Lỗi 404: Kiểm tra xem tên resource trên MockAPI có đúng là "students" không?');
        setStudents([]); // Set empty array on error
      });
  }, [])
  return (
    <div className="container">
      <h2>Student Records</h2>
      <div className="table-container">
        <Link to="/student/create" className="btn btn-add">Add New Student</Link>
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>Place</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) && students.length > 0 ? students.map((student,index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.place}</td>
                <td>{student.phone}</td>
                <td>
                  <button onClick={() => DisplayDetails(student.id)} className="btn btn-view">View</button>
                  <button onClick={() => RemoveDetails(student.id)} className="btn btn-delete">Delete</button>
                  <button onClick={() => EditDetails(student.id)} className="btn btn-edit">Edit</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No students found. Add a new student to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}