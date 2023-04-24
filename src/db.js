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
    _arr = [];
    _temp.forEach(e =>{
        var _obj = {
            name: DecryptMsg (e.a, _key),
            username: DecryptMsg (e.b, _key),
            pw: DecryptMsg (e.c, _key),
            web: DecryptMsg (e.d, _key),
            folder: DecryptMsg (e.e, _key),
            type: "password"
        } 
        _arr.push(_obj);
    });
    return _arr;
}

function LoadNotes(_key){
    var _temp = JSON.parse(localStorage.getItem("list2"));
    if(_temp == null) return [];
    _arr = [];
    _temp.forEach(e =>{
        var _obj = {
            name: DecryptMsg (e.a, _key),
            note: DecryptMsg (e.b, _key),
            folder: DecryptMsg (e.c, _key),
            type: "note"
        } 
        _arr.push(_obj);
    });
    return _arr;
}

function LoadContacts(_key){
    var _temp = JSON.parse(localStorage.getItem("list3"));
    if(_temp == null) return [];
    _arr = [];
    _temp.forEach(e =>{
        var _obj = {
            name: DecryptMsg (e.a, _key),
            number: DecryptMsg (e.b, _key),
            email: DecryptMsg (e.c, _key),
            bday: DecryptMsg (e.d, _key),
            street: DecryptMsg (e.e, _key),
            city: DecryptMsg (e.f, _key),
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
