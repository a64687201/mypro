var shopDetailController = function() {
		//调用base.js
		baseSetting.call(this)
		//加载内容
		this.ajaxFill();
	}


shopDetailController.prototype.ajaxFill = function() {
	var selfClass = this;
}

$(document).ready(function() {
	new shopDetailController();
})