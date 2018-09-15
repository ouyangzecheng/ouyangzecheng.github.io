window.onload = function () {

    var shaixuan = document.getElementById("shaixuan");
    var fenlei = document.getElementById("fenlei-nei");
    var quanbu = fenlei.nextElementSibling;
    var moshi = shaixuan.children[0].children[2].children;
    var banben = shaixuan.children[1].children[2].children;
    var xueke = shaixuan.children[2].children[2].children;
    var nianji = shaixuan.children[3].children[2].children;
    var paixu = shaixuan.children[4].children[2].children;

    myFn(moshi);
    myFn(banben);
    myFn(xueke);
    myFn(nianji);

    //给所有分类前面的全部加点击事件
    shaixuan.children[0].children[1].onclick = quanbuOnclick;
    shaixuan.children[1].children[1].onclick = quanbuOnclick;
    shaixuan.children[2].children[1].onclick = quanbuOnclick;
    shaixuan.children[3].children[1].onclick = quanbuOnclick;
    shaixuan.children[4].children[1].onclick = quanbuOnclick;

    function myFn(id) {
        for(var i=0; i<id.length; i++){
            id[i].index = i;
            id[i].onclick = function () {
                for(var j=0; j<id.length; j++){
                    id[j].style.color = "#444";
                }
                id[this.index].style.color = "#22b287";

                var that = this;
                if(fenlei.children.length === 0){
                    chuanjian(id, that);
                }else{
                    var zhen;
                    for(var i=0; i<fenlei.children.length; i++){
                        if(fenlei.children[i].className === id[0].parentNode.parentNode.className + "name"){
                            zhen = true;
                            // fenlei.children[i].innerHTML = id[this.index].innerHTML + "<span class=\"iconfont icon-guanbi\"></span>";
                            break;
                        }else{
                            zhen = false;
                            //chuanjian(id, that);
                        }
                    }
                    if(zhen === true){
                        fenlei.children[i].innerHTML = id[this.index].innerHTML + "<span class=\"iconfont icon-guanbi\"></span>";
                    }else{
                        chuanjian(id, that);
                    }
                }

                shanchu();
            }
        }
    }

    //单个条件删除效果
    function shanchu(){
        var newboxClick = fenlei.getElementsByTagName("span");
        for(var i=0; i<newboxClick.length; i++){
            newboxClick[i].onclick = function(){
                for(var n=0; n<newboxClick.length; n++){
                    newboxClick[n].index = n;
                }
                var newbox2 = newboxClick[this.index].parentNode;
                //console.log(newboxClick[this.index].parentNode)

                var xiao = shaixuan.getElementsByClassName(newboxClick[this.index].parentNode.className.replace(/name/ig, ''));
                xiao = xiao[0].children[2].children;

                fenlei.removeChild(newbox2);
                for(var j=0; j<xiao.length; j++){
                    if(xiao[j].innerHTML === newbox2.childNodes[0].nodeValue){
                        xiao[j].style.color = "#444";
                        break;
                    }
                }
            };
        }
    }

    //条件创建效果
    function chuanjian(id, that){
        var newbox = document.createElement("p");
        newbox.innerHTML = id[that.index].innerHTML + "<span class=\"iconfont icon-guanbi\"></span>";
        newbox.className = id[0].parentNode.parentNode.className + "name";

        fenlei.insertBefore(newbox, fenlei.children[fenlei.length]);
    }

    //清理全部按钮效果
    quanbu.onclick = function () {
        if(fenlei.children.length > 0){
            var quanbubox = fenlei.children;
            var m = quanbubox.length;
            for(var i=0; i<m; i++){
                fenlei.removeChild(quanbubox[0]);
            }

            for(var i=0; i<shaixuan.children.length; i++){
                for (var j=0; j<shaixuan.children[i].children[2].children.length; j++){
                    shaixuan.children[i].children[2].children[j].style.color = "#444";
                    //console.log(shaixuan.children[i].children[2].children[j])
                }
            }
            pxqinli()
        }
    };

    //下载，评分，浏览的排序筛选效果
    function paixuActive() {
        for(var i=0; i<paixu.length; i++){
            paixu[i].index = i;
            paixu[i].onclick = function () {

                if(this.index === 0){
                    shuju.sort(function (a, b) {
                        return a.down - b.down;
                    });
                }else if(this.index === 1){
                    shuju.sort(function (a, b) {
                        return a.comment - b.comment;
                    });
                }else{
                    shuju.sort(function (a, b) {
                        return a.up - b.up;
                    });
                }

                shuju.reverse();
                myAjax(shuju);

                pxqinli();
                paixu[this.index].style.color = "#22b287";
                paixu[this.index].children[0].style.color = "#22b287";
            }
        }
    }
    paixuActive();

    function pxqinli() {
        for(var j=0; j<paixu.length; j++){
            paixu[j].style.color = "#444";
            paixu[j].children[0].style.color = "#8d8d8d";
        }
    }

    //所有分类前面的全部点击效果
    function quanbuOnclick() {

        var allLi = "";
        if(this.nextElementSibling){
            allLi = this.nextElementSibling;
        }else{
            allLi = this.nextSibling;
        }

        for(var i=0; i<allLi.children.length; i++){
            allLi.children[i].style.color = "#444";

            if(allLi.children[i].children[0]){
                allLi.children[i].children[0].style.color = "#8d8d8d";
            }
        }
        if(allLi.children[0].children[0]){
            myAjax();
        }

        for(var i=0; i<fenlei.children.length; i++){
            if(this.parentNode.className + "name" === fenlei.children[i].className){
                fenlei.removeChild(fenlei.children[i]);
            }
        }
    }


    var neiLeft = document.getElementById("nei-b-left");
    //xunhuan(kechengxinxi);

    // function xunhuan(shuzu) {
    //     for(var i=0; i<shuzu.length; i++){
    //         var newbox = document.createElement('div');
    //         newbox.className = "box";
    //         newbox.innerHTML = "<div class=\"img\"><img src=\""+ shuzu[i].img +"\" alt=\"\"></div>\n" +
    //             "                <div class=\"text\">\n" +
    //             "                    <h6>"+ shuzu[i].geming +"</h6>\n" +
    //             "                    <p>简介：<span>所认真听完的第一首摇滚，这首歌曾唱哭了千万人。总是能够触动心底最软的地方，心抽痛着，眼圈红了，却没有眼泪渗出。</span></p>\n" +
    //             "                    <p>学段：<span>小学</span></p>\n" +
    //             "                    <p>上传时间：<span>2018-07-20</span></p>\n" +
    //             "                    <p>大小：<span>12.52MB</span></p>\n" +
    //             "                    <div class=\"icon\">\n" +
    //             "                        <div class=\"icon-left\">\n" +
    //             "                            <p>评分：</p>\n" +
    //             "                            <span class=\"iconfont icon-wujiaoxing\"></span>\n" +
    //             "                            <span class=\"iconfont icon-wujiaoxing\"></span>\n" +
    //             "                            <span class=\"iconfont icon-wujiaoxing\"></span>\n" +
    //             "                            <span class=\"iconfont icon-ai64\"></span>\n" +
    //             "                            <span class=\"iconfont icon-ai64\"></span>\n" +
    //             "                            <p>4.5</p>\n" +
    //             "                        </div>\n" +
    //             "                        <div class=\"icon-right\">\n" +
    //             "                            <p><span class=\"iconfont icon-chakan\"></span>267</p>\n" +
    //             "                            <p><span class=\"iconfont icon-zan\"></span>487</p>\n" +
    //             "                            <p><span class=\"iconfont icon-xihuan\"></span>64</p>\n" +
    //             "                            <p><span class=\"iconfont icon-xiazai\"></span>18</p>\n" +
    //             "                        </div>\n" +
    //             "                    </div>\n" +
    //             "                </div>";
    //
    //         neiLeft.appendChild(newbox);
    //     }
    // }

    var neiRight = document.getElementById("nei-b-right");
    for(var i=0; i<zhutitanjiumoshi.length; i++){
        var newbox = document.createElement('li');
        newbox.innerHTML = "<div class=\"img\"><img src=\""+ zhutitanjiumoshi[i].img +"\" alt=\"\"></div>\n" +
            "                    <div class=\"text\">\n" +
            "                        <h6>"+ zhutitanjiumoshi[0].name +"</h6>\n" +
            "                        <p>"+ zhutitanjiumoshi[0].jianjie +"</p>\n" +
            "                        <p>学科：<span>"+ zhutitanjiumoshi[0].xueke +"</span></p>\n" +
            "                        <p>讲师：<span>"+ zhutitanjiumoshi[0].jiangshi +"</span></p>\n" +
            "                    </div>";

        neiRight.appendChild(newbox);
    }

    var type = 2, page = 1, shuju;

    function myAjax(index) {
        var xmlhttp;
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest;
        }else{
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
        }
        xmlhttp.onreadystatechange = function () {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                if(index){
                    shuju = index;
                }else{
                    shuju = JSON.parse(xmlhttp.responseText).data;
                }
                var newbox = "";

                for(var i in shuju){
                    newbox += "<div class=\"box\"><div class=\"img\"><img src=\""+ shuju[i].header +"\" alt=\"\"></div>\n" +
                        "                <div class=\"text\">\n" +
                        "                    <h6>"+ shuju[i].text +"</h6>\n" +
                        "                    <p class=\"jianjie\">简介：<span>"+ shuju[i].text +"</span></p>\n" +
                        "                    <p>学段：<span>"+ shuju[i].username +"</span></p>\n" +
                        "                    <p>上传时间：<span>"+ shuju[i].passtime.substring(0, 10) +"</span></p>\n" +
                        "                    <p>大小：<span>12.52MB</span></p>\n" +
                        "                    <div class=\"icon\">\n" +
                        "                        <div class=\"icon-left\">\n" +
                        "                            <p>评分：</p>\n" +
                        "                            <span class=\"iconfont icon-wujiaoxing\"></span>\n" +
                        "                            <span class=\"iconfont icon-wujiaoxing\"></span>\n" +
                        "                            <span class=\"iconfont icon-wujiaoxing\"></span>\n" +
                        "                            <span class=\"iconfont icon-ai64\"></span>\n" +
                        "                            <span class=\"iconfont icon-ai64\"></span>\n" +
                        "                            <p>4.5</p>\n" +
                        "                        </div>\n" +
                        "                        <div class=\"icon-right\">\n" +
                        "                            <p><span class=\"iconfont icon-chakan\"></span>"+ shuju[i].up +"</p>\n" +
                        "                            <p><span class=\"iconfont icon-zan\"></span>"+ shuju[i].comment +"</p>\n" +
                        "                            <p><span class=\"iconfont icon-xihuan\"></span>"+ shuju[i].forward +"</p>\n" +
                        "                            <p><span class=\"iconfont icon-xiazai\"></span>"+ shuju[i].down +"</p>\n" +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        "                </div></div>";
                }
                neiLeft.innerHTML = newbox;
                console.log(shuju)
            }
        };

        xmlhttp.open("GET", "https://www.apiopen.top/satinGodApi?type=" + type + "&page=" + page, true);
        xmlhttp.send();
    }

    myAjax();

    
};








var kechengxinxi = [{
    img:"images/xinketan/1_07.png",
    geming:"经典歌曲",
    jianjie:"简首第歌曲唱万人，总是能够触痛人心底的万人，触痛人心底的万人，触痛人底的万人，触痛人底的万人，触痛人底的万人，触痛人底的万人，触痛人底软弱的地方。",
    xueduan:"小学",
    shijian:"2018-07-20",
    daxiao:"12.52MB",
    pinfen:"3.5星",
    kan:"267",
    zan:"487",
    xihuan:"222",
    xiazai:"45",
},{
    img:"images/xinketan/1_14.png",
    geming:"love me tender",
},{
    img:"images/xinketan/1_20.png",
    geming:"初中音乐九年级上册-康康舞曲",
},{
    img:"images/xinketan/1_24.png",
    geming:"初中音乐九年级上册-康康舞曲",
},{
    img:"images/xinketan/1_28.png",
    geming:"初中音乐九年级上册-康康舞曲",
}
];


var zhutitanjiumoshi = [{
    img:"images/xinketan/1_10.png",
    name:"十九大是见证中国特色社会主义核心价值观",
    jianjie:"让事物得以接近其最根本的存在，人在其中，慢慢的对一种事物由感官触摸...",
    xueke:"语文",
    jiangshi:"蔡明瀚",
},{
    img:"images/xinketan/1_15.png",
},{
    img:"images/xinketan/1_17.png",
},{
    img:"images/xinketan/1_21.png",
},{
    img:"images/xinketan/1_25.png",
}
];



