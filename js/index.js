

// 整个页面加载完成之后
window.onload = function() {

	// 拖拽移动banner图
	bannerTouch()
	

	// 轮播图
	// bannerMove()
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
	
	var startX = 0;		// 开始点的x坐标
	
	// 1. 给banner添加触摸事件
	oBanner.addEventListener("touchstart", function(e) {
		
		// 得到ul的偏移值
		var offsetX = oUl.offsetLeft;
		
		startX = e.touches[0].clientX;	// 起始点x坐标值
		startX -= offsetX;				// 加上初始ul的偏移值
		
		 console.log("触摸开始", startX)
	})
	
	oBanner.addEventListener("touchmove", function(e) {
		var x = e.touches[0].clientX;  // 移动的x坐标值
		
		var detaX = x - startX; 		// 与起始点的x差值
		
		 console.log("触摸移动", startX, x, detaX)
		
		// 通过差值，修改 ul 的位置
		oUl.style.marginLeft = detaX+"px"
		
	})
	
	
}







// 轮播图效果
function bannerMove() {

	// 1. 找到元素
	var oBanner = document.querySelector(".banner");
	var oUl = document.querySelector(".pic");
		
	// oBanner 的宽度值 就相当于是 整个页面的宽度
	var w = oBanner.offsetWidth;
	
	// 为了确保轮播顺序，先复制一份 图片
	oUl.innerHTML += oUl.innerHTML;
	
	
	// 获取li的数量
	var allLi = oUl.querySelectorAll("li")
	
	// 修改 ul 的宽度：  li的数量 * li的宽度 
	oUl.style.width = allLi.length * w + "px";
	
	
	// 复位所有li的宽度
	for (var i = 0; i < allLi.length; i++) {
		allLi[i].style.width = w + "px"
	}
	
	// 图片编号
	var i = 0;
	
	// 2. 定时器
	var timer = setInterval(function() {
		
		// 打开动画
		oUl.style.transition = "all 2s linear"
		
		i++;  	// 指向下一个图片
		
		if (i >= 4) {		// 是否到达最后一张
			
			// 关闭动画
			oUl.style.transition = "none"
			
			i = 0;			// 回到第0张
			oUl.style.marginLeft = "0%"
			
			
			
			
			return ;		// 下面代码不用执行了
		}
		
		oUl.style.marginLeft = (-100*i) + "%";	// 改图片
		
	}, 3000)
	
}

