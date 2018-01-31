

// 整个页面加载完成之后
window.onload = function() {

	// 拖拽移动banner图
	// bannerTouch()
	

	// 轮播图
	bannerMove()
	
	// 开启倒计时
	startTimeCount()
	
	// 开启顶部导航条透明变化
	startNavSet()
	
}

// 设置顶部导航条透明度变化
function startNavSet() {
	
	// 得到 banner 图的高度
	var oBanner = document.querySelector(".banner")
	var maxY = oBanner.offsetHeight
	
	
	// 1. 页面滚动事件
	window.onscroll = function() {
		
		// 2. 获取滚动值
		var iTop = document.body.scrollTop;
		
//		console.log(iTop)

		// 3. 计算透明度的值
		var opa = iTop / maxY;
		
		if (opa > 1) {	// 如果超过1，没意义，变成1
			opa = 1
		}
		
//		console.log(opa)
		
		var jdH = document.querySelector(".jd_h")
		jdH.style.background = "rgba(201,21,35,"+ opa +")"
		
		
	}
}












function startTimeCount() {
	// 1. 创建【3小时】的时间对象
	var d0 = new Date(0)						// 参考时间
	var sum = 3 * 60 * 60 * 1000				// 总共毫秒数 
	
	// 得到时间显示的 li元素
	var allLi = document.querySelectorAll(".hot .timer ul li")
	
	var timer = setInterval(function() {
		// 2. 时间减去1秒
		sum -= 1000
		
		var d = new Date(sum)					// 转换为时间对象
		
		// 3. 更新到页面
		var h = d.getHours() - d0.getHours()		// 小时数
		var m = d.getMinutes()						// 分钟数
		var s = d.getSeconds()						// 秒数
		
//		console.log(h,m,s)
		
		// 小时部分
		allLi[0].innerHTML = parseInt(h / 10)
		allLi[1].innerHTML = parseInt(h % 10)
		
		// 分钟部分
		allLi[3].innerHTML = parseInt(m / 10)
		allLi[4].innerHTML = parseInt(m % 10)
		
		// 秒的部分
		allLi[6].innerHTML = parseInt(s / 10)
		allLi[7].innerHTML = parseInt(s % 10)
	}, 1000);
}






// 拖拽移动轮播图
function bannerTouch() {
	
	// 思路：
	//   1. 保存开始的点坐标 x
	//   2. 通过获取移动的坐标x，和开始坐标进行比较
	
	
	// 找到banner元素
	var oBanner = document.querySelector(".banner")
	
	// 找到 ul 元素
	var oUl = oBanner.querySelector(".pic")
	
	var touchStartX = 0;	// 触摸开始的点
	var startX = 0;			// 开始点的x坐标
	var currentX = 0;		// 获取轮播图当前X值
	
	// 1. 给banner添加触摸事件
	oBanner.addEventListener("touchstart", function(e) {
		
		currentX = oUl.offsetLeft;		// 在触摸开始时保存ul的起始位置
		
		// 得到ul的偏移值
		var offsetX = oUl.offsetLeft;
		
		
		touchStartX = e.touches[0].clientX; 	// 触摸开始的内容
		
		startX = e.touches[0].clientX;	// 起始点x坐标值
		startX -= offsetX;				// 加上初始ul的偏移值
		
		 console.log("触摸开始", startX)
	})
	
	var endX = 0;				// 定义全局变量保存触摸点的x值
	
	oBanner.addEventListener("touchmove", function(e) {
		endX = e.touches[0].clientX;  	// 移动的x坐标值
		
		var detaX = endX - startX; 		// 与起始点的x差值
		
//		 console.log("触摸移动", startX, endX, detaX)
		
		// 通过差值，修改 ul 的位置
		oUl.style.marginLeft = detaX+"px"
		
	})
	
	// 【存在问题】 如果只触摸一下，那么并没有移动，怎么办？
	// 思路：
	//   1. 找到松手的位置 endX
	//   2. 与 touchStartX 之间进行比较
	//             决定是往左边还是往右滑
	//   3. 设置轮播图 移动对应 一张图片的 距离
	oBanner.addEventListener("touchend", function(e) {

		var oLi = oUl.querySelector("li");  	// 得到li
	
//		console.log("touchStartX: " + touchStartX, "endX: " + endX)
		if (touchStartX > endX) {  	// 往左滑
			// 当前x  减去  1张图片的宽度
			var x = currentX - oLi.offsetWidth
			
		} else {				// 往右滑
			var x = currentX + oLi.offsetWidth
		}
		
		console.log("end:", x)
		
		// 更新ul的left值
		oUl.style.marginLeft = x + "px"
	})
	
	
}







// 轮播图效果
function bannerMove() {

	// 1. 找到元素
	var oBanner = document.querySelector(".banner");
	var oUl = document.querySelector(".pic");
		
	// oBanner 的宽度值 就相当于是 整个页面的宽度
	var w = oBanner.offsetWidth;
	
	
	// 图片编号
	var i = 0;
	
	// 2. 定时器
	var timer = setInterval(function() {
		
		i++
		
		oUl.style.transition = "all .2s"	// 打开动画
		
		oUl.style.marginLeft = -i * w + "px"
		
	}, 1000)
	
	oUl.addEventListener("transitionend", function() {
		// 动画结束
		
		if (i >= 2) {
			// 已经移动到    0,1,2(0) 而且已经结束了
			i = 0		// 编号回到0
			
			oUl.style.transition = "none"	// 关闭动画
			oUl.style.marginLeft = "0px"	// 图片回去
		}
	})
	
}

