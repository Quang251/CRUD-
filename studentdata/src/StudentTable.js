import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from './config';

export default function StudentTable() {
  const [students, setStudents] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); // State cho thanh tìm kiếm
  const [expandedRowId, setExpandedRowId] = useState(null); // Track hàng nào đang mở
  const [expandedStudentData, setExpandedStudentData] = useState(null); // Lưu data của hàng đang mở
  const navigate = useNavigate();
  
  // Hàm filter students dựa trên search term (tìm theo name, id, phone)
  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = student.name?.toLowerCase().includes(searchLower);
    const idMatch = student.id?.toString().toLowerCase().includes(searchLower);
    const phoneMatch = student.phone?.toString().includes(searchTerm);
    return nameMatch || idMatch || phoneMatch;
  });
  
  // Hàm xử lý khi click vào tên - toggle expand/collapse
  const handleNameClick = (studentId) => {
    // Nếu đang mở hàng này thì đóng lại
    if (expandedRowId === studentId) {
      setExpandedRowId(null);
      setExpandedStudentData(null);
    } else {
      // Mở hàng mới và fetch data
      setExpandedRowId(studentId);
      // Tìm student trong danh sách hiện tại
      const student = students.find(s => s.id === studentId);
      if (student) {
        // Nếu đã có data trong danh sách, dùng luôn
        setExpandedStudentData(student);
      } else {
        // Nếu chưa có, fetch từ API
        fetch(`${API_ENDPOINTS.STUDENTS}/${studentId}`)
          .then((res) => res.json())
          .then((data) => setExpandedStudentData(data))
          .catch((err) => {
            console.log(err.message);
            alert('Không thể tải thông tin chi tiết');
          });
      }
    }
  };

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
        <div className="table-header-actions">
          <Link to="/student/create" className="btn btn-add">Add New Student</Link>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm theo tên, ID hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                // Đóng expanded row khi search thay đổi
                setExpandedRowId(null);
                setExpandedStudentData(null);
              }}
            />
            {searchTerm && (
              <button
                className="search-clear"
                onClick={() => {
                  setSearchTerm('');
                  setExpandedRowId(null);
                  setExpandedStudentData(null);
                }}
                title="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>
        </div>
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
            {Array.isArray(filteredStudents) && filteredStudents.length > 0 ? filteredStudents.map((student,index) => (
              <>
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>
                    <span 
                      className="student-name-clickable"
                      onClick={() => handleNameClick(student.id)}
                    >
                      {student.name}
                    </span>
                  </td>
                  <td>{student.place}</td>
                  <td>{student.phone}</td>
                  <td>
                    <button onClick={() => DisplayDetails(student.id)} className="btn btn-view">View</button>
                    <button onClick={() => RemoveDetails(student.id)} className="btn btn-delete">Delete</button>
                    <button onClick={() => EditDetails(student.id)} className="btn btn-edit">Edit</button>
                  </td>
                </tr>
                {/* Hàng mở rộng hiển thị chi tiết */}
                {expandedRowId === student.id && expandedStudentData && (
                  <tr key={`${student.id}-details`} className="expanded-row">
                    <td colSpan="5" className="expanded-row-cell">
                      <div className="student-details-panel">
                        <h3 className="details-title">
                          Chi tiết sinh viên
                        </h3>
                        <div className="details-grid">
                          <div>
                            <strong className="detail-label">ID:</strong>
                            <span>{expandedStudentData.id}</span>
                          </div>
                          <div>
                            <strong className="detail-label">Tên:</strong>
                            <span>{expandedStudentData.name}</span>
                          </div>
                          <div>
                            <strong className="detail-label">Nơi ở:</strong>
                            <span>{expandedStudentData.place}</span>
                          </div>
                          <div>
                            <strong className="detail-label">Số điện thoại:</strong>
                            <span>{expandedStudentData.phone}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleNameClick(student.id)}
                          className="btn-close"
                        >
                          Đóng
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            )) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  {searchTerm ? (
                    `Không tìm thấy kết quả cho "${searchTerm}"`
                  ) : (
                    'No students found. Add a new student to get started!'
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}