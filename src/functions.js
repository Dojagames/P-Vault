function GetFaviconLink(url){

    if(url.substring(0,4) == "http" || url.substring(0,5) == "https"){
        return new URL(url).host + "/favicon.ico";
    } else {
        return "http://" + new URL("http://"+ url).host + "/favicon.ico";
    }
}