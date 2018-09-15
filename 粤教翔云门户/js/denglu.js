window.onload = function () {

    //记住密码点击
    var jizhumima = document.getElementById("jizhumima");
    jizhumima.onclick = function () {
        if(jizhumima.className === "iconfont icon-zhengque"){
            jizhumima.className = "";
            jizhumima.index = "no";
        }else{
            jizhumima.className = "iconfont icon-zhengque";
            jizhumima.index = "yes";
        }
    };

    //input焦点事件
    var Iname = document.getElementById("name");
    var Ipassword = document.getElementById("password");
    var denglu = document.getElementById("denglu");
    var tishi = document.getElementById("tishi");
    var Zname = document.getElementById("zhu_name");
    var Zphone = document.getElementById("zhu_phone");
    var Zpassword = document.getElementById("zhu_password");
    Iname.onclick = function () {
        Iname.previousElementSibling.style.color = "#45c9bc";
        Ipassword.previousElementSibling.style.color = "#d7dee3";
        stopBubble(Iname)
    };
    Ipassword.onclick = function () {
        Ipassword.previousElementSibling.style.color = "#45c9bc";
        Iname.previousElementSibling.style.color = "#d7dee3";
        stopBubble(Ipassword)
    };
    Zname.onclick = function(){
        iconColor(Zname, Zphone, Zpassword);
    };
    Zphone.onclick = function(){
        iconColor(Zphone, Zname, Zpassword);
    };
    Zpassword.onclick = function(){
        iconColor(Zpassword, Zname, Zphone);
    };

    document.getElementsByTagName("body")[0].onclick = function () {
        Ipassword.previousElementSibling.style.color = "#d7dee3";
        Iname.previousElementSibling.style.color = "#d7dee3";
        Zname.previousElementSibling.style.color = "#d7dee3";
        Zphone.previousElementSibling.style.color = "#d7dee3";
        Zpassword.previousElementSibling.style.color = "#d7dee3";
    };
    function iconColor(active, icon, icon2) {
        active.previousElementSibling.style.color = "#45c9bc";
        icon.previousElementSibling.style.color = "#d7dee3";
        if(icon2){
            icon2.previousElementSibling.style.color = "#d7dee3";
        }
        stopBubble(active);
    }

    //定义AJAX函数
    var xmlhttp;
    function loadXml(fanfa, url, cfunc, chuan) {
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        }else{
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = cfunc;
        xmlhttp.open(fanfa, url, true);
        if(chuan){
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(chuan);
        }else{
            xmlhttp.send();
        }
    }

    //提出cookie中保存的账号密码
    Iname.value = getCookie("phone");

    //登录结果
    function myAjax(){
        if(Iname.value === "" || Ipassword.value === ""){
            tishi.innerHTML = "请输入账号密码"
            return;
        }
        var myname = "https://www.apiopen.top/login?key=00d91e8e0cca2b76f515926a36db68f5&phone=" + Iname.value + "&passwd=" + Ipassword.value;
        loadXml("GET", myname, function(){
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
                var mydata = JSON.parse(xmlhttp.responseText);
                if(mydata.code === 200){
                    setCookie("phone",mydata.data.phone, 7);
                    if(jizhumima.index === "yes"){
                        setCookie("password",mydata.data.passwd, 7);
                    }else{
                        setCookie("password", mydata.data.passwd);
                    }

                    // window.location.href = document.referrer;
                    history.go(-1);
                }else{
                    tishi.innerHTML = mydata.msg;
                }
                //console.log(mydata.data.passwd);
            }
        })
    }

    denglu.onclick = function () {
        myAjax();
    };

    //取消事件冒泡
    function stopBubble(e) {
        if(e && e.stopPropagation){
            e.stopPropagation();
        }else{
            window.event.cancelBubble = true;
        }
    }

    //设置cookie保存
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires;
    }

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

    //头像上传
    var shangchuan = document.getElementById("shangchuan");
    var Ztouxiang = shangchuan.children[0].children[0];
    var Ztishi = document.getElementById("zhu_tishi");
    var touSrc = "";

    //预览头像1
    // shangchuan.children[1].onchange = function () {
    //     //获得本地头像链接
    //     touSrc = window.URL.createObjectURL(shangchuan.children[1].files[0]);
    //     Ztouxiang.src = touSrc;
    // };

    //预览头像2
    shangchuan.children[1].onchange = function () {
        var reader = new FileReader();
        reader.readAsDataURL(shangchuan.children[1].files[0]);
        reader.onload = function (e) {
            var result = shangchuan.children[0];
            result.innerHTML = '<img src="'+this.result+'" alt=""/>';
        }
    };

    //注册验证
    var phonePei = /^[1][3,4,5,7,8][0-9]{9}$/;
    var passwordPei = /\w/g;
    var zhuce = document.getElementById("zhuce");
    zhuce.onclick = function () {
        var name = Zname.value;
        var phone = Zphone.value;
        var password = Zpassword.value;
        if(name === ""){
            Ztishi.innerHTML = "用户名不能为空";
        }else if(!phonePei.test(phone)){
            Ztishi.innerHTML = "请输入正确的手机号";
        }else if(!passwordPei.test(password)){
            Ztishi.innerHTML = "请输入英文数字组合的密码，区分大小写";
        }else{
            zhuceFn();
        }
    };

    //提交注册信息
    function zhuceFn() {
        var url = "https://www.apiopen.top/createUser";
        var myurl = "&key=00d91e8e0cca2b76f515926a36db68f5&phone=" + Zphone.value + "&name=" + Zname.value + "&passwd=" + Zpassword.value + "&img=" + touSrc;
        loadXml("POST", url, function () {
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
                var mydata = JSON.parse(xmlhttp.responseText);
                console.log(mydata);
                if(mydata.code === 200){
                    Ztishi.innerHTML = "注册成功，3秒后返回登录";
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }else{
                    Ztishi.innerHTML = mydata.msg;
                }
            }
        }, myurl);
        console.log(myurl)
    }
    
    //登录注册切换
    var quzhuce = document.getElementById("quzhuce");
    var qudenglu = document.getElementById("qudenglu");
    var zhuceBj = document.getElementById("zhuce_bg");
    var dengluBj = document.getElementById("denglu_bj");
    
    quzhuce.onclick = function () {
        dengluBj.style.display = "none";
        zhuceBj.style.display = "block";
    };
    qudenglu.onclick = function () {
        dengluBj.style.display = "block";
        zhuceBj.style.display = "none";
    }
};