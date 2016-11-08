$(function(){
	    var audio=$("#audio").get(0);
		var play=$(".play");
		var progress=$("#progress");
		var progress1=$("#progress1");
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
				head();
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
			progress1.css("width",left);
			var geciHeight=$("#geci .geci").height()
			var height=geciHeight* audio.currentTime / audio.duration ;
			$("#geci .geci").css("top","100"-height);
			var index=Math.floor(($(".geci li").length)*audio.currentTime / audio.duration)
			$(".geci li").css("color","white").eq(index).css("color","#D40203")
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
			geci:"<li>丑八怪</li><li>作词：甘世佳 作曲：李荣浩</li><li>演唱：薛之谦</li><li>如果世界漆黑 其实我很美</li><li>在爱情里面进退 最多被消费</li><li>无关痛痒的是非</li><li>又怎么不对 无所谓</li><li>如果像你一样 总有人赞美</li><li>围绕着我的卑微 也许能消退</li><li>其实我并不在意 有很多机会</li><li>像巨人一样的无畏</li><li>放纵我心里的鬼</li><li>可是我不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 像意外</li><li>有人用一滴泪 会红颜祸水</li><li>有人丢掉称谓 什么也不会</li><li>只要你足够虚伪</li><li>就不怕魔鬼 对不对</li><li>如果剧本写好 谁比谁高贵</li><li>我只能沉默以对 美丽本无罪</li><li>当欲望开始贪杯 有更多机会</li><li>像尘埃一样的无畏</li><li>化成灰谁认得谁管他配不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 不意外</li><li>丑八怪 其实见多就不怪</li><li>放肆去high 用力踩</li><li>那不堪一击的洁白</li><li>丑八怪 这是我们的时代</li><li>我不存在 才意外 </li>"
			
		},
		{
			name:"认真的雪",
			author:"薛之谦",
			src:"./music/薛之谦 - 认真的雪 (《妈妈像花儿一样》电视剧插曲).mp3",
			geci:"<li>丑八怪</li><li>作词：甘世佳 作曲：李荣浩</li><li>如果世界漆黑 其实我很美</li><li>在爱情里面进退 最多被消费</li><li>无关痛痒的是非</li><li>又怎么不对 无所谓</li><li>如果像你一样 总有人赞美</li><li>围绕着我的卑微 也许能消退</li><li>其实我并不在意 有很多机会</li><li>像巨人一样的无畏</li><li>放纵我心里的鬼</li><li>可是我不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 像意外</li><li>有人用一滴泪 会红颜祸水</li><li>有人丢掉称谓 什么也不会</li><li>只要你足够虚伪</li><li>就不怕魔鬼 对不对</li><li>如果剧本写好 谁比谁高贵</li><li>我只能沉默以对 美丽本无罪</li><li>当欲望开始贪杯 有更多机会</li><li>像尘埃一样的无畏</li><li>化成灰谁认得谁管他配不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 不意外</li><li>丑八怪 其实见多就不怪</li><li>放肆去high 用力踩</li><li>那不堪一击的洁白</li><li>丑八怪 这是我们的时代</li><li>我不存在 才意外 </li>"
		},
		{
			name:"妈咪妈咪",
			author:"王绎龙",
			src:"./music/王绎龙 (DJ Sunny) - 妈咪妈咪.mp3",
			geci:"<li>丑八怪</li><li>作词：甘世佳 作曲：李荣浩</li><li>演唱：薛之谦</li><li>如果世界漆黑 其实我很美</li><li>在爱情里面进退 最多被消费</li><li>无关痛痒的是非</li><li>又怎么不对 无所谓</li><li>如果像你一样 总有人赞美</li><li>围绕着我的卑微 也许能消退</li><li>其实我并不在意 有很多机会</li><li>像巨人一样的无畏</li><li>放纵我心里的鬼</li><li>可是我不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 像意外</li><li>有人用一滴泪 会红颜祸水</li><li>有人丢掉称谓 什么也不会</li><li>只要你足够虚伪</li><li>就不怕魔鬼 对不对</li><li>如果剧本写好 谁比谁高贵</li><li>我只能沉默以对 美丽本无罪</li><li>当欲望开始贪杯 有更多机会</li><li>像尘埃一样的无畏</li><li>化成灰谁认得谁管他配不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 不意外</li><li>丑八怪 其实见多就不怪</li><li>放肆去high 用力踩</li><li>那不堪一击的洁白</li><li>丑八怪 这是我们的时代</li><li>我不存在 才意外 </li>"
		},
		{
			name:"热雪",
			author:"魏晨",
			src:"./music/魏晨 (Vision Wei) - 热雪 (Live).mp3",
			geci:"<li>丑八怪</li><li>作词：甘世佳 作曲：李荣浩</li><li>演唱：薛之谦</li><li>如果世界漆黑 其实我很美</li><li>在爱情里面进退 最多被消费</li><li>无关痛痒的是非</li><li>又怎么不对 无所谓</li><li>如果像你一样 总有人赞美</li><li>围绕着我的卑微 也许能消退</li><li>其实我并不在意 有很多机会</li><li>像巨人一样的无畏</li><li>放纵我心里的鬼</li><li>可是我不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 像意外</li><li>有人用一滴泪 会红颜祸水</li><li>有人丢掉称谓 什么也不会</li><li>只要你足够虚伪</li><li>就不怕魔鬼 对不对</li><li>如果剧本写好 谁比谁高贵</li><li>我只能沉默以对 美丽本无罪</li><li>当欲望开始贪杯 有更多机会</li><li>像尘埃一样的无畏</li><li>化成灰谁认得谁管他配不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 不意外</li><li>丑八怪 其实见多就不怪</li><li>放肆去high 用力踩</li><li>那不堪一击的洁白</li><li>丑八怪 这是我们的时代</li><li>我不存在 才意外 </li>"
		},
		{
			name:"意外",
			author:"薛之谦",
			src:"./music/薛之谦 - 意外 (《如果我爱你》电视剧插曲).mp3",
			geci:"<li>丑八怪</li><li>作词：甘世佳 作曲：李荣浩</li><li>演唱：薛之谦</li><li>如果世界漆黑 其实我很美</li><li>在爱情里面进退 最多被消费</li><li>无关痛痒的是非</li><li>又怎么不对 无所谓</li><li>如果像你一样 总有人赞美</li><li>围绕着我的卑微 也许能消退</li><li>其实我并不在意 有很多机会</li><li>像巨人一样的无畏</li><li>放纵我心里的鬼</li><li>可是我不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 像意外</li><li>有人用一滴泪 会红颜祸水</li><li>有人丢掉称谓 什么也不会</li><li>只要你足够虚伪</li><li>就不怕魔鬼 对不对</li><li>如果剧本写好 谁比谁高贵</li><li>我只能沉默以对 美丽本无罪</li><li>当欲望开始贪杯 有更多机会</li><li>像尘埃一样的无畏</li><li>化成灰谁认得谁管他配不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 不意外</li><li>丑八怪 其实见多就不怪</li><li>放肆去high 用力踩</li><li>那不堪一击的洁白</li><li>丑八怪 这是我们的时代</li><li>我不存在 才意外 </li>"
		},
		{
			name:"一半",
			author:"薛之谦",
			src:"./music/一半.mp3",
			geci:"<li>一半</li><li>作词：薛之谦</li><li>演唱：魏世伟</li><li>多平淡 所以自己刻意为难</li><li>多遗憾 被抛弃的人没喜感</li><li>像被人围起来 就特别放不开</li><li>都在期待 角色要坏 别委屈了人才</li><li>别期待 伤人的话变得柔软</li><li>也别揭穿 剧透的电影不好看</li><li>隔墙有只耳朵 嘲笑你多难过</li><li>你越反驳 越像示弱</li><li>请别再招惹我</li><li>我可以 为我们的散 承担一半</li><li>可我偏要摧毁所有的好感</li><li>看上去能孤独的很圆满</li><li>我做作的表情让自己很难堪</li><li>可感情这玩意儿怎么计算</li><li>别两难 hey晚安</li><li>少了有点不甘 但多了太烦</li><li>多困难 狠话有几句新鲜感</li><li>又有多难 掩饰掉全程的伤感</li><li>我毁了艘小船 逼我们隔着岸</li><li>冷眼旁观 最后一段 对白还有点烂</li><li>你可以 为我们的散 不用承担</li><li>是我 投入到一半 感到不安</li><li>好过未来一点一点纠缠</li><li>我帮你 摘下的那颗廉价指环</li><li>像赠品附送完 人群涣散</li><li>心很酸 烟很淡</li><li>难过若写不完 用情歌刁难</li><li>我非要 锈了的皇冠 还不肯摘</li><li>在悲伤明显前 举杯离散</li><li>为何亏欠的人 特别勇敢</li><li>我撑到 你的恨 开始无限扩散</li><li>该流的泪才刚刚流一半</li><li>别有关 就两断</li><li>故事已经说完 懒得圆满 </li>"
		},
		{
			name:"丑八怪",
			author:"薛之谦",
			src:"./music/丑八怪.mp3",
			geci:"<li>丑八怪</li><li>作词：甘世佳 作曲：李荣浩</li><li>演唱：薛之谦</li><li>如果世界漆黑 其实我很美</li><li>在爱情里面进退 最多被消费</li><li>无关痛痒的是非</li><li>又怎么不对 无所谓</li><li>如果像你一样 总有人赞美</li><li>围绕着我的卑微 也许能消退</li><li>其实我并不在意 有很多机会</li><li>像巨人一样的无畏</li><li>放纵我心里的鬼</li><li>可是我不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 像意外</li><li>有人用一滴泪 会红颜祸水</li><li>有人丢掉称谓 什么也不会</li><li>只要你足够虚伪</li><li>就不怕魔鬼 对不对</li><li>如果剧本写好 谁比谁高贵</li><li>我只能沉默以对 美丽本无罪</li><li>当欲望开始贪杯 有更多机会</li><li>像尘埃一样的无畏</li><li>化成灰谁认得谁管他配不配</li><li>丑八怪 能否别把灯打开</li><li>我要的爱 出没在漆黑一片的舞台</li><li>丑八怪 在这暧昧的时代</li><li>我的存在 不意外</li><li>丑八怪 其实见多就不怪</li><li>放肆去high 用力踩</li><li>那不堪一击的洁白</li><li>丑八怪 这是我们的时代</li><li>我不存在 才意外 </li>"
		}
	]
//定义函数
	var menu=$(".menu");
    function render(){
    	menu.empty();
    	head();
    	$.each(musics,function(index,val){
    		var c=(index==currentIndex)? "active":"";
    			$("<li class='"+c+"'><span class='me'>"+musics[index].name+"</span><span class='me1'>"+musics[index].author+"</span><div class='delete iconfont11'>&#xe659;</div></li>").appendTo(menu);
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
	menu.on("touchstart","li",function(){
    	$("li").removeClass("active");
    	$(this).addClass("active");
    	currentIndex=$(this).index();
    	audio.src=musics[currentIndex].src;
    	audio.play();
    	head();
    	
    })
	
	//列表删除 一定不要冒泡
	menu.on("touchstart",".delete",function(){
		var aa=$(this).closest("li");
		var index=aa.index();
		musics.splice(index,1);
		head();
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
	//头部歌名和歌手 歌词
	function head(){
		$(".middle").html("");
		$(".zuozhe").html("");
		$("#geci").html("");
		$('<p class="headname">'+musics[currentIndex].name+'</p>').appendTo(".middle");
		$('<p class="headauthor">'+musics[currentIndex].author+'</p>').appendTo(".zuozhe");
		$('<ul class="geci">'+musics[currentIndex].geci+'</ul>').appendTo("#geci");
		
	}
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
	
	
	$(".ku").on("touchmove",function(){
		$(".ku").css("display","none");
	})
})
