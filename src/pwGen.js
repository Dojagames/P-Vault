function GeneratePassword(_length, _lower, _upper, _numbers, _symbols){
    _chars = "";
    if(_lower) _chars += "abcdefghijklmnopqrstuvwxyz";
    if(_upper) _chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(_numbers) _chars += "0123456789";
    if(_symbols) _chars += "!@#$%^&*()-_=+;:'/|\\,.<>\"`~"
}