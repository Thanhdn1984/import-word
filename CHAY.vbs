Set WshShell = CreateObject("WScript.Shell")
' Chạy CHAY.bat ở chế độ ẩn (không hiện terminal)
WshShell.Run "cmd /c CHAY.bat", 0, False
Set WshShell = Nothing
