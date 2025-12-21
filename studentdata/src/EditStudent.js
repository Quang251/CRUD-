import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EditStudent() {
    const { studentid } = useParams();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [phone, setPhone] = useState('');
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();
    //const [studentData, setStudentData] = useState({});
    useEffect(() => {
        fetch(`http://localhost:3000/students/${studentid}`)
        .then((res) => res.json())
        .then((data) => {
            setId(data.id);
            setName(data.name);
            setPlace(data.place);
            setPhone(data.phone);
        })
        .catch((err) => console.log(err.message))
    }, [studentid])
    const handleSubmit = (e) => {
        e.preventDefault();
        const studentData = {id, name, place, phone};
       
    
        fetch(`http://localhost:3000/students/${studentid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(studentData)
        })
           .then(res => {
            alert('Student Data Updated successfully')
            navigate('/')
           })
           .catch(err => console.log(err.message))
      }

    return (
        <div className="container">   
        <h2>Edit Student Details</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id" required value={id} 
            onChange={(e) => setId(e.target.value)}
            onMouseDown={() => setValidation(true)} />
            {id.length===0 && validation && <span className= 'error-message'>ID is required</span> }
           
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
                <button type="submit" className="btn btn-up">Update</button>
                <Link to="/" className="btn btn-back">Back to Home</Link>

            </div>
        </form>
      </div>
    );
}