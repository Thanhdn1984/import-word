# 🚀 HƯỚNG DẪN SỬ DỤNG TOÀN TẬP - CÔNG CỤ TỰ ĐỘNG HÓA TÀI LIỆU

Chào mừng bạn đến với công cụ tự động hóa tài liệu! Tài liệu này là tất cả những gì bạn cần để cài đặt, sử dụng và khắc phục sự cố một cách hiệu quả nhất.

**QUAN TRỌNG:** Ứng dụng này **KHÔNG** thể hoạt động đầy đủ trên môi trường web (như Replit). Bạn **BẮT BUỘC** phải tải về máy tính Windows để sử dụng các tính năng cốt lõi như chọn và tạo file.

---

## ⚡ BƯỚC 1: CÀI ĐẶT (Chỉ làm 1 lần duy nhất)

### 1.1. Tải dự án về máy tính

Cách đơn giản nhất là tải file ZIP đã được chuẩn bị sẵn:

1.  Trong giao diện Replit, nhìn sang cừa sổ **Files** (📁) bên trái.
2.  Tìm file có tên `docx-automation-tool.zip`.
3.  Click chuột phải vào file đó và chọn **"Download"**.
4.  Sau khi tải về, giải nén file ZIP này vào một thư mục bất kỳ trên máy tính của bạn (ví dụ: `D:\MyApp`).

### 1.2. Cài đặt Node.js

Node.js là môi trường cần thiết để chạy ứng dụng.

1.  Truy cập trang web: [https://nodejs.org](https://nodejs.org)
2.  Tải về phiên bản **LTS** (Recommended For Most Users).
3.  Chạy file cài đặt vừa tải về và làm theo các bước hướng dẫn (chỉ cần Next > Next > Install).
4.  **QUAN TRỌNG:** Khởi động lại máy tính sau khi cài đặt xong.

### 1.3. Cài đặt các gói phụ thuộc (Dependencies)

Đây là bước để tải về các "thư viện" mà dự án cần để hoạt động.

1.  Mở thư mục dự án bạn đã giải nén ở bước 1.1.
2.  Trên thanh địa chỉ của thư mục (chỗ hiển thị `D:\MyApp`), gõ chữ `cmd` và nhấn **Enter**.
3.  Một cửa sổ dòng lệnh (màu đen) sẽ hiện ra. Gõ lệnh sau vào cửa sổ đó và nhấn **Enter**:
    ```bash
    npm install
    ```
4.  Đợi khoảng 2-5 phút để quá trình cài đặt hoàn tất. Khi nó kết thúc và bạn có thể gõ chữ tiếp, nghĩa là đã xong.

**Chúc mừng, bạn đã cài đặt xong!** Giờ hãy chuyển qua bước tiếp theo để chạy ứng dụng.

---

## 🚀 BƯỚC 2: KHỞI ĐỘNG ỨNG DỤNG (Cách sử dụng hàng ngày)

Sau khi cài đặt, mỗi lần muốn sử dụng, bạn chỉ cần làm theo cách dưới đây.

**CÁCH TỐT NHẤT VÀ AN TOÀN NHẤT:**

▶️ **Click đúp chuột vào file `CHAY_AN_TOAN.bat`**

**Điều gì sẽ xảy ra?**
1.  Một cửa sổ dòng lệnh sẽ hiện ra để khởi động server.
2.  Nó sẽ yêu cầu bạn **nhấn phím bất kỳ** sau khi server đã sẵn sàng.
3.  Sau khi bạn nhấn phím, cửa sổ ứng dụng chính (Electron) sẽ mở ra.

Cách này đảm bảo ứng dụng luôn khởi động đúng và ổn định.

---

## 📖 BƯỚC 3: SỬ DỤNG ỨNG DỤNG

### 3.1. Phân biệt chế độ Desktop và chế độ Web

Đây là điều quan trọng nhất để tránh nhầm lẫn.

*   **✓ Chế độ Desktop (ĐÚNG):**
    *   Có banner màu **XANH LÁ** ở góc trên bên phải ghi: `✓ Chế độ Desktop - Đầy đủ tính năng`.
    *   Đây là một cửa sổ ứng dụng riêng, **không** có thanh địa chỉ trình duyệt.
    *   **Mọi tính năng hoạt động**: Chọn file, chọn thư mục, tạo tài liệu...

*   **⚠️ Chế độ Web (SAI khi dùng ở máy):**
    *   Có banner màu **VÀNG** ở góc trên bên phải ghi: `⚠️ Chế độ Web - Tải về máy...`.
    *   Đây là một tab trong trình duyệt (Chrome, Edge...) có địa chỉ `http://localhost:5000`.
    *   **Tính năng bị hạn chế**: Bạn sẽ gặp lỗi khi cố gắng chọn file hoặc thư mục.

> **LỜI KHUYÊN:** Luôn đảm bảo bạn đang làm việc trên cửa sổ có **BANNER MÀU XANH**. Nếu thấy banner vàng, hãy đóng tab trình duyệt đó đi và chỉ sử dụng cửa sổ ứng dụng đã mở.

### 3.2. Quy trình làm việc

1.  **Quản lý trường dữ liệu:**
    *   Vào tab **"Quản lý trường"**.
    *   Tại đây, bạn định nghĩa các "biến" mà bạn sẽ sử dụng trong tài liệu (ví dụ: `ho_ten`, `so_cmnd`, `so_tien_vay`).
    *   Thêm, sửa, xóa các trường cho phù hợp với nhu cầu của bạn.

2.  **Nhập dữ liệu:**
    *   Vào tab **"Nhập dữ liệu"**.
    *   Điền thông tin tương ứng vào các ô đã được tạo ra từ bước 1.

3.  **Chuẩn bị mẫu Word (.docx):**
    *   Mở Microsoft Word, soạn một tài liệu mẫu.
    *   Tại những vị trí cần điền thông tin tự động, hãy chèn tên trường bạn đã định nghĩa ở bước 1 vào giữa hai dấu ngoặc nhọn.
    *   **Ví dụ:** `Kính gửi Ông/Bà: {ho_ten}, số CMND: {so_cmnd}.`
    *   Lưu file Word với định dạng `.docx`.

4.  **Chọn mẫu và Tạo file:**
    *   Vào tab **"Chọn mẫu"**, nhấn nút **"Chọn file"** hoặc **"Chọn thư mục"** để tải các file mẫu `.docx` của bạn lên.
    *   Chuyển qua tab **"Tạo file"**.
    *   Nhấn **"Chọn thư mục lưu file"** để chỉ định nơi lưu các tài liệu sẽ được tạo ra.
    *   Nhấn nút **"Tạo tài liệu"**.

Hệ thống sẽ tự động lấy dữ liệu bạn đã nhập, điền vào các mẫu Word và lưu kết quả vào thư mục bạn đã chọn.

---

## 🆘 BƯỚC 4: KHẮC PHỤC SỰ CỐ THƯỜNG GẶP

### Vấn đề 1: Sau khi chạy `CHAY_AN_TOAN.bat`, ứng dụng không mở.

*   **Nguyên nhân 1:** Bạn chưa chạy `npm install`.
    *   **Giải pháp:** Làm lại **Bước 1.3**.
*   **Nguyên nhân 2:** Antivirus hoặc Windows Defender đã chặn ứng dụng.
    *   **Giải pháp:** Tạm thời tắt antivirus và thử lại. Nếu thành công, hãy thêm thư mục dự án vào danh sách "loại trừ" (Exclusion list) của phần mềm diệt virus.
*   **Nguyên nhân 3:** Port 5000 đang bị một ứng dụng khác chiếm dụng.
    *   **Giải pháp:** File `CHAY_AN_TOAN.bat` đã được thiết kế để tự động xử lý vấn đề này. Nếu vẫn không được, hãy khởi động lại máy tính.

### Vấn đề 2: Thấy banner màu VÀNG thay vì màu XANH.

*   **Nguyên nhân:** Bạn đang nhìn nhầm vào tab trình duyệt thay vì cửa sổ ứng dụng.
*   **Giải pháp:** Đóng tất cả các tab trình duyệt có địa chỉ `http://localhost:5000` lại. Tìm và chuyển sang cửa sổ ứng dụng (có thể nó đang bị ẩn sau các cửa sổ khác, dùng `Alt + Tab` để tìm).

### Vấn đề 3: Báo lỗi "Chức năng này chỉ hoạt động trong ứng dụng Electron".

*   **Nguyên nhân:** Đây chính là hệ quả của việc bạn đang ở "Chế độ Web" (banner vàng).
*   **Giải pháp:** Xem lại "Vấn đề 2".

### Vấn đề 4: Lỗi `... is not recognized as an internal or external command...`

*   **Nguyên nhân:** Node.js chưa được cài đặt đúng cách hoặc bạn chưa khởi động lại máy sau khi cài.
*   **Giải pháp:** Cài lại Node.js (Bước 1.2) và **nhớ khởi động lại máy tính**.

### Nếu mọi thứ đều thất bại:

1.  **Chạy file gỡ lỗi:** Click đúp vào file `CHAY_DEBUG.bat`. Nó sẽ kiểm tra và báo cáo các vấn đề tiềm ẩn trong hệ thống của bạn.
2.  **Reset toàn bộ dự án:**
    *   Xóa thư mục `node_modules`.
    *   Xóa file `package-lock.json`.
    *   Chạy lại `npm install` từ đầu (Bước 1.3).

---

Chúc bạn sử dụng công cụ hiệu quả!
