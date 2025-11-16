import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    title: 'Công cụ tự động hóa tài liệu ngân hàng',
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:5000');
    // DevTools tắt để tránh nhầm lẫn - Nhấn F12 trong app nếu cần debug
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('select-files', async (event, options = {}) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Word Documents', extensions: ['docx'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    ...options
  });
  return result;
});

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result;
});

ipcMain.handle('select-save-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'createDirectory']
  });
  return result;
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const data = await fs.readFile(filePath);
    return { success: true, data: Array.from(data) };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-file', async (event, filePath, data) => {
  try {
    await fs.writeFile(filePath, Buffer.from(data));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('read-directory', async (event, dirPath, options = {}) => {
  try {
    const files = [];
    
    async function scanDir(currentPath) {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        
        if (entry.isFile() && entry.name.endsWith('.docx')) {
          files.push(fullPath);
        } else if (entry.isDirectory() && options.includeSubfolders) {
          await scanDir(fullPath);
        }
      }
    }
    
    await scanDir(dirPath);
    return { success: true, files };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-app-path', async () => {
  return app.getPath('userData');
});

ipcMain.handle('save-preset', async (event, presetData) => {
  try {
    const userDataPath = app.getPath('userData');
    const presetsDir = path.join(userDataPath, 'presets');
    
    await fs.mkdir(presetsDir, { recursive: true });
    
    const presetPath = path.join(presetsDir, `${presetData.name}.json`);
    await fs.writeFile(presetPath, JSON.stringify(presetData, null, 2));
    
    return { success: true, path: presetPath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('load-presets', async () => {
  try {
    const userDataPath = app.getPath('userData');
    const presetsDir = path.join(userDataPath, 'presets');
    
    try {
      await fs.mkdir(presetsDir, { recursive: true });
      const files = await fs.readdir(presetsDir);
      const presets = [];
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await fs.readFile(path.join(presetsDir, file), 'utf-8');
          presets.push(JSON.parse(content));
        }
      }
      
      return { success: true, presets };
    } catch (error) {
      return { success: true, presets: [] };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
});
