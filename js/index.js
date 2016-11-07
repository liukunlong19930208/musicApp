$(function(){
	    var audio=$("#audio").get(0);
		var play=$(".play");
		var progress=$("#progress");
		var duration=$("#duration");
		var current=$("#current-time");
		var pi=$("#p-i");
		var volume=$("#volume");
		var vi=$("#v-i");
		var mute=$("#mute");
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
	    pi.on("touchend", false);
		pi.on("touchstart", function(e) {
			var r = $(this).width() / 2;
		var offsetX = e.originalEvent.changedTouches[0].clientX - pi.offset().left;
		var start = r - offsetX;
		$(document).on("touchmove", function(e) {
			var m = e.originalEvent.changedTouches[0].clientX;
			var left = m - progress.position().left+start;
			var c = left / progress.width() * audio.duration;
			if (c >= audio.duration||c<=0) {
				return;
			}
			audio.currentTime = c;
		})
		return false;
	})
		$(document).on("touchend",function(){
			$(document).off("touchmove");
		})
	// 调节音量
		volume.on("touchend", function(e) {
		var offsetX = e.originalEvent.changedTouches[0].clientX - vi.offset().left;
		audio.volume = offsetX / $(this).width();
	})
	// 音量事件驱动
		$(audio).on("volumechange",function(){
			vi.css("left",volume.width()*audio.volume-vi.width()/2)
		})
	//调节音量
	vi.on("touchend", false);
	vi.on("touchstart", function(e) {
		var r = $(this).width() / 2;
		var offsetX = e.originalEvent.changedTouches[0].clientX - vi.offset().left;
		var start = r - offsetX;
		$(document).on("touchmove", function(e) {
			var m = e.originalEvent.changedTouches[0].clientX;
			var left = m - volume.position().left + start;
			if ((left / volume.width() > 0) && (left / volume.width() < 1)) {
				audio.volume = left / volume.width();
			}

		})
		return false;
	})
	$(document).on("touchend", function() {
		$(document).off("touchmove");
	})
	// 静音
		mute.on("touchstart",function(){
			if($(this).attr("data-v")){
				audio.volume=$(this).attr("data-v");
				$(this).removeAttr("data-v");
			}else{
				$(this).attr("data-v",audio.volume);
				audio.volume=0;
			}
		})
	// 添加歌曲
	var currentIndex=0;
	var musics=[
		{
			name:"和你在一起",
			author:"乔任梁",
			src:"./music/乔任梁 (Kimi Qiao) - 和你在一起.mp3",
			
		},
		{
			name:"认真的雪",
			author:"薛之谦",
			src:"./music/薛之谦 - 认真的雪 (《妈妈像花儿一样》电视剧插曲).mp3"
		},
		{
			name:"妈咪妈咪",
			author:"王绎龙",
			src:"./music/王绎龙 (DJ Sunny) - 妈咪妈咪.mp3"
		},
		{
			name:"热雪",
			author:"魏晨",
			src:"./music/魏晨 (Vision Wei) - 热雪 (Live).mp3"
		},
		{
			name:"意外",
			author:"薛之谦",
			src:"./music/薛之谦 - 意外 (《如果我爱你》电视剧插曲).mp3"
		},
		{
			name:"她说",
			author:"张碧晨",
			src:"./music/张碧晨 - 她说 (Live).mp3"
		}
	]
//定义函数
	var ul=$(".menu");
    function render(){
    	ul.empty();
    	$.each(musics,function(index,val){
    		var c=(index==currentIndex)? "active":"";
    			$("<li class='"+c+"'><span class='me'>"+musics[index].name+"</span><span class='me1'>"+musics[index].author+"</span><div class='delete iconfont11'>&#xe659;</div></li>").appendTo(ul);
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
    
    
  //点击哪首播放哪首
  render();
	ul.on("touchstart","li",function(){
    	$("li").removeClass("active");
    	$(this).addClass("active");
    	currentIndex=$(this).index();
    	audio.src=musics[currentIndex].src;
    	audio.play();
    	
    })
	
	//列表删除 一定不要冒泡
	ul.on("touchstart",".delete",function(){
		var aa=$(this).closest("li");
		var index=aa.index();
		musics.splice(index,1);
		if(index==currentIndex){
			if(musics[currentIndex]){
				audio.src=musics[currentIndex].src;
			}
			else{
				audio.src="";
				currentIndex=0;
			}
		}
		else if(index>currentIndex){
				
			}
		else if(index<currentIndex){
			currentIndex-=1;
		}
		render();
		return false;
		
	})
//点击菜单栏
$(".nav").on("touchstart",function(){
	$(".menu").slideToggle();
})
	
	//audio函数
	$(audio).on("canplay",function(){
		$("li").removeClass("active");
		$("li").eq(currentIndex).addClass("active");
//		$(".text span").html(musics[currentIndex].name);
		audio.play();
	})
	$(audio).on("ended",function(){
		nextf();
	})
	$(audio).on("loadstart",function(){
		
	})
	
	$(".dian").on("touchstart",function(){
	$(".box").slideToggle();
})
	$(".close").on("touchstart",function(){
		$(".box").css("display","none");
	})
	
})
