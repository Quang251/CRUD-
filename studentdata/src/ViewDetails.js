import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from './config';

export default function ViewDetails() {  
    const { studentid } = useParams();
    const [studentData, setStudentData] = useState({});
    useEffect(() => {
        fetch(`${API_ENDPOINTS.STUDENTS}/${studentid}`)
        .then((res) => res.json())
        .then((data) => 
            setStudentData(data))
        .catch((err) => console.log(err.message))
    }, [studentid])
    return (
        <div className="container">
            <h1>View Student Details</h1>
            {studentData && <div className="details">                
                    <p><strong>ID:</strong> {studentData.id}</p>
                    <p><strong>Name:</strong> {studentData.name}</p>
                    <p><strong>Place:</strong> {studentData.place}</p>
                    <p><strong>Phone:</strong> {studentData.phone}</p>
                </div>}
                <Link to="/" className="btn btn-back">Back to Home</Link>
            </div>      
    );
}