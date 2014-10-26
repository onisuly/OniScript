Left::  MouseMove, -15,  0, 5, R
Up::    MouseMove,  0, -15, 5, R
Right:: MouseMove,  15,  0, 5, R
Down::  MouseMove,  0,  15, 5, R
Space:: Click
^Space:: 
KeyIsDown := GetKeyState("LButton")
if( KeyIsDown == 1 ) {
    MouseClick,,,,,,U
}
else {
    MouseClick,,,,,,D
}
return