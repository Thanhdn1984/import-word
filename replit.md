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

### Implemented (MVP)
1. ✅ Customizable field system (add/remove/edit fields)
2. ✅ Multiple data types (text, number, date, currency, image, textarea)
3. ✅ Tabbed form interface by category
4. ✅ Template selection (single/multi-file and folder)
5. ✅ Preset save/load system
6. ✅ Batch document generation
7. ✅ Validation system
8. ✅ Professional banking UI (Vietnamese language)

### Planned
- Reverse template (auto-detect placeholders from filled documents)
- Import/Export preset packages (.zip)
- Document preview before generation
- Repeating table rows
- Conditional blocks (if/else)
- Image insertion in documents

## Development

### Running in Development Mode (Web)
```bash
npm run dev
```
Server runs on http://localhost:5000

### Running as Desktop App
```bash
npm run electron:dev
```

### Building for Production
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
- 2024-01-16: Initial project setup with Electron + React + Vite
- 2024-01-16: Implemented core UI components and field management
- 2024-01-16: Added template selection and preset management
- 2024-01-16: Implemented document generation with docxtemplater

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
