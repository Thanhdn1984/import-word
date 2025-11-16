# Công cụ tự động hóa tài liệu ngân hàng

## Overview
Ứng dụng desktop để tự động hóa việc tạo hồ sơ tín dụng từ mẫu Word. Công cụ cho phép nhập thông tin một lần và tạo hàng loạt file Word từ nhiều mẫu khác nhau.

## Tech Stack
- **Frontend**: React 18 + Vite
- **Desktop**: Electron (for production)
- **UI**: Tailwind CSS with banking theme (navy/teal colors)
- **Document Processing**: docxtemplater, pizzip
- **Utilities**: date-fns, numeral.js

## Project Structure
```
/
├── electron/           # Electron main process
│   ├── main.js        # Main process with IPC handlers
│   └── preload.js     # Preload script for context bridge
├── src/
│   ├── components/    # React components
│   │   ├── DataForm.jsx          # Form for data entry
│   │   ├── FieldManager.jsx      # Field customization
│   │   ├── TemplateSelector.jsx  # Template selection
│   │   ├── PresetManager.jsx     # Preset management
│   │   └── GeneratePanel.jsx     # Document generation
│   ├── utils/
│   │   └── documentGenerator.js  # Core document generation logic
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Key Features

### Implemented (MVP) ✅
1. ✅ Customizable field system (add/remove/edit fields)
2. ✅ Multiple data types (text, number, date, currency, textarea, list)
3. ✅ Tabbed form interface by category (7 categories)
4. ✅ Template selection (single/multi-file and folder with subfolder support)
5. ✅ Preset save/load system with persistent storage
6. ✅ Batch document generation with progress tracking
7. ✅ Smart validation (required fields, missing templates)
8. ✅ Professional banking UI (navy/teal theme, Vietnamese language)
9. ✅ Offline-first architecture (no external APIs, 100% local processing)
10. ✅ Data type formatting (currency: VNĐ format, dates: dd/MM/yyyy, lists: numbered)

### Future Enhancements
- Reverse template (auto-detect placeholders from filled documents)
- Import/Export preset packages (.zip with embedded templates)
- Document preview before generation (requires DOCX viewer)
- Repeating table rows for dynamic lists
- Conditional blocks (if/else logic in templates)
- Image insertion (CMND/CCCD, asset photos)

## Development

### Chạy ứng dụng (1 click)
```bash
npm start
```
Hoặc click đúp vào file `start.bat` (Windows) hoặc `start.sh` (Mac/Linux)

### Chế độ phát triển (Web)
```bash
npm run dev
```
Server chạy trên http://localhost:5000

### Build sản phẩm
```bash
npm run build
npm run dist
```

## Field Categories
- **customer**: Thông tin khách hàng
- **residence**: Hộ khẩu - Cư trú  
- **income**: Thu nhập - Công việc
- **loan**: Khoản vay đề nghị
- **collateral**: Tài sản đảm bảo
- **credit**: Lịch sử tín dụng
- **business**: Hộ kinh doanh / Doanh nghiệp

## Recent Changes
- 2024-11-16: Hoàn thành và cải tiến UX
  - ✅ Thêm hướng dẫn sử dụng ngay trong app (tự động hiện khi mở lần đầu)
  - ✅ Nút "Trợ giúp" để xem lại hướng dẫn bất cứ lúc nào
  - ✅ Gợi ý và tips hiển thị ở mỗi tab
  - ✅ Script chạy đơn giản: `npm start` hoặc click đúp file start.bat/start.sh
  - ✅ README.md chi tiết bằng tiếng Việt
  - ✅ Việt hóa 100% toàn bộ giao diện
  - ✅ Cải thiện thông báo và hướng dẫn người dùng

## Notes
- Application is designed to work 100% offline for security
- No data is sent to external servers
- All file processing happens locally
- Presets are stored in user data directory
- Electron API required for file system operations (file selection, read/write)

## Color Theme
- Primary Navy: #1e3a5f
- Teal: #0891b2
- Light: #e0f2fe
- Dark: #0c4a6e
