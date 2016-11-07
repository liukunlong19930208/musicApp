$(function(){
	    var audio=$("#audio").get(0);
		var play=$(".play");
		var progress=$("#progress");
		var duration=$("#duration");
		var current=$("#current-time");
		var pi=$("#p-i");
// 修改事件方式
		function format(v){
			v=Math.floor(v);
			var s=v%60;
			s=(s<10)?("0"+s):s;
			var m=Math.floor(v/60);
			return m+":"+s;
		}
		$(audio).on("canplay",function(){
			duration.html(format(audio.duration));
		})
		
// 点击播放暂停
		play.on("touchstart",function(){
			if (audio.paused) {
				audio.play();
			}else{
				audio.pause();
			}
		})
		$(audio).on("play",function(){
			play.html("&#xe640;");
		})
		$(audio).on("pause",function(){
			play.html("&#xe639;");
		})
	
	
	
	// 获取以播放的 长度
		progress.on("touchstart",function(e){
			var offsetX=e.originalEvent.changedTouches[0].clientX;
			audio.currentTime=offsetX/$(this).width()*audio.duration;
		})
// 播放的时候执行的函数
		$(audio).on("timeupdate",function(){
			current.html(format(audio.currentTime));
			var left=progress.width()*audio.currentTime/audio.duration-pi.width()/2;
			pi.css("left",left);
		})
	// pi滚动
		pi.on("touchstart",function(e){
			var offsetX=e.originalEvent.changedTouches[0].clientX-pi.offset().left;
			var r=pi.width()/2;
			var start=r-offsetX;
			$(document).on("touchmove",function(e){
				var left=e.clientX-progress.position().left+start;
				var c=left/progress.width()*audio.duration;
				if (c>=audio.duration||c<=0) {
						return ;
				}
				audio.currentTime=c;
			})
			return false;
		})
		$(document).on("touchend",function(){
			$(document).off("touchmove");
		})
	
	
	
	// 添加歌曲
	var currentIndex=0;
	var musics=[
		{
			name:"我是我的",
			author:"李玟",
			src:"./music/2.mp3",
			duration:"4:30"
		},
		{
			name:"我是我的",
			author:"陈学冬",
			src:"./music/a.mp3"
		},
		{
			name:"我是我的",
			author:"王绎龙",
			src:"./music/王绎龙 (DJ Sunny) - 妈咪妈咪.mp3"
		},
		{
			name:"我是我的",
			author:"魏晨",
			src:"./music/魏晨 (Vision Wei) - 热雪 (Live).mp3"
		}
	]
//定义函数
	var ul=$(".menu");
    function render(){
    	ul.empty();
    	$.each(musics,function(index,val){
    		var c=(index==currentIndex)? "active":"";
    			$("<li class='"+c+"'><span class='me'>"+musics[index].name+"</span><span class='me1'>"+musics[index].author+"</span></li>").appendTo(ul);
    	})
    }  
    
    
// 下一首
   var next=$(".next");
   function nextf(){
   		currentIndex++;
   		if (currentIndex>musics.length-1) {
   			currentIndex=0;
   		}
   		audio.src=musics[currentIndex].src;
   		render();
   		audio.play();
   }
   // 上一首
    var pre=$(".prew");
    function prev(){
   		currentIndex--;
   		if (currentIndex<0) {
   			currentIndex=musics.length-1;
   		}
   		audio.src=musics[currentIndex].src;
   		render();
   		audio.play();
    }
    pre.on("touchstart",prev);
    next.on("touchend",nextf);	
//点击菜单栏
$(".nav").on("touchstart",function(){
	$(".menu").slideToggle();
})
	
})
