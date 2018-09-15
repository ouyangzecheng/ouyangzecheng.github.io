window.onload = function () {
    //var fanBottom = document.getElementById("fan-bottom");

    // for(var i=0; i<fanzhuanketan.length; i++){
    //     var box = document.createElement("div");
    //     box.className = "box";
    //     box.innerHTML = "<div><img src=\""+ fanzhuanketan[i].img +"\" alt=\"\"></div>\n" +
    //         "                <h6>"+ fanzhuanketan[0].name +"</h6>\n" +
    //         "                <p>"+ fanzhuanketan[0].jianjie +"</p>\n" +
    //         "                <div class=\"caozuo\">\n" +
    //         "                    <p class=\"iconfont icon-zan\">&nbsp;"+ fanzhuanketan[0].zan +"</p>\n" +
    //         "                    <p class=\"iconfont icon-xihuan\">&nbsp;"+ fanzhuanketan[0].xihuan +"</p>\n" +
    //         "                </div>";
    //
    //     fanBottom.appendChild(box);
    // }

    function myFn(zhi, zhi2, zhi3) {
        for(var i=0; i<zhi.length; i++){
            var box = document.createElement("div");
            box.className = "box";
            box.innerHTML = "<div><img src=\""+ zhi[i].img +"\" alt=\"\"></div>\n" +
                "                <h6><span>"+ zhi3 +"</span>"+ zhi[i].biaoti +"</h6>\n" +
                "                <p><span>指导专家：</span>"+ zhi[0].name +"</p>\n" +
                "                <p><span>讲课教师：</span>"+ zhi[0].name2 +"</p>\n" +
                "                <p><span>学习目标：</span>"+ zhi[0].mubiao +"</p>";
            zhi2.appendChild(box);
        }
    }

    var wenBottom = document.getElementById("wen-bottom");
    var zhuBottom = document.getElementById("zhu-bottom");
    myFn(wentijiejue, wenBottom, "活动");
    myFn(zhutitanjiu, zhuBottom, "教研");

    document.getElementById("fanzhuan").children[0].index = "auto";
    document.getElementById("fanzhuan").children[1].index = "dy";
    document.getElementById("fanzhuan").children[2].index = "ent";

    document.getElementById("wenti").children[0].index = "money";
    document.getElementById("wenti").children[1].index = "sports";
    document.getElementById("wenti").children[2].index = "tech";

    document.getElementById("zhuti").children[0].index = "toutiao";
    document.getElementById("zhuti").children[1].index = "ent";
    document.getElementById("zhuti").children[2].index = "war";


    myList("fanzhuan");
    myList("wenti");
    myList("zhuti");

    function myList(id) {
        var fanLi = document.getElementById(id).children;
        for(var i=0; i<fanLi.length; i++){
            fanLi[i].index2 = i;
            fanLi[i].onclick = function () {
                for(var j=0; j<fanLi.length; j++){
                    fanLi[j].className = "";
                }
                fanLi[this.index2].className = "active";
                var newId = "";
                if(id === "fanzhuan"){
                    newId = "fan-bottom";
                }else if(id === "wenti"){
                    newId = "wen-bottom";
                }else{
                    newId = "zhu-bottom";
                }
                myAjax(id, newId);
            }
        }
    }



    function myAjax(id, id2){

        var xmlhttp;
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        }else{
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var fanBottom = document.getElementById(id2);
        xmlhttp.onreadystatechange = function () {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                var xinwen = JSON.parse(xmlhttp.responseText);
                var ce = document.getElementById(id).getElementsByClassName("active");
                xinwen = xinwen.data[ce[0].index];

                var fanbox = "";
                console.log(xinwen)
                for(var i in xinwen){
                    if(xinwen[i].tcount != null && id === "fanzhuan" && xinwen[i].picInfo[0] != undefined && i <= 8){
                        fanbox += "<div class=\"box\"><div><img src=\""+ xinwen[i].picInfo[0].url +"\" alt=\"images/peixun/1_07.png\"></div>\n" +
                            "                <h6>"+ xinwen[i].title +"</h6>\n" +
                            "                <p>"+ xinwen[i].digest +"</p>\n" +
                            "                <div class=\"caozuo\">\n" +
                            "                    <p class=\"iconfont icon-zan\">&nbsp;"+ fanzhuanketan[0].zan +"</p>\n" +
                            "                    <p class=\"iconfont icon-xihuan\">&nbsp;"+ fanzhuanketan[0].xihuan +"</p>\n" +
                            "                </div></div>";
                    }else if(xinwen[i].tcount != null && id != "fanzhuan" && xinwen[i].picInfo[0] != undefined && i <= 8){
                        fanbox += "<div class=\"box\"><div><img src=\""+ xinwen[i].picInfo[0].url +"\" alt=\"images/peixun/1_07.png\"></div>\n" +
                            "                <h6><span>"+ xinwen[i].category +"</span>"+ xinwen[i].title +"</h6>\n" +
                            "                <p><span>指导专家：</span>"+ xinwen[i].source +"</p>\n" +
                            "                <p><span>讲课教师：</span>"+ xinwen[i].source +"</p>\n" +
                            "                <p><span>学习目标：</span>"+ xinwen[i].digest +"</p></div>";
                    }
                }

                fanBottom.innerHTML = fanbox;
            }
        };

        xmlhttp.open("GET", "https://www.apiopen.top/journalismApi", true);
        xmlhttp.send();
    }
    myAjax("fanzhuan", "fan-bottom");
    myAjax("wenti", "wen-bottom");
    myAjax("zhuti", "zhu-bottom");


};





var fanzhuanketan = [{
    img:"images/peixun/1_07.png",
    name:"翻转课堂创新变式",
    jianjie:"简介：广州市教育研究院教研室州市教育研究院教研室州市教育研究院教研室...",
    zan:"213",
    xihuan:"658",
},{
    img:"images/peixun/1_09.png",
},{
    img:"images/peixun/1_11.png",
},{
    img:"images/peixun/1_13.png",
},{
    img:"images/peixun/1_19.png",
},{
    img:"images/peixun/1_20.png",
},{
    img:"images/peixun/1_21.png",
},{
    img:"images/peixun/1_22.png",
}]


var wentijiejue = [{
    img:"images/peixun/1_28.png",
    biaoti:"加强学校安全教育",
    name:"张倩瑜",
    name2:"张倩瑜",
    mubiao:"发展适合的教育，就是要致力于解决过去没有解决或者没有解决好，以及在教育过程中出现的新问题。",
},{
    img:"images/peixun/1_30.png",
    biaoti:"中小学生减负得向课程",
},{
    img:"images/peixun/1_32.png",
    biaoti:"初步了解自然爱护动物",
},{
    img:"images/peixun/1_34.png",
    biaoti:"浅析问题解决模式教学",
},{
    img:"images/peixun/1_40.png",
    biaoti:"加强学校安全教育",
},{
    img:"images/peixun/1_41.png",
    biaoti:"中小学生减负得向课程",
},{
    img:"images/peixun/1_42.png",
    biaoti:"初步了解自然爱护动物",
},{
    img:"images/peixun/1_43.png",
    biaoti:"浅析问题解决模式教学",
}
]

var zhutitanjiu = [{
    img:"images/peixun/1_48.png",
    biaoti:"加强学校安全教育",
    name:"张倩瑜",
    name2:"张倩瑜",
    mubiao:"发展适合的教育，就是要致力于解决过去没有解决或者没有解决好，以及在教育过程中出现的新问题。",
},{
    img:"images/peixun/1_49.png",
    biaoti:"中小学生减负得向课程",
},{
    img:"images/peixun/1_50.png",
    biaoti:"初步了解自然爱护动物",
},{
    img:"images/peixun/1_51.png",
    biaoti:"浅析问题解决模式教学",
},{
    img:"images/peixun/1_56.png",
    biaoti:"加强学校安全教育",
},{
    img:"images/peixun/1_57.png",
    biaoti:"中小学生减负得向课程",
},{
    img:"images/peixun/1_58.png",
    biaoti:"初步了解自然爱护动物",
},{
    img:"images/peixun/1_59.png",
    biaoti:"浅析问题解决模式教学",
}
]

