import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
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

export default function ViewDetails() {  
    const { studentid } = useParams();
    const [studentData, setStudentData] = useState({});

    // Hàm tạo điểm ngẫu nhiên (mock data) - trong thực tế sẽ lấy từ API
    const generateMockScores = useCallback(() => {
        return subjects.map(subject => ({
            subject: subject,
            oralTest: Math.floor(Math.random() * 3) + 8, // 8-10 điểm
            test15min: Math.floor(Math.random() * 4) + 7, // 7-10 điểm
            midterm: Math.floor(Math.random() * 4) + 7, // 7-10 điểm
            finalExam: Math.floor(Math.random() * 4) + 7 // 7-10 điểm
        }));
    }, []);

    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetch(`${API_ENDPOINTS.STUDENTS}/${studentid}`)
        .then((res) => res.json())
        .then((data) => {
            setStudentData(data);
            // Load điểm số từ API (nếu có), nếu không thì dùng mock data
            if (data.scores && Array.isArray(data.scores) && data.scores.length > 0) {
                // Map điểm từ API sang format hiển thị
                const formattedScores = data.scores.map(score => ({
                    subject: score.subject,
                    oralTest: score.oralTest || 0,
                    test15min: score.test15min || 0,
                    midterm: score.midterm || 0,
                    finalExam: score.finalExam || 0
                }));
                setScores(formattedScores);
            } else {
                // Mock data nếu chưa có điểm
                setScores(generateMockScores());
            }
        })
        .catch((err) => console.log(err.message))
    }, [studentid, generateMockScores])

    // Hàm tính điểm trung bình môn
    const calculateAverage = (oral, test15, midterm, final) => {
        const average = (oral * 0.1 + test15 * 0.2 + midterm * 0.3 + final * 0.4).toFixed(2);
        return parseFloat(average);
    };

    return (
        <div className="container">
            <h1>Bảng Điểm Sinh Viên</h1>
            {studentData && (
                <div className="student-info-header">
                    <div className="info-item">
                        <strong>Mã SV:</strong> {studentData.id}
                    </div>
                    <div className="info-item">
                        <strong>Họ và Tên:</strong> {studentData.name}
                    </div>
                    <div className="info-item">
                        <strong>Nơi ở:</strong> {studentData.place}
                    </div>
                    <div className="info-item">
                        <strong>Số điện thoại:</strong> {studentData.phone}
                    </div>
                </div>
            )}
            
            <div className="scores-table-container">
                <table className="scores-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Môn Học</th>
                            <th>KT Miệng</th>
                            <th>KT 15 phút</th>
                            <th>KT Giữa Kỳ</th>
                            <th>Thi Cuối Kỳ</th>
                            <th>ĐTB Môn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score, index) => {
                            const average = calculateAverage(
                                score.oralTest,
                                score.test15min,
                                score.midterm,
                                score.finalExam
                            );
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="subject-name">{score.subject}</td>
                                    <td className="score-cell">{score.oralTest}</td>
                                    <td className="score-cell">{score.test15min}</td>
                                    <td className="score-cell">{score.midterm}</td>
                                    <td className="score-cell">{score.finalExam}</td>
                                    <td className={`average-cell ${average >= 8 ? 'excellent' : average >= 6.5 ? 'good' : average >= 5 ? 'average' : 'poor'}`}>
                                        {average}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            <div className="action-buttons">
                <Link to="/" className="btn btn-back">Back to Home</Link>
            </div>
        </div>      
    );
}