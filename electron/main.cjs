const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs/promises');
const mammoth = require('mammoth');

// --- ĐÃ SỬA LỖI TOÀN DIỆN ---

const isProd = app.isPackaged;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
    title: 'Công cụ tự động hóa tài liệu ngân hàng',
    autoHideMenuBar: true,
    show: false,
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (isProd) {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  } else {
    mainWindow.loadURL('http://localhost:5000');
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// === IPC HANDLERS - ĐỒNG BỘ HÓA 100% VỚI GIAO DIỆN ===

// 1. CHỌN FILE (Tab Chọn Mẫu)
ipcMain.handle('select-files', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Word Documents', extensions: ['docx'] }],
  });
  return { canceled, filePaths };
});

// 2. CHỌN THƯ MỤC (Tab Chọn Mẫu)
ipcMain.handle('select-folder', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
    });
    return { canceled, filePaths };
});

// 3. CHỌN THƯ MỤC LƯU (Tab Tạo Tài Liệu)
ipcMain.handle('select-save-folder', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
    });
    return { canceled, filePaths };
});


// 4. ĐỌC NỘI DUNG THƯ MỤC (Dùng sau khi CHỌN THƯ MỤC)
ipcMain.handle('read-directory', async (event, dirPath, options) => {
    try {
        const dirents = await fs.readdir(dirPath, { withFileTypes: true });
        const files = await Promise.all(dirents.map(async (dirent) => {
            const res = path.resolve(dirPath, dirent.name);
            if (dirent.isDirectory() && options && options.includeSubfolders) {
                const subFilesResult = await ipcMain.handle('read-directory', event, res, options);
                return subFilesResult.success ? subFilesResult.files : [];
            } 
            return dirent.name.toLowerCase().endsWith('.docx') ? res : null;
        }));
        
        const flattenedFiles = files.flat().filter(file => file !== null);
        return { success: true, files: flattenedFiles };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// 5. GHI FILE (Lưu file kết quả)
ipcMain.handle('write-file', async (event, { filePath, data }) => {
  try {
    await fs.writeFile(filePath, data);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi ghi file:", error);
    return { success: false, error: error.message };
  }
});


// 6. Đọc buffer của một file
ipcMain.handle('read-file', async (event, filePath) => {
    try {
        const buffer = await fs.readFile(filePath);
        return { success: true, data: buffer };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// 7. MỞ FILE SOẠN THẢO
ipcMain.handle('open-template-file', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Word Documents', extensions: ['docx'] }],
  });
  if (canceled || filePaths.length === 0) {
    return { canceled: true };
  }
  const filePath = filePaths[0];
  try {
    const buffer = await fs.readFile(filePath);
    return { canceled: false, filePath, fileContent: buffer.toString('base64') }; // Gửi base64
  } catch (error) {
    return { canceled: true, error: error.message };
  }
});

// 8. TRÍCH XUẤT BIẾN
ipcMain.handle('extract-placeholders', async (event, fileContent) => {
    try {
        const buffer = Buffer.from(fileContent, 'base64');
        const result = await mammoth.extractRawText({ buffer });
        const text = result.value;
        const regex = /{\s*([\w\d_.]+)\s*}/g;
        const matches = [...text.matchAll(regex)];
        const placeholders = matches.map(match => match[1]);
        return { success: true, placeholders: [...new Set(placeholders)] }; // Trả về các biến duy nhất
    } catch (error) {
        return { success: false, error: error.message };
    }
});


// --- Quản lý Preset ---
const presetPath = path.join(app.getPath('userData'), 'presets');

async function ensurePresetDir() {
    try {
        await fs.mkdir(presetPath, { recursive: true });
    } catch (e) {
        console.error("Không thể tạo thư mục cho preset:", e);
    }
}

ipcMain.handle('load-presets', async () => {
    await ensurePresetDir();
    const files = await fs.readdir(presetPath);
    return files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
});

ipcMain.handle('save-preset', async (event, name, data) => {
    await ensurePresetDir();
    const filePath = path.join(presetPath, `${name}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return { success: true };
});

ipcMain.handle('load-preset', async (event, name) => {
    await ensurePresetDir();
    const filePath = path.join(presetPath, `${name}.json`);
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch(e) {
        return null;
    }
});

ipcMain.handle('delete-preset', async (event, name) => {
    await ensurePresetDir();
    const filePath = path.join(presetPath, `${name}.json`);
    try {
        await fs.unlink(filePath);
        return { success: true };
    } catch(e) {
        return { success: false, error: e.message };
    }
});