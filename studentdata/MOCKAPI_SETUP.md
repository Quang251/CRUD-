# Hướng dẫn thiết lập MockAPI

## Bước 1: Kiểm tra Resource trên MockAPI

1. Đăng nhập vào [MockAPI.io](https://mockapi.io/)
2. Vào Dashboard của project
3. Xem danh sách Resources - ghi lại **tên chính xác** của resource (có thể không phải "students")

## Bước 2: Test API trực tiếp

Mở browser và truy cập URL này (thay `students` bằng tên resource thực tế):

```
https://692bf36ec829d464006e0a4d.mockapi.io/students
```

**Kết quả mong đợi:**
- ✅ `[]` (empty array) → Resource tồn tại, đúng tên
- ❌ `404 Not Found` → Resource không tồn tại hoặc tên sai

## Bước 3: Tạo Resource mới (nếu chưa có)

1. Trên MockAPI dashboard, click **"New Resource"**
2. Đặt tên resource: `students` (hoặc tên bạn muốn)
3. Thêm các fields:
   - `name` (String)
   - `place` (String)  
   - `phone` (String)
   - `id` (String) - Optional, MockAPI tự tạo
4. Click **"Create"**

## Bước 4: Cập nhật config.js

Nếu tên resource KHÔNG phải là `students`, cập nhật file `src/config.js`:

```javascript
export const API_ENDPOINTS = {
  STUDENTS: `${API_BASE_URL}/your-actual-resource-name`  // Thay đổi ở đây
};
```

## Bước 5: Test lại

1. Refresh trang web
2. Mở Console (F12)
3. Kiểm tra xem còn lỗi 404 không
4. Thử tạo student mới

