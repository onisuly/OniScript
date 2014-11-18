;Ctrl + N 新建文件夹
;WIN7
^n::
DetectHiddenWindows, on
if WinActive("ahk_class CabinetWClass") or WinActive("ahk_class WorkerW") {
    send ^+n
}
else {
    Hotkey ^n, Off
    send ^n
    Hotkey ^n, On
}
Return