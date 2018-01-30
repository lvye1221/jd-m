

// 整个页面加载完成之后
window.onload = function() {

	// 轮播图
	// bannerMove()
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

