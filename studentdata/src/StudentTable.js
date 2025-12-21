import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
      fetch(`http://localhost:3000/students/${id}`, {
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
    fetch('http://localhost:3000/students')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setStudents(data);
    }).catch((err) => 
      console.log(err.message))
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
            {students && students.map((student,index) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}