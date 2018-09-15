//获取cookie值
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++){
        var c = ca[i].trim();
        if(c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

//设置cookie保存
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

var phone = getCookie("phone");
var password = getCookie("password");

//定义AJAX函数
var xmlhttp;
function loadXml(url, cfunc) {
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = cfunc;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

var dengluAn = document.getElementById("denglu-an").children[0];
var touxiang = document.getElementById("touxiang");

//登录结果
function myAjax(){
    var myname = "https://www.apiopen.top/login?key=00d91e8e0cca2b76f515926a36db68f5&phone=" + phone + "&passwd=" + password;
    loadXml(myname, function(){
        if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
            var mydata = JSON.parse(xmlhttp.responseText);
            if(mydata.code === 200){
                touxiang.children[0].src = mydata.data.img;
                touxiang.children[1].innerHTML = mydata.data.name;
                touxiang.style.display = "inline";
            }else{
                dengluAn.style.display = "inline";
            }
        }
    })
}
myAjax();

var tuichu = touxiang.children[2];
tuichu.onclick = function () {
    setCookie("password","", 7);
    location.reload();
};

















