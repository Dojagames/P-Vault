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
    _arr = [];
    _temp.forEach(e =>{
        var _obj = {
            name: DecryptMsg (e.a, _key),
            username: DecryptMsg (e.b, _key),
            pw: DecryptMsg (e.c, _key),
            web: DecryptMsg (e.d, _key),
            folder: DecryptMsg (e.e, _key),
        } 
        _arr.push(_obj);
    });
    return _arr;
}

function loadNotes(_key){
    var _temp = JSON.parse(localStorage.getItem("list2"));
    _arr = [];
    _temp.forEach(e =>{
        var _obj = {
            name: DecryptMsg (e.a, _key),
            note: DecryptMsg (e.b, _key),
            folder: DecryptMsg (e.c, _key),
        } 
        _arr.push(_obj);
    });
    return _arr;
}

function loadContacts(_key){
    var _temp = JSON.parse(localStorage.getItem("list3"));
    _arr = [];
    _temp.forEach(e =>{
        var _obj = {
            name: DecryptMsg (e.a, _key),
            number: DecryptMsg (e.b, _key),
            email: DecryptMsg (e.c, _key),
            bday: DecryptMsg (e.d, _key),
            street: DecryptMsg (e.e, _key),
            city: DecryptMsg (e.f, _key),
        } 
        _arr.push(_obj);
    });
    return _arr;
}

function GetList(){
    return [
        {name: "testname", username: "testuser", pw: "testPw", web: "https://google.com", folder: "none", type: "password"},
        {name: "testname2", username: "testuser", pw: "testPw", web: "testwebsite.org", folder: "none", type: "password"},
        {name: "testname3", username: "testuser", pw: "testPw", web: "testwebsite.org", folder: "none", type: "password"},
    ]
}