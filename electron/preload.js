import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  selectFiles: (options) => ipcRenderer.invoke('select-files', options),
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  selectSaveFolder: () => ipcRenderer.invoke('select-save-folder'),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, data) => ipcRenderer.invoke('write-file', filePath, data),
  readDirectory: (dirPath, options) => ipcRenderer.invoke('read-directory', dirPath, options),
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  savePreset: (presetData) => ipcRenderer.invoke('save-preset', presetData),
  loadPresets: () => ipcRenderer.invoke('load-presets'),
});
