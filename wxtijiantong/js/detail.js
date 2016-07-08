var detailController = function() {
		//调用base.js
		baseSetting.call(this)
		//判断详情类型
		this.judgeType()
		//加载内容
		this.ajaxFill();
	}
	//判断详情类型
detailController.prototype.judgeType = function() {
	var selfClass = this;
	var judgeParam = selfClass.getUrlParam("type");
	if (judgeParam == 1) {
		$("title").html("套餐详情");
		$(".tab-l").html("套餐详情");
		$(".tab-r").html("支持机构");
		$(".to-cart").hide();
		$("#go-buy").find("button").html("立即预约");
		$("#go-buy").css("padding-left", "0.1875rem");
		return 1;
	} else if (judgeParam == 2) {
		$("title").html("实体卡详情");
		$(".tab-l").html("实体卡详情");
		$(".tab-r").html("支持机构");
		return 2;
	} else if (judgeParam == 3) {
		$("title").html("机构详情");
		$(".tab-l").html("机构详情");
		$(".tab-r").html("支持套餐");
		$("#go-buy").hide()
		return 3;
	} else {

	}
}

detailController.prototype.ajaxFill = function() {
	var selfClass = this;
	var type = selfClass.judgeType();
}

$(document).ready(function() {
	new detailController();
})