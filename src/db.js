function saveAll(){
    savePw();
    saveNotes();
    saveContacts();
}

function savePw(_list, _key){
    var _arr = [];
    _list.forEach(e => {
        var _obj = {
            a: EncryptMsg (e.name, _key),
            b: EncryptMsg (e.username, _key),
            c: EncryptMsg (e.pw, _key),
            d: EncryptMsg (e.web, _key),
            e: EncryptMsg (e.folder, _key),
            f: EncryptMsg (String(e.id), _key),
            g: EncryptMsg (String(e.created), _key),
            h: EncryptMsg (String(e.lastUsed), _key),
            i: EncryptMsg (String(e.timesUsed), _key),
        } 
        _arr.push(_obj);
    });

    localStorage.setItem("list1",  JSON.stringify(_arr));
}

function saveNotes(_list, _key){
    var _arr = [];
    _list.forEach(e => {
        var _obj = {
            a: EncryptMsg (e.name, _key),
            b: EncryptMsg (e.note, _key),
            c: EncryptMsg (e.folder, _key),
            d: EncryptMsg (String(e.id), _key),
        } 
        _arr.push(_obj);
    });

    localStorage.setItem("list2",  JSON.stringify(_arr));
}

function saveContacts(_list, _key){
    var _arr = [];
    _list.forEach(e => {
        var _obj = {
            a: EncryptMsg (e.name, _key),
            b: EncryptMsg (e.number, _key),
            c: EncryptMsg (e.email, _key),
            d: EncryptMsg (e.bday, _key),
            e: EncryptMsg (e.street, _key),
            f: EncryptMsg (e.city, _key),
            g: EncryptMsg (String(e.id), _key),
        } 
        _arr.push(_obj);
    });

    localStorage.setItem("list3",  JSON.stringify(_arr));
}

function loadAll(){
    loadPw();
    loadNotes();
    loadContacts(); 
}

function LoadPw(_key){
    var _temp = JSON.parse(localStorage.getItem("list1"));
    if(_temp == null) return [];
    var _arr = [];
    _temp.forEach(e =>{
        var _obj = {
            name: DecryptMsg (e.a, _key),
            username: DecryptMsg (e.b, _key),
            pw: DecryptMsg (e.c, _key),
            web: DecryptMsg (e.d, _key),
            folder: DecryptMsg (e.e, _key),
            id: DecryptMsg (e.f, _key),
            created: DecryptMsg (e.g, _key),
            lastUsed: DecryptMsg (e.h, _key),
            timesUsed: parseInt(DecryptMsg (e.i, _key)),
            type: "password"
        } 
        _arr.push(_obj);
    });
    return _arr;
}

function LoadNotes(_key){
    var _temp = JSON.parse(localStorage.getItem("list2"));
    if(_temp == null) return [];
    var _arr = [];
    _temp.forEach(e =>{
        var _obj = {
            name: DecryptMsg (e.a, _key),
            note: DecryptMsg (e.b, _key),
            folder: DecryptMsg (e.c, _key),
            id: DecryptMsg (e.d, _key),
            type: "note"
        } 
        _arr.push(_obj);
    });
    return _arr;
}

function LoadContacts(_key){
    var _temp = JSON.parse(localStorage.getItem("list3"));
    if(_temp == null) return [];
    var _arr = [];
    _temp.forEach(e =>{
        var _obj = {
            name: DecryptMsg (e.a, _key),
            number: DecryptMsg (e.b, _key),
            email: DecryptMsg (e.c, _key),
            bday: DecryptMsg (e.d, _key),
            street: DecryptMsg (e.e, _key),
            city: DecryptMsg (e.f, _key),
            id: DecryptMsg (e.g, _key),
            type: "contact"
        } 
        _arr.push(_obj);
    });
    return _arr;
}



function checkIfUserExists(){
    
    if(JSON.parse(localStorage.getItem("user")) != null) {
        return true;
    } else return false;
}

function RegisterUser(_key){
    localStorage.setItem("user",  JSON.stringify(EncryptMsg ("decypted", _key)));
}

function CheckPassword(_pw){
    if(DecryptMsg (JSON.parse(localStorage.getItem("user")), _pw) === "decypted"){
        return true;
    } else return false;
}

function SaveSessionCookie(_key){
    sessionStorage.setItem("sessionCookie", EncryptMsg (_key, "J58yS7q3"));
}

function GetSessionCookie(){
    if(sessionStorage.getItem("sessionCookie") == null) return null;
    var _temp = sessionStorage.getItem("sessionCookie");
    return (DecryptMsg (_temp, "J58yS7q3"));
}

function SaveSettings(){
    var temp = {
        pwLength: GetSettingPwLenght(), 
        lower: GetSettingLower(),
        upper: GetSettingUpper(),
        numbers: GetSettingNumber(),
        symbols: GetSettingSymbol()
    }

    localStorage.setItem("settings",  JSON.stringify(temp));
}

function LoadSettings(){
    var _temp = JSON.parse(localStorage.getItem("settings"));
    if(_temp == null) return;
    SetSettingPwLenght(_temp.pwLength);
    SetSettingLower(_temp.lower);
    SetSettingUpper(_temp.upper);
    SetSettingNumber(_temp.numbers);
    SetSettingSymbol(_temp.symbols);
}

function getCurrentId(){
    var _temp = JSON.parse(localStorage.getItem("id"));
    if(_temp == null) return 0;
    return _temp;
}

function saveCurrentId(_id){
    localStorage.setItem("id", JSON.stringify(_id + 1));
}

function SaveSortingType(_type){
    localStorage.setItem("sortingType", JSON.stringify(_type));
}

function getSortingType(){
    var _temp = JSON.parse(localStorage.getItem("sortingType"));
    if(_temp == null) return "lastUsed";
    return _temp;
}