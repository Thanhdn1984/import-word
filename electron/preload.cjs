const { contextBridge, ipcRenderer } = require('electron');

// --- ĐỒNG BỘ 100% VỚI main.cjs VÀ GIAO DIỆN REACT ---

contextBridge.exposeInMainWorld('electronAPI', {
  // 1. Dùng ở tab "Chọn Mẫu": Mở cửa sổ chọn MỘT hoặc NHIỀU file .docx
  selectFiles: () => ipcRenderer.invoke('select-files'),

  // 2. Dùng ở tab "Chọn Mẫu": Mở cửa sổ chọn một THƯ MỤC để đọc file .docx bên trong
  selectFolder: () => ipcRenderer.invoke('select-folder'),

  // 3. Dùng ở tab "Tạo Tài Liệu": Mở cửa sổ chọn thư mục ĐỂ LƯU file kết quả
  selectSaveFolder: () => ipcRenderer.invoke('select-save-folder'),
  
  // 4. Dùng ở tab "Soạn Thảo": Mở một file .docx để chỉnh sửa
  openTemplateFile: () => ipcRenderer.invoke('open-template-file'),

  // 5. Đọc nội dung một thư mục (dùng sau khi gọi selectFolder)
  readDirectory: (folderPath, options) => ipcRenderer.invoke('read-directory', folderPath, options),
  
  // 6. Đọc dữ liệu (buffer) của một file bất kỳ
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),

  // 7. Ghi file (lưu kết quả đã tạo)
  saveFile: (options) => ipcRenderer.invoke('write-file', options),

  // --- Quản lý Cấu hình (Preset) ---
  listPresets: () => ipcRenderer.invoke('load-presets'),
  loadPreset: (name) => ipcRenderer.invoke('load-preset', name),
  savePreset: (name, data) => ipcRenderer.invoke('save-preset', name, data),
  deletePreset: (name) => ipcRenderer.invoke('delete-preset', name),

  // --- Chức năng đặc biệt ---
  // Trích xuất biến từ file cho chế độ "Chuyển đổi ngược"
  extractPlaceholders: (fileContent) => ipcRenderer.invoke('extract-placeholders', fileContent)
});
