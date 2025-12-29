import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { API_ENDPOINTS } from './config';

// Danh sách 12 môn học (constant, không thay đổi)
const subjects = [
    'Toán',
    'Ngữ Văn',
    'Tiếng Anh',
    'Vật Lý',
    'Hóa Học',
    'Sinh Học',
    'Lịch Sử',
    'Địa Lý',
    'GDCD',
    'Tin Học',
    'Công Nghệ',
    'Thể Dục'
];

export default function EditStudent() {
    const { studentid } = useParams();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [phone, setPhone] = useState('');
    const [validation, setValidation] = useState(false);
    const navigate = useNavigate();

    // State cho điểm số - mỗi môn có 4 loại điểm
    const [scores, setScores] = useState(() => {
        return subjects.map(subject => ({
            subject: subject,
            oralTest: '',
            test15min: '',
            midterm: '',
            finalExam: ''
        }));
    });

    // Hàm tạo điểm mặc định (mock data) - trong thực tế sẽ lấy từ API
    const generateDefaultScores = useCallback(() => {
        return subjects.map(subject => ({
            subject: subject,
            oralTest: Math.floor(Math.random() * 3) + 8, // 8-10 điểm
            test15min: Math.floor(Math.random() * 4) + 7, // 7-10 điểm
            midterm: Math.floor(Math.random() * 4) + 7, // 7-10 điểm
            finalExam: Math.floor(Math.random() * 4) + 7 // 7-10 điểm
        }));
    }, []);

    useEffect(() => {
        fetch(`${API_ENDPOINTS.STUDENTS}/${studentid}`)
        .then((res) => res.json())
        .then((data) => {
            setId(data.id);
            setName(data.name);
            setPlace(data.place);
            setPhone(data.phone);
            
            // Load điểm số từ API (nếu có), nếu không thì dùng mock data
            if (data.scores && Array.isArray(data.scores)) {
                setScores(data.scores);
            } else {
                // Mock data - trong thực tế sẽ fetch từ API riêng
                setScores(generateDefaultScores());
            }
        })
        .catch((err) => console.log(err.message))
    }, [studentid, generateDefaultScores])

    // Hàm xử lý thay đổi điểm số
    const handleScoreChange = (index, field, value) => {
        const newScores = [...scores];
        // Chỉ cho phép số từ 0-10, có thể có 1 chữ số thập phân
        const numericValue = value.replace(/[^0-9.]/g, '');
        // Kiểm tra giá trị hợp lệ (0-10)
        if (numericValue === '' || (parseFloat(numericValue) >= 0 && parseFloat(numericValue) <= 10)) {
            newScores[index][field] = numericValue;
            setScores(newScores);
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

        // Validation: Kiểm tra điểm số hợp lệ (0-10)
        const invalidScores = scores.some(score => {
            const oral = parseFloat(score.oralTest);
            const test15 = parseFloat(score.test15min);
            const midterm = parseFloat(score.midterm);
            const final = parseFloat(score.finalExam);
            
            return (score.oralTest !== '' && (isNaN(oral) || oral < 0 || oral > 10)) ||
                   (score.test15min !== '' && (isNaN(test15) || test15 < 0 || test15 > 10)) ||
                   (score.midterm !== '' && (isNaN(midterm) || midterm < 0 || midterm > 10)) ||
                   (score.finalExam !== '' && (isNaN(final) || final < 0 || final > 10));
        });

        if (invalidScores) {
            alert('Điểm số phải trong khoảng 0-10!');
            return;
        }

        // Chuyển đổi điểm số sang number (nếu có giá trị)
        const formattedScores = scores.map(score => ({
            subject: score.subject,
            oralTest: score.oralTest === '' ? null : parseFloat(score.oralTest),
            test15min: score.test15min === '' ? null : parseFloat(score.test15min),
            midterm: score.midterm === '' ? null : parseFloat(score.midterm),
            finalExam: score.finalExam === '' ? null : parseFloat(score.finalExam)
        }));

        const studentData = {
            id, 
            name, 
            place, 
            phone: phoneNumber,
            scores: formattedScores
        };
       
        fetch(`${API_ENDPOINTS.STUDENTS}/${studentid}`, {
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
            <input 
              type="text" 
              id="phone" 
              name="phone" 
              required 
              value={phone} 
              onChange={(e) => {
                const value = e.target.value;
                const numericValue = value.replace(/[^0-9]/g, '');
                if (numericValue.length <= 10) {
                  setPhone(numericValue);
                }
              }}
              onMouseDown={() => setValidation(true)}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="10"
            />
            {phone.length===0 && validation && <span className= 'error-message'>Phone is required</span> }

            <div className="scores-section">
              <h3 className="scores-section-title">Bảng Điểm Môn Học</h3>
              <div className="scores-edit-container">
                <table className="scores-edit-table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Môn Học</th>
                      <th>KT Miệng</th>
                      <th>KT 15p</th>
                      <th>KT Giữa Kỳ</th>
                      <th>Thi Cuối Kỳ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((score, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="subject-name">{score.subject}</td>
                        <td>
                          <input
                            type="text"
                            className="score-input"
                            value={score.oralTest}
                            onChange={(e) => handleScoreChange(index, 'oralTest', e.target.value)}
                            placeholder="0-10"
                            maxLength="4"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="score-input"
                            value={score.test15min}
                            onChange={(e) => handleScoreChange(index, 'test15min', e.target.value)}
                            placeholder="0-10"
                            maxLength="4"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="score-input"
                            value={score.midterm}
                            onChange={(e) => handleScoreChange(index, 'midterm', e.target.value)}
                            placeholder="0-10"
                            maxLength="4"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="score-input"
                            value={score.finalExam}
                            onChange={(e) => handleScoreChange(index, 'finalExam', e.target.value)}
                            placeholder="0-10"
                            maxLength="4"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="action-buttons">
                <button type="submit" className="btn btn-up">Update</button>
                <Link to="/" className="btn btn-back">Back to Home</Link>

            </div>
        </form>
      </div>
    );
}