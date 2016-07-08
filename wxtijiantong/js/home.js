var homeController = function() {
	//调用base.js
	baseSetting.call(this)
	//页面交互设置
	this.pageSetting()
}
homeController.prototype.pageSetting = function() {
	//合作伙伴加载更多
	var listH = $("#auto-box").children(".list-box").outerHeight() * 2 + "px";
	$("window").resize(function() {
		listH = $("#auto-box").children(".list-box").outerHeight() * 2 + "px";
	})
	$(".list-more").click(function() {
		var box = $("#auto-box");
		var boxH = box.css("height");
		boxH == listH ? box.css("height", "auto") : box.css("height", listH);
	})
}

$(document).ready(function() {
	new homeController();
})