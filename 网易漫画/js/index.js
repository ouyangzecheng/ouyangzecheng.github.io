
window.onload=function(){
	// 下拉框
	var xiala = document.getElementsByClassName("xiala");
	var jingguo = document.getElementsByClassName("jingguo");

	for(var i=0;i<jingguo.length;i++){
		jingguo[i].index = i;
		jingguo[i].onmouseover=function(){
			for(var j=0;j<xiala.length;j++){
				xiala[this.index].style.display = "block";
				startMove(xiala[this.index], {top:63}, 30)
			}
		}

		jingguo[i].onmouseout=function(){
			var _this = this;
			for(var j=0;j<xiala.length;j++){
				startMove(xiala[_this.index], {top:50}, 30)
				xiala[_this.index].style.display = "none";
			}
		}
	}
	

	// tab点击
	var topTab = document.getElementById("top-tab");
	var topTabLi = topTab.getElementsByTagName("li");

	for(var i=0;i<topTabLi.length;i++){
		topTabLi[i].index = i;
		topTabLi[i].onclick=function(){
			for(var j=0;j<topTabLi.length;j++){
				topTabLi[j].className = "";
			}
			topTabLi[this.index].className = "active";
		}
	}

	//切换栏
	var qiehuan = document.getElementById("qiehuan");
	var qiehuanLeft = qiehuan.getElementsByClassName("left");
	var qiehuanRight = qiehuan.getElementsByClassName("right");

	qiehuan.onmouseover=()=>{
		startMove(qiehuanLeft[0], {left:0}, 20)
		startMove(qiehuanRight[0], {right:0}, 20)
		clearInterval(timer);
	}
	qiehuan.onmouseout=()=>{
		startMove(qiehuanLeft[0], {left:-35}, 20)
		startMove(qiehuanRight[0], {right:-35}, 20)
		timer = setInterval(leftMove,3000)
	}

	//轮播图
	var lunbo = document.getElementById("lunbo");
	var lunboLi = lunbo.getElementsByTagName("li");
	var dian = qiehuan.getElementsByClassName("dian");
	var dianLi = dian[0].getElementsByTagName("li");

	qiehuanRight[0].onclick=function(){
		dianLi[index].className = "";
		dianLi[(index+1 == dianLi.length)?0:index+1].className = "active";
			lunboLi[index].style.opacity = "0";
			index += 1;
			if(index == lunboLi.length){
				index = 0;
			}
			lunboLi[index].style.opacity = "1";
	}

	qiehuanLeft[0].onclick=function(){
		dianLi[index].className = "";
		dianLi[(index-1 < 0)?3:index-1].className = "active";
		lunboLi[index].style.opacity = "0";
		index -= 1;
		if(index < 0){
			index = 3;
		}
		lunboLi[index].style.opacity = "1";
	}

	var index = 0;
	function leftMove(){
		var lunbo = document.getElementById("lunbo");
		var lunboLi = lunbo.getElementsByTagName("li");
		var dian = qiehuan.getElementsByClassName("dian");
		var dianLi = dian[0].getElementsByTagName("li");

		dianLi[index].className = "";
		dianLi[(index+1 == dianLi.length)?0:index+1].className = "active";
		startMove(lunboLi[index], {opacity:0}, 70,)
		setTimeout(function(){
			lunboLi[index].style.opacity = "0";
			index += 1;
			if(index == lunboLi.length){
				index = 0;
			}
			startMove(lunboLi[index], {opacity:100}, 60)
		},600)
	}

	var timer = setInterval(leftMove,3000)

	//文字滚动条
	var gundon = document.getElementsByClassName("gundon");
	var gundonUl = gundon[0].getElementsByTagName("ul");
	var gundonLi = gundon[0].getElementsByTagName("li");
	var gundonA = gundon[0].getElementsByTagName("a");

	setInterval(function(){
		startMove(gundonUl[0], {top:gundonUl[0].offsetTop - gundon[0].offsetHeight + 2}, 30, false, function(){
			var arr = [];

			gundonUl[0].style.top = "0px";

			for(var i=0;i<gundonLi.length;i++){
				arr[i] = gundonLi[i];
			}

			var box = arr.splice(0, 1);
			arr.push(box[0])

			for(var i=0;i<arr.length;i++){
				gundonUl[0].appendChild(arr[i]);
			}

			gundonUl[0].style.width = gundonLi[0].style.width = gundonA[0].offsetWidth + "px";
		})
	},2000)


	//人气新更滚动
	var box1 = id("block-2-bottom").getElementsByClassName("box-1");
	var box1Ul = box1[0].getElementsByTagName("ul");
	var clickRight = id("block-2-bottom").getElementsByClassName("right");
	var clickLeft = id("block-2-bottom").getElementsByClassName("left");

	id("block-2-bottom").onmouseover=()=>{
		startMove(clickLeft[0], {left:0}, 20)
		startMove(clickRight[0], {right:0}, 20)
	}
	id("block-2-bottom").onmouseout=()=>{
		startMove(clickLeft[0], {left:-35}, 20)
		startMove(clickRight[0], {right:-35}, 20)
	}

	clickRight[0].onclick=()=>{
		startMove(box1Ul[0],{left: box1Ul[0].offsetLeft - box1[0].offsetWidth}, 30, false, ()=>{
			if(Math.abs(box1Ul[0].offsetLeft) >= box1[0].offsetWidth*4){
				box1Ul[0].style.left = "-890px"
			}
		})
	}
	clickLeft[0].onclick=()=>{
		startMove(box1Ul[0],{left: box1Ul[0].offsetLeft + box1[0].offsetWidth}, 30, false, ()=>{
			if(Math.abs(box1Ul[0].offsetLeft) <= 0){
				box1Ul[0].style.left = -box1[0].offsetWidth*3 + "px";
			}
		})
	}

	//本周排行
	function dPaiHang(){
		for(var i=0;i<BenZhouPaiHang.length;i++){
			var newLi = document.createElement("li");

			newLi.innerHTML = "<div class="+"pic"+"><img src="+"images/pic-3"+i+".jpg"+" alt="+" title="+"></div>"+
								"<div class="+"biao-1"+">"+BenZhouPaiHang[i]['id']+"</div>"+
							"<div class="+"txt"+">"+
								"<a href="+"javascript:;"+">"+BenZhouPaiHang[i]['name']+"</a>"+
								"<p>"+BenZhouPaiHang[i]['jieshao']+"</p>"+
								"<p>更至<span>"+BenZhouPaiHang[i]['genxin']+"</span></p>"+
								"<p><span class="+"icon-huo"+"></span>"+BenZhouPaiHang[i]['renqi']+"</p>"+
							"</div>";
			id("paihang").appendChild(newLi);

			newLi.className = "active";

			var Div = newLi.getElementsByTagName("div");
			if(i >= 3){
					Div[1].className = "biao-2";
				}
		}

		var Li = id("paihang").getElementsByTagName("li");

		Li[0].className = "";
		for(var i=0;i<Li.length;i++){
			Li[i].index = i;
			Li[i].onmouseover = function(){
				for(var j=0;j<Li.length;j++){
					Li[j].className = "active";
				}
				Li[this.index].className = "";
			}
		}

	}

	dPaiHang()
	

	//顶栏跟随滚动
	var isFirst = true;
	function topMove(){
		var top = document.getElementsByTagName("header");
		var bodyTop = document.documentElement.scrollTop || document.body.scrollTop;
		var banner = document.getElementsByClassName("banner");
		var Div = top[0].getElementsByTagName("div");

		if(bodyTop >= 400 && isFirst){
			isFirst = false;
			top[0].className = "header-top";
			top[0].style.top = "-64px";
			banner[0].style.marginTop = "64px";
			
			startMove(top[0], {top: 0}, 30)
		}else if(bodyTop <= 400 && isFirst == false){
			var timer = startMove(top[0], {top: -64}, 20, false, function(){
				top[0].className = "";
				top[0].style.top = "0px";
				banner[0].style.marginTop = "0px";
			})
			
			isFirst = true;
		}
		if(bodyTop == 0){
			timer = startMove(top[0], {top: 0}, 0)
			top[0].className = "";
			banner[0].style.marginTop = "0px";
		}
	}

	window.onscroll=function(){
		topMove();
		cbMove();
		gundonTop();
	}
	topMove();


	//正版日漫点击切换
	function tabMove(id){
		var id2 = document.getElementById(id)
		var top = id2.getElementsByClassName("mian-top");
		var topLi = top[0].getElementsByTagName("li");
		var bottom = top[0].getElementsByClassName("mian-bottom");
		topLi[0].style.left = "75px"

		for(var i=0;i<topLi.length;i++){
			topLi[i].index = i;
			topLi[i].onclick=function(){
				var ac1 = top[0].getElementsByClassName("active");
				var ac2 = top[0].getElementsByClassName("active2");
				var ac3 = top[0].getElementsByClassName("active3");

				for(var j=0;j<topLi.length;j++){
					topLi[j].style.left = "";
					topLi[j].style.right = "";
					topLi[j].style.zIndex = "";

					if(topLi[j].className == "active"){
						ac1 = topLi[j]
					}else if(topLi[j].className == "active2"){
						ac2 = topLi[j]
					}else if(topLi[j].className == "active3"){
						ac3 = topLi[j]
					}
				}

				if(topLi[this.index].className == "active3"){
					
					startMove(ac1, {width:161, height: 226, top: 25, left: 0, opacity: 80}, 20)
					startMove(ac2, {width:161, height: 226, top: 25, right: 0, opacity: 80}, 20)
					startMove(ac3, {width:210, height: 294, top: 0, left: 75, opacity: 100}, 20, false, function(){
						ac3.className = "active"
						ac2.className = "active3"
						ac1.className = "active2"
					})
					topLi[this.index].style.zIndex = '99'
					classPan(topLi[this.index].index, id)
				}else if(topLi[this.index].className == "active2"){
					startMove(ac1, {width:161, height: 226, top: 25, right: 0, opacity: 80}, 20)
					startMove(ac3, {width:161, height: 226, top: 25, left: 0, opacity: 80}, 20)
					startMove(ac2, {width:210, height: 294, top: 0, left: 75, opacity: 100}, 20, false, function(){
						ac2.className = "active"
						ac3.className = "active2"
						ac1.className = "active3"
					})
					topLi[this.index].style.zIndex = '99'
					classPan(topLi[this.index].index, id)
				}else if(topLi[this.index].className == "active"){
					topLi[this.index].style.left = "75px";
				}
			}
		}
	}

	tabMove("zb-tab");
	tabMove("zb-tab2");

	//动态修改class
	function classPan(io,id){
		var id = document.getElementById(id);
		var bottom = id.getElementsByClassName("mian-bottom");

		for(var i=0;i<bottom.length;i++){
			bottom[i].className = "mian-bottom none";
		}
		bottom[io].className = "mian-bottom";
	}

	//正版日漫
	function zbRiMan(idc, arr, l){
		for(var i=0;i<arr.length;i++){
			var newLi = document.createElement("li");

			newLi.innerHTML = "<div><img src="+"images/pic-"+l+i+".jpg"+ " alt="+"><span>"+arr[i]["genxin"]+"</span></div>"+
						"<a href="+"javascript:;"+">"+arr[i]['name']+"</a>"+
						"<p>"+arr[i]['jieshao']+"</p>";

			id(idc).appendChild(newLi);
		}
	}
	zbRiMan("zbriman", ZhenBanRiMan, 5);
	zbRiMan("xzShanSheng", XinZuoShangSheng, 6);

	//版权合作
	function bzHeZuo(){
		for(var i=0;i<BanQuanHeZuo.length;i++){
			var newDiv = document.createElement("div");

			newDiv.innerHTML = "<div class="+"img"+"><img src="+"images/pic-"+(80+i)+".jpg"+" alt="+"></div>"+
								"<div class="+"txt"+">"+
									"<a href="+"javascript:;"+">"+BanQuanHeZuo[i]['name']+"</a>"+
									"<p>"+BanQuanHeZuo[i]['jieshao']+"</p>"+
									"<p>最新<span>"+BanQuanHeZuo[i]['genxin']+"</span></p>"+
								"</div>";

			newDiv.className = "mian-1";
			id("block-5-mian").appendChild(newDiv);
		}
	}
	bzHeZuo();

	//TOP500
	function rqTop(){
		for(var i=0;i<TOP500.length;i++){
			var newDiv = document.createElement("div");
			var newUl= document.createElement("ul");

			for(var j=0;j<TOP500[i].length;j++){
				var newLi = document.createElement("li");

				if(TOP500[i][j]['hao'] <= 3){
					newLi.innerHTML = "<a href="+"javascript:;"+"><span>"+TOP500[i][j]['hao']+"</span>"+TOP500[i][j]['name']+"</a>"
					newLi.className = "active";
				}else{
					newLi.innerHTML = "<a href="+"javascript:;"+"><span>"+TOP500[i][j]['hao']+"."+"</span>"+TOP500[i][j]['name']+"</a>"
				}
				
				newUl.appendChild(newLi)
			}
			newDiv.appendChild(newUl)
			id("block-6-mian").appendChild(newDiv)
		}
	}
	rqTop();

	//底部图片流
	function bottomPic(){
		for(var i=1;i<=56;i++){
			var newLi = document.createElement("li");

			newLi.innerHTML = "<a href="+"javascript:;"+"><img src="+"images/p"+i+".png"+" alt="+"></a>";

			
			id("block-7-pic").appendChild(newLi);
		}
	}
	bottomPic();
	
	//底部文字
	function bottomTxt(){
		var bottomTxt = "三文娱 掌阅iCiyuan轻小说 漫本 炮渣漫画 网易视频云 幻の羁绊 17173动漫频道 顺网动漫 梦域动漫 纵横动漫 酷米资讯 并友联盟 MissEvan弹幕音频网 商务印书馆 凤凰动漫 游戏兵工厂 XiMi动漫游戏展 胖次网 新漫画 知音漫客 动漫网 酷漫网 当鸟漫画网 第一弹 ChinaJoy 萌CP女性向动漫网 AC模玩 魔卡领域 JPbeta日本文化资讯站 漫客栈 ACGNT YACA动漫网 炉石传说 漫域网 河马动画 77动漫 技术宅 中国动漫资源网 漫无限 动漫在线 口袋妖怪网 微漫画 cosplay联盟 翼萌动漫网 漫布星球 MAXdoge n次元漫画 178动漫频道 漫神网 CGART AC模玩网 天闻角川 高校动漫网 碧海祭同人交流会";
		var newTxt = bottomTxt.split(" ");
	
		for(var i=0;i<newTxt.length;i++){
			var newLi = document.createElement("li");

			newLi.innerHTML = "<a href="+"javascript:;"+">"+newTxt[i]+"</a>";

			id("block-7-txt").appendChild(newLi);
		}
	}
	bottomTxt();

	//侧边栏
	var cbPic = id("cebian").getElementsByClassName("pic");
	var cbImg = cbPic[0].getElementsByTagName("img");

	cbImg[0].onmouseover=function(){
		this.src = "images/pic106.png";
		
	}
	cbImg[0].onmouseout=function(){
		this.src = "images/pic105.png";
	}

	function cbMove(){
		var cbTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(cbTop < 150 ){
			id("cebian").style.top = 390 - cbTop + "px";
		}else if(cbTop == undefined){
			id("cebian").style.top = "390px";
		}else{
			id("cebian").style.top = "240px";
		}
	}
	cbMove();
 
	function _scrollTo(){
		var arr = [221, 800, 1340, 2220, 3120, 4190, 4960]
		var aLi = id("cebian").getElementsByTagName("li");

		for(var i=0;i<aLi.length;i++){
			aLi[i].index = i;
			aLi[i].onclick=function(){
				var newTop = arr[aLi[this.index].index]

				for(var j=0;j<aLi.length;j++){
					aLi[j].className = "";
				}
				aLi[this.index].className = "active";

				if(document.documentElement.scrollTop || document.documentElement.scrollTop == 0){
					if(document.documentElement.scrollTop){
						startMove(document.documentElement, {scrollTop:newTop}, 30)
					}else{
						startMove(document.body, {scrollTop:newTop}, 30)
					}
				}else{
					document.body.scrollTop = newTop;
				}
			}
		}

		id("fhTop").onclick=function(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = "";
			}
			aLi[0].className = "active";
			if(document.documentElement.scrollTop){
				startMove(document.documentElement, {scrollTop: 0}, 30)
			}else{
				startMove(document.body, {scrollTop: 0}, 30)
			}
			
		}
　　}
	_scrollTo()



	function gundonTop(){
		var arr = [221, 800, 1340, 2220, 3120, 4190, 4960]
		var aLi = id("cebian").getElementsByTagName("li");
		var cbTop = document.documentElement.scrollTop || document.body.scrollTop;

		for(var i=0;i<arr.length;i++){
			if(cbTop >= arr[i] && cbTop < arr[i + 1]){
				for(var j=0;j<aLi.length;j++){
					aLi[j].className = "";
				}
				aLi[i].className = "active";
			}else if(cbTop >= arr[arr.length-1]){
				for(var j=0;j<aLi.length;j++){
					aLi[j].className = "";
				}
				aLi[i].className = "active";
			}
		}
	}
	gundonTop();

	function id(id){
		var id = document.getElementById(id);
		return id;
	}
}


var BenZhouPaiHang = [{
	name: "三老爷惊奇手札",
	jieshao: "身边真实的诡异事件",
	genxin: "86话",
	renqi: "1.73亿",
	id: "1"
},{
	name: "幽冥诡匠",
	jieshao: "陈小狗修仙~！",
	genxin: "57话",
	renqi: "7260.5万",
	id: "2"
},{
	name: "中国怪谈",
	jieshao: "小智的一万种死法",
	genxin: "66(3)",
	renqi: "2176.7万",
	id: "3"
},{
	name: "地府我开的",
	jieshao: "业障不除永堕阎罗",
	genxin: "53话",
	renqi: "1720.4万",
	id: "4"
},{
	name: "航海王（海贼王）",
	jieshao: "路飞的冒险之旅",
	genxin: "第904章",
	renqi: "1399.1万",
	id: "5"
},{
	name: "杀道行者",
	jieshao: "都市异能人生杀仇恨",
	genxin: "第269话",
	renqi: "1241.5万",
	id: "6"
},{
	name: "诡水疑云-老段探",
	jieshao: "真相不明，追寻不止！",
	genxin: "202话",
	renqi: "1060.7万",
	id: "7"
},{
	name: "诡异奇谈",
	jieshao: "割下的肉是自己的？",
	genxin: "264话",
	renqi: "974.6万",
	id: "8"
},{
	name: "吃鸡游戏",
	jieshao: "大吉大利，晚上吃鸡",
	genxin: "19.1",
	renqi: "974.4万",
	id: "9"
},{
	name: "出马仙：我当大仙",
	jieshao: "天生邪骨成为出马仙",
	genxin: "82话",
	renqi: "899.4万",
	id: "10"
}]

var ZhenBanRiMan = [{
	name: "银魂",
	jieshao: "自来卷都是好人！",
	genxin: "683话"
},{
	name: "关于我转生变成史莱姆这档事",
	jieshao: "史莱姆?!很棒!!!",
	genxin: "40话"
},{
	name: "咲慕流年",
	jieshao: "一起来打麻将吧！",
	genxin: "第57话"
},{
	name: "斩！赤红之瞳 零",
	jieshao: "关于赤瞳的过去",
	genxin: "52话"
},{
	name: "炎炎消防队",
	jieshao: "炎炎消防队!!!",
	genxin: "128话"
},{
	name: "累（深红累之渊）",
	jieshao: "抢夺属于别人的美貌",
	genxin: "120话"
},{
	name: "我不受欢迎，怎么想都是你们的错",
	jieshao: "悲伤的高中生活",
	genxin: "丧134"
},{
	name: "忧郁的物怪庵",
	jieshao: "和妖怪一起生活",
	genxin: "第57话"
}]

var XinZuoShangSheng = [{
	name: "梦境神探",
	jieshao: "高智商校草梦境侦破",
	genxin: "04话"
},{
	name: "AD：二代男友",
	jieshao: "一段尘封恋爱的复活",
	genxin: "第6话"
},{
	name: "排球少年",
	jieshao: "不想输需要理由吗？",
	genxin: "303话"
},{
	name: "食戟之灵",
	jieshao: "能够爆衣的美味！",
	genxin: "264话"
},{
	name: "间谍女高",
	jieshao: "守护间谍少女们好难",
	genxin: "155话"
},{
	name: "吸血鬼男神",
	jieshao: "吸血鬼男神爱上我",
	genxin: "49话"
},{
	name: "国师大人不要啊！",
	jieshao: "眼花缭乱的美男盛宴",
	genxin: "4话"
},{
	name: "只为你悸动",
	jieshao: "肥胖少年与混血男模",
	genxin: "33话"
}]


var BanQuanHeZuo = [{
	name: "盗墓笔记漫画 官方正版",
	jieshao: "中国悬疑探险漫画",
	genxin: "147话"
},{
	name: "惹霍成婚",
	jieshao: "唯美都市恋爱漫画",
	genxin: "62话"
},{
	name: "我家殿下要挂了",
	jieshao: "女主与殿下发生的事",
	genxin: "64 第64话"
},{
	name: "英雄？我早就不当了",
	jieshao: "英雄？我早就不当了",
	genxin: "73 第七十三话"
},{
	name: "就想要个女朋友",
	jieshao: "少年你渴望女朋友吗",
	genxin: "545 男友力 上 （改）"
},{
	name: "麦拉风 婚后80",
	jieshao: "幸福就是在一起",
	genxin: "785 希望你结婚的时候，有钱也有爱情"
},{
	name: "深夜的女生宿舍",
	jieshao: "深夜的女生宿舍",
	genxin: "29 奖学金篇（下）"
},{
	name: "神医嫡女",
	jieshao: "美女医生的穿越之旅",
	genxin: "93 第93话 风波不断"
},{
	name: "黄雀传	",
	jieshao: "螳螂捕蝉，黄雀...",
	genxin: "25-2"
},{
	name: "星座不求人",
	jieshao: "从此星座不求人！",
	genxin: "131 12星座的flag完成了吗？"
},{
	name: "初恋男友是BOSS",
	jieshao: "唯美恋爱",
	genxin: "第85话 偷鸡不成"
},{
	name: "独立世界",
	jieshao: "电竞天才的复仇计划",
	genxin: "81 第四十七话 激斗（上）"
}]


var TOP500 = [[{
	hao: 1,
	name: "三老爷惊奇手札"
},{
	hao: 2,
	name: "中国怪谈"
},{
	hao: 3,
	name: "幽冥诡匠"
},{
	hao: 4,
	name: "我才不会被女孩子欺负呢"
},{
	hao: 5,
	name: "杀手古德"
},{
	hao: 6,
	name: "尸界"
},{
	hao: 7,
	name: "诡异奇谈"
},{
	hao: 8,
	name: "讨喜笨王妃"
},{
	hao: 9,
	name: "仙世录"
},{
	hao: 10,
	name: "黑执事"
}],[{hao:11, name: "出马仙：我当大仙的那几年"},{hao:12, name: "世变"},{hao:13, name: "斗罗大陆"},{hao:14, name: "皇上别碰我"},{hao:15, name: "猎行者"},{hao:16, name: "控妹狂战记"},{hao:17, name: "战国武校"},{hao:18, name: "甜蜜禁忌"},{hao:19, name: "妖神记"},{hao:20, name: "厄运之王"}],[
{hao:21, name: "嗜谎之神"},{hao:22, name: "李泰和方小甜的平行世界"},{hao:23, name: "永恒至尊"},{hao:24, name: "赤铁之心"},{hao:25, name: "丧尸迷城"},{hao:26, name: "百炼成神"},{hao:27, name: "吾乃不死神"},{hao:28, name: "诡水疑云-老段探案"},{hao:29, name: "王牌校草"},{hao:30, name: "航海王（海贼王）"}],[
{hao:31, name: "我的食人女友"},{hao:32, name: "大唐无双"},{hao:33, name: "窥探"},{hao:34, name: "魂收"},{hao:35, name: "盛唐妖异志"},{hao:36, name: "我家大师兄脑子有坑"},{hao:37, name: "诡谲日常"},{hao:38, name: "漫画家与大明星：悦蓉与悦成"},{hao:39, name: "《阴阳师》官方漫画"},{hao:40, name: "进化萌宠"}],[
{hao:41, name: "杀道行者"},{hao:42, name: "唐寅在异界"},{hao:43, name: "百战学霸"},{hao:44, name: "王爷你好贱"},{hao:45, name: "斗罗大陆II绝世唐门"},{hao:46, name: "恋爱雏歌"},{hao:47, name: "我在后宫当巨巨"},{hao:48, name: "成死神的名单"},{hao:49, name: "猎魂"},{hao:50, name: "暗无城"}]]























