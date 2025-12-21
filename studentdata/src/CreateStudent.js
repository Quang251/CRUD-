import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from './config';


export default function CreateStudent() {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [phone, setPhone] = useState('');
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // MockAPI tự tạo ID (Object ID), không cần gửi id
    // Phone: Convert to number vì schema định nghĩa là Number
    const studentData = {
      name: name,
      place: place,
      phone: Number(phone) || phone // Convert to number, fallback to string if invalid
    };
    console.log('Sending data:', studentData);

    fetch(API_ENDPOINTS.STUDENTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    })
       .then(res => {
        alert('Student created successfully')
        navigate('/')
       })
       .catch(err => console.log(err.message))
  }
  return (
      <div className="container">   
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
            {/* ID sẽ được MockAPI tự động tạo, không cần input */}
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} 
            onMouseDown={() => setValidation(true)}/>
            {name.length===0 && validation && <span className= 'error-message'>Name is required</span> }

            <label htmlFor="place">Place:</label>
            <input type="text" id="place" name="place" required value={place} onChange={(e) => setPlace(e.target.value)} 
            onMouseDown={() => setValidation(true)}/>
            {place.length===0 &&  validation && <span className= 'error-message'>Place is required</span> }

            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} 
            onMouseDown={() => setValidation(true)}/>
            {phone.length===0 && validation && <span className= 'error-message'>Phone is required</span> }

            <div className="action-buttons">
                <button type="submit" className="btn btn-cr">Create</button>
                <Link to="/" className="btn btn-back">Back to Home</Link>

            </div>
        </form>
      </div>
    );
}