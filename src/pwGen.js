function GeneratePassword(_length, _lower = true, _upper = true, _numbers = true, _symbols = true){
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