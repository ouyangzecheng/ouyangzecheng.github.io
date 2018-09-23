window.onload = function () {

    var paihan = document.getElementById("paihang");
    var tonji = document.getElementById("tonji");
    PaiMing(paihan, paihang);
    PaiMing(tonji, tonjiData);



    function PaiMing(id, data) {
        for(var i=0; i<data.length; i++){
            var han = document.createElement('li');
            han.innerHTML = "<span></span>\n" +
                "                        <div class=\"text\">\n" +
                "                            <p>"+ data[i].name +"</p>\n" +
                "                            <p>"+ data[i].shuliang +"</p>";

            if(data === paihang){
                if(i>2){
                    han.children[0].innerHTML = data[i].id;
                }else{
                    han.children[0].innerHTML = "<img src=\""+ data[i].id +"\" alt=\"\">";
                }
            }

            if(data === tonjiData){
                han.children[0].className = data[i].icon;
                han.children[0].style.color = data[i].color;
            }

            id.appendChild(han);
        }
    }


    var fankeUl = document.getElementById("fangkeUl");
    fankeFn();
    function fankeFn() {
        for(var i=0; i<zuijinfanke.length; i++){
            var newLi = document.createElement('li');
            newLi.innerHTML = "<div><img src=\""+ zuijinfanke[i].img +"\" alt=\"\"></div>\n" +
                "                    <h6>"+ zuijinfanke[i].name +"</h6>\n" +
                "                    <p>"+ zuijinfanke[i].date +"</p>";

            fankeUl.appendChild(newLi);
        }
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



}


var paihang = [{
    id:"images/gonzuoshi/pai1.png",
    name:"胡小勇",
    shuliang:"1166",
},{
    id:"images/gonzuoshi/pai2.png",
    name:"练冰",
    shuliang:"216",
},{
    id:"images/gonzuoshi/pai3.png",
    name:"缪春玲",
    shuliang:"109",
},{
    id:"4",
    name:"陈萍",
    shuliang:"100",
},{
    id:"5",
    name:"程碧桃",
    shuliang:"88",
},{
    id:"6",
    name:"邹姗姗",
    shuliang:"85",
},{
    id:"7",
    name:"邹宁",
    shuliang:"58",
},{
    id:"8",
    name:"陈国浩",
    shuliang:"51",
},{
    id:"9",
    name:"朱剑潮",
    shuliang:"49",
},{
    id:"10",
    name:"高展",
    shuliang:"48",
}
];

var tonjiData = [{
    icon:"iconfont icon-chengyuan",
    color:"#54adf6",
    name:"成员数",
    shuliang:"130",
},{
    icon:"iconfont icon-wenzhang",
    color:"#fc9968",
    name:"文章数",
    shuliang:"189",
},{
    icon:"iconfont icon-ziyuan",
    color:"#fc7678",
    name:"资源数",
    shuliang:"585",
},{
    icon:"iconfont icon-keti",
    color:"#79d232",
    name:"课题研究数",
    shuliang:"2",
},{
    icon:"iconfont icon-ketang",
    color:"#647ff4",
    name:"名师课堂数",
    shuliang:"14",
},{
    icon:"iconfont icon-jiaoyanhuodon",
    color:"#fab64b",
    name:"教研活动数",
    shuliang:"15",
},{
    icon:"iconfont icon-wangshangpingke",
    color:"#947be6",
    name:"网上评课数",
    shuliang:"0",
},{
    icon:"iconfont icon-huati",
    color:"#47ca9a",
    name:"话题数",
    shuliang:"17",
},{
    icon:"iconfont icon-jifen",
    color:"#f672c0",
    name:"积分数",
    shuliang:"2232",
}
];

var zuijinfanke = [{
    img:"images/gonzuoshi/tou2.png",
    name:"张勇",
    date:"4小时前",
},{
    img:"images/gonzuoshi/tou-man.png",
    name:"蔡玉令",
    date:"6小时前",
},{
    img:"images/gonzuoshi/tou-grli.png",
    name:"张婷婷",
    date:"昨天",
},{
    img:"images/gonzuoshi/tou-grli.png",
    name:"邱丽婷",
    date:"昨天",
},{
    img:"images/gonzuoshi/tou-man.png",
    name:"姚辉池",
    date:"昨天",
},{
    img:"images/gonzuoshi/tou-grli.png",
    name:"李馥坤",
    date:"前天",
},{
    img:"images/gonzuoshi/tou-grli.png",
    name:"张成",
    date:"前天",
},{
    img:"images/gonzuoshi/tou-man.png",
    name:"李灼平",
    date:"前天",
},{
    img:"images/gonzuoshi/tou-man.png",
    name:"郑明明",
    date:"前天",
}
];





















