var loginController = function() {
		//调用base
		baseSetting.call(this)
			//输入框样式
		this.inputSet()
			//发送验证码
		this.sendSMS()
	}
	//输入框样式
loginController.prototype.inputSet = function() {
		var selfClass = this;
		var setBox = function(id) {
			var self = $("#" + id);
			var hint = $("." + id + "-hint");
			var holder = self.attr("placeholder");
			self.focus(function() {
				hint.slideDown(500).css("color", "#666666").html(holder);
				self.removeAttr("placeholder");
			})
			self.blur(function() {
				var isPhone = selfClass.isPhoneNum();
				if (self.val() == "") {
					//输入框为空
					hint.css("color", "#FF4400");
					self.attr("placeholder", holder);
					hint.html(holder)
				} else if (id == "get-phone" && isPhone == false) {
					//手机号输入框不是手机号
				} else {
					hint.css("color", "#98989f");
					hint.slideUp(500)
				}
			})
		}
		setBox("get-phone");
		setBox("get-code");
	}
	//获取接口URL
loginController.prototype.getUrl = function() {

	}
	//验证码部分
loginController.prototype.sendSMS = function() {
	var selfClass = this;
	var btn = $("#send-sms");
	//发送验证码
	btn.click(function() {
		sendCode(btn);
	});
	var count = selfClass.getCookieValue("count"); //获取cookie值
	if (count > 0) {
		settime(btn); //开始倒计时
	}
	//发送验证码
	function sendCode(obj) {
		var phonenum = $("#get-phone").val();
		var result = selfClass.isPhoneNum();
		if (result) {
//			selfClass.doPostRequest('', ifSuccess, {
//				"phonenum": phonenum
//			});
			selfClass.addCookie("count", 60, 60); //添加cookie记录,有效时间60s
			settime(obj); //开始倒计时
		}
	}
	//处理验证码返回数据
	function ifSuccess(data) {
		var d = $.parseJSON(data);
		if (!d.success) {
			alert(d.msg);
		} else { //失败
		}
	}
	//开始倒计时
	var countdown;
	function settime(obj) {
		countdown = selfClass.getCookieValue("count");
		if (countdown == 0) {
			obj.removeAttr("disabled");
			obj.html("获取验证码");
			return;
		} else {
			obj.attr("disabled", "disabled");
			obj.html("重新发送(" + countdown + ")");
			countdown--;
			selfClass.editCookie("count", countdown, countdown + 1);
		}
		setTimeout(function() {
				settime(obj)
			}, 1000) //每1000毫秒执行一次
	}
}

$(document).ready(function() {
	new loginController();
})