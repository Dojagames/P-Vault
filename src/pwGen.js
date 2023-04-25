function GeneratePassword(
_length = settingPwLenght, 
_lower = settingLower, 
_upper = settingUpper, 
_numbers = settingNumber, 
_symbols = settingSymbol)
{
    _chars = "";
    if(_lower) _chars += "abcdefghijklmnopqrstuvwxyz";
    if(_upper) _chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(_numbers) _chars += "0123456789";
    if(_symbols) _chars += "!@#$%^&*()-_=+;:'/|\\,.<>\"`~"

    _pw = "";

    for (var i = 0; i < _length; i++){
        _pw += _chars.charAt(Math.floor(Math.random() * _chars.length));
    }
    return _pw;
}

var settingPwLenght = 12;
var settingLower = true;
var settingUpper = true;
var settingNumber = true;
var settingSymbol = true;


//getter
function GetSettingPwLenght(){
    return settingPwLenght;
}

function GetSettingLower(){
    return settingLower;
}

function GetSettingUpper(){
    return settingUpper;
}

function GetSettingNumber(){
    return settingNumber;
}

function GetSettingSymbol(){
    return settingSymbol;
}

//setter
function SetSettingPwLenght(_return){
    settingPwLenght = _return;
}

function SetSettingLower(_return){
    settingLower = _return;
}

function SetSettingUpper(_return){
    settingUpper = _return;
}

function SetSettingNumber(_return){
    settingNumber = _return;
}

function SetSettingSymbol(_return){
    settingSymbol = _return;
}