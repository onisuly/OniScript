;F4编辑文件
F4::
DetectHiddenWindows, on
if WinActive("ahk_class CabinetWClass") or WinActive("ahk_class WorkerW") {
    ClipSaved := ClipboardAll
    clipboard = 
    send ^c
    while ( !FileExist( clipboard ) )
    {
        sleep, 10
    }
    Run notepad %clipboard%
    Clipboard := ClipSaved
}
else {
    Hotkey F4, Off
    send {F4}
    Hotkey F4, On
}
Return