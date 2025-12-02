// backend/server.js
// Tạo server, cài đặt thư viện
const express = require('express'); //người quản lý server
const cors = require('cors'); //bảo vệ cho phép một trang web gọi dữ liệu từ 1 server
const bodyParser = require('body-parser'); // phiên dịch json

const app = express();
app.use(cors()); 
app.use(bodyParser.json()); 

// Fake Database chạy trong Ram
let users = [
    { id: 1, name: "Nguyễn Văn A" },
    { id: 2, name: "Trần Thị B" }
];

// 1. READ
app.get('/api/users', (req, res) => {
    res.json(users);
});

// 2. CREATE
app.post('/api/users', (req, res) => {
    const newUser = {
        id: Date.now(),  //tạo id 
        name: req.body.name //lấy tên từ fe
    };
    users.push(newUser); //ném vào db
    res.json({ message: "Đã thêm thành công!", user: newUser });
});

// 3. UPDATE
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newName = req.body.name;
    const userIndex = users.findIndex(u => u.id === id);// tìm user theo id
    if (userIndex !== -1) {
        users[userIndex].name = newName; // gán tên mới
        res.json({ message: "Đã sửa thành công!" });
    } else {
        res.status(404).json({ message: "Không tìm thấy user" });
    }
});

// 4. DELETE
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);
    res.json({ message: "Đã xóa thành công!" });
});

app.listen(3000, () => {
    console.log('Backend đang chạy tại: http://localhost:3000');
});