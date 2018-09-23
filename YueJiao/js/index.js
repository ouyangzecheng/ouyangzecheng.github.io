window.onload = function () {
    var nav = document.getElementById("nav").children;

    for(var i=0; i<nav.length; i++){
        nav[i].index = i;
        nav[i].onclick = function () {
            for(var j=0; j<nav.length; j++){
                nav[j].className = "";
            }
            nav[this.index].className = "active";
        }
    }


    var drawing = document.getElementById("drawing"),
        huanData = document.getElementById("huan-data");
        context = drawing.getContext("2d"),
        n = 1,
        n2 = 1,
        rad = Math.PI * 2 / 100;



    //确定浏览器是否支持<canvas>元素
    if(drawing.getContext){
        function writeCircle() {
            //第一个圆的底
            //开始路径
            context.beginPath();
            //绘制外圆
            context.arc(100, 100, 70, -1.5, 2*Math.PI, false);

            //描边路径
            context.lineWidth = 18;
            context.lineCap = "round";
            context.strokeStyle = "#ffffff";
            context.stroke();


            //第二个圆的底
            //开始路径
            context.beginPath();
            //绘制外圆
            context.arc(320, 100, 70, -1.5, 2*Math.PI, false);

            //描边路径
            context.strokeStyle = "#ffffff";
            context.stroke();
        }
        
        function writeText(n, n2) {
            context.beginPath();
            context.fillStyle = "#fff";
            context.font = "30px Arial";
            context.fillText(n.toFixed(0)+"%", 72, 110);
            context.fillText(n2.toFixed(0)+"%", 290, 110);
        }
        
        function writeBlue(n, n2) {
            //开始路径
            context.beginPath();
            //绘制外圆
            context.arc(100, 100, 70, -Math.PI/2,-Math.PI/2+ rad*n, false);

            //描边路径
            context.lineWidth = 18;
            context.lineCap = "round";
            context.strokeStyle = "#adff30";
            context.stroke();


            //第二个圆的面
            //开始路径
            context.beginPath();
            //绘制外圆
            context.arc(320, 100, 70, -Math.PI/2,-Math.PI/2+ rad*n2, false);

            //描边路径
            context.strokeStyle = "#ffd821";
            context.stroke();
        }

        function DreamLoading() {
            context.clearRect(0, 0, drawing.width, drawing.height);

            writeCircle();
            writeText(n, n2);
            writeBlue(n, n2);
            if(n < 62){
                n = n + 1;
            }else{
                n = 62;
            }
            if(n2 < 79){
                n2 = n2 + 1;
            }else{
                n2 = 79;
            }
            huanData.children[0].getElementsByTagName("h5")[0].innerHTML = n + "%";
            huanData.children[1].getElementsByTagName("h5")[0].innerHTML = n2 - 1 + "%";

            if(n >= 62 && n2 >= 79){
                DreamLoading = null;
            }else{
                window.requestAnimationFrame = window.requestAnimationFrame||function (fn) {return setTimeout(fn,1000/60)};
                window.cancelAnimationFrame = window.cancelAnimationFrame ||clearTimeout;
                window.requestAnimationFrame(DreamLoading);
            }

        }
        DreamLoading();

    }else{
        alert("不支持");
    }


    var boxMove = document.getElementById("xian-move").children;
    var boxGunDon = document.getElementById("xian-move");

    for (var i=0; i<5; i++){
        var tianjia = boxMove[i].cloneNode(true);
        boxGunDon.insertBefore(tianjia, boxGunDon.children[5+i]);
    }

    for(var i=0; i<boxMove.length; i++){

        boxMove[i].style.top = i * boxMove[i].offsetHeight + 'px';
        //console.log(i * boxMove[0].offsetHeight)
    }



    function gundon() {
        boxGunDon.style.top = boxGunDon.offsetTop - 1 +'px';
        if(boxGunDon.offsetTop <= -475){
            boxGunDon.style.top = '0px';
        }
    }
    var timer = setInterval(gundon,30);

    var donBox = document.getElementById("don-box");
    donBox.onmouseover = function () {
        clearInterval(timer);
    };
    donBox.onmouseout = function () {
        timer = setInterval(gundon, 30);
    };

    var quyuHY = document.getElementById("quyuhuoyue");
    var xuexiaoHY = document.getElementById("xuexiaohuoyue");
    var laoshiHY = document.getElementById("laoshihuanyin");
    PaiMing(quyuHY, quyupaihang, "访问量");
    PaiMing(xuexiaoHY, xuexiaohuoyue, "活跃度");
    PaiMing(laoshiHY, laoshihuanyin, "点赞");

    function PaiMing(id, data, caozuo) {
        for(var i=0; i<data.length; i++){
            var han = document.createElement('div');
            han.className = "box-han";
            han.innerHTML = "<span></span>\n" +
                "                        <div class=\"text\">\n" +
                "                            <p>"+ data[i].name +"</p>\n" +
                "                            <p>"+caozuo+"<span>"+ data[i].fanwen +"</span></p>";

            if(i>2){
                han.children[0].innerHTML = data[i].id;
            }else{
                han.children[0].innerHTML = "<img src=\""+ data[i].id +"\" alt=\"\">";
            }
            id.appendChild(han);
        }
    }


    //接口
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var xinwen = JSON.parse(xmlhttp.responseText);
            //console.log(xinwen.data)

            var zixun = document.getElementById("zixun").children;
            for(var i=0; i<2; i++){
                //console.log(zixun[i].children[1]);
                zixun[i].children[0].src = xinwen.data.auto[i].picInfo[0].url;
                zixun[i].children[1].children[1].innerHTML = xinwen.data.auto[i].ptime;
                zixun[i].children[2].innerHTML = xinwen.data.auto[i].title;
            }

            var xinwenList = document.getElementById("xinwenlist").children;
            var xinwenLi = "";
            for(var i=0; i<xinwenList.length; i++){
                xinwenLi += "<li><a href=\"javascript:;\">"+xinwen.data.dy[i].title+"</a><span>"+xinwen.data.dy[i].ptime.substring(5,10)+"</span></li>";
                // xinwenLi += `
                //     <li><a href="javascript:;">${xinwen.data.dy[i].title}</a><span>${xinwen.data.dy[i].ptime.substring(5,10)}</span></li>
                // `;
                // xinwenList[i].children[0].innerHTML = xinwen.data.dy[i].title;
                // xinwenList[i].children[1].innerHTML = xinwen.data.dy[i].ptime.substring(5,10);
            }
            document.getElementById("xinwenlist").innerHTML = xinwenLi;
        }
    };

    xmlhttp.open("GET", "https://www.apiopen.top/journalismApi", true);
    xmlhttp.send();



    function IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion === 7) {
                return 7;
            } else if(fIEVersion === 8) {
                return 8;
            } else if(fIEVersion === 9) {
                return 9;
            } else if(fIEVersion === 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }
        } else if(isEdge) {
            return 'edge';//edge
        } else if(isIE11) {
            return 11; //IE11
        }else{
            return -1;//不是ie浏览器
        }
    }

};









var quyupaihang = [{
    id:"images/index/1_85.png",
    name:"广州市",
    fanwen:"894156"
    },{
    id:"images/index/1_88.png",
    name:"佛山市",
    fanwen:"784523"
},{
    id:"images/index/1_90.png",
    name:"中山市",
    fanwen:"756923"
},{
    id:"4",
    name:"深圳市",
    fanwen:"710926"
},{
    id:"5",
    name:"汕头市",
    fanwen:"679327"
},{
    id:"6",
    name:"湛江市",
    fanwen:"654390"
}
];

var xuexiaohuoyue = [{
    id:"images/index/1_85.png",
    name:"广州同和小学",
    fanwen:"54372"
},{
    id:"images/index/1_88.png",
    name:"广州京溪小学",
    fanwen:"52896"
},{
    id:"images/index/1_90.png",
    name:"广州南方小学",
    fanwen:"49837"
},{
    id:"4",
    name:"广州天河小学",
    fanwen:"45892"
},{
    id:"5",
    name:"广州越秀小学",
    fanwen:"43892"
},{
    id:"6",
    name:"广州海珠小学",
    fanwen:"39823"
}
];

var laoshihuanyin = [{
    id:"images/index/1_85.png",
    name:"蔡明翰",
    fanwen:"54372"
},{
    id:"images/index/1_88.png",
    name:"张晓迷",
    fanwen:"52896"
},{
    id:"images/index/1_90.png",
    name:"吴丽斯",
    fanwen:"49837"
},{
    id:"4",
    name:"贺客",
    fanwen:"45892"
},{
    id:"5",
    name:"广泽民",
    fanwen:"43892"
},{
    id:"6",
    name:"格地厉",
    fanwen:"39823"
}
];






