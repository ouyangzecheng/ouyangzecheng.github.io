//获取写在css表的样式
	function getStyle(obj,name){
			if(obj.currentStyle){
				return obj.currentStyle[name];
			}else{
				return getComputedStyle(obj,false)[name];
			}
		}

    //完美运动框架
	function startMove(obj,josn,point,fnEnd){ //运动的对象，运动数据，中心点，函数
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				var bStop = true;

				for(var attr in josn){
					var cur = 0;

					if(attr == 'opacity'){
						cur=Math.round(parseFloat(getStyle(obj,attr))*100);
					}else{
						cur=parseInt(getStyle(obj,attr));
					}

					var speed=(josn[attr]-cur)/6;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);

					if(cur != josn[attr])
						bStop=false;

					if(attr == 'opacity'){
						obj.style.filter='alpha(opcity:'+(cur+speed)+')';
						obj.style.opacity=(cur+speed)/100;
					}else{
						obj.style[attr]=cur+speed+'px';
					}
					
				}

				if(point){
					obj.style.left = point.left - obj.offsetWidth / 2 - obj.parentNode.offsetLeft + "px";
					obj.style.top = point.top - obj.offsetHeight / 2 - obj.parentNode.offsetTop + "px";
				}

				if(bStop){
					clearInterval(obj.timer);
					if(fnEnd)fnEnd();
				}

			},30);
		}