import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from './config';


export default function CreateStudent() {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [phone, setPhone] = useState('');
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý khi nhập số điện thoại - chỉ cho phép số dương, tối đa 10 số
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Chỉ cho phép số (0-9), loại bỏ tất cả ký tự khác
    const numericValue = value.replace(/[^0-9]/g, '');
    // Giới hạn tối đa 10 số
    if (numericValue.length <= 10) {
      setPhone(numericValue);
    }
  };

  // Hàm chặn các phím không hợp lệ khi nhập
  const handlePhoneKeyDown = (e) => {
    // Cho phép: Backspace, Delete, Tab, Escape, Enter, và các phím điều hướng
    if ([8, 9, 27, 13, 46, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Cho phép Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Cho phép Home, End, Left, Right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    // Chặn nhập nếu đã đủ 10 số (trừ khi đang xóa hoặc chọn text)
    if (phone.length >= 10 && !e.ctrlKey && e.keyCode !== 8 && e.keyCode !== 46) {
      e.preventDefault();
      return;
    }
    // Chặn tất cả nếu không phải số (0-9)
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Phone phải là số dương
    const phoneNumber = Number(phone);
    if (!phone || phoneNumber <= 0 || isNaN(phoneNumber)) {
      alert('Số điện thoại phải là số dương và không được để trống!');
      return;
    }

    // MockAPI tự tạo ID (Object ID), không cần gửi id
    // Phone: Convert to number vì schema định nghĩa là Number
    const studentData = {
      name: name,
      place: place,
      phone: phoneNumber
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
            <input 
              type="text" 
              id="phone" 
              name="phone" 
              required 
              value={phone} 
              onChange={handlePhoneChange}
              onKeyDown={handlePhoneKeyDown}
              onMouseDown={() => setValidation(true)}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="10"
            />
            {phone.length===0 && validation && <span className= 'error-message'>Phone is required</span> }
            {phone && Number(phone) <= 0 && <span className= 'error-message'>Phone must be a positive number</span> }

            <div className="action-buttons">
                <button type="submit" className="btn btn-cr">Create</button>
                <Link to="/" className="btn btn-back">Back to Home</Link>

            </div>
        </form>
      </div>
    );
}