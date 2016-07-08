var baseSetting = function() {
	//设置rem单位
	var getFont = function() {
		var newWidth = $(window).width() / 10;
		if (newWidth > 58) newWidth = 58;
		$("html").css("font-size", newWidth + "px");
	}
	getFont();
	$(window).resize(function() {
			getFont();
		})
		//添加cookie
	this.addCookie = function(name, value, expiresSecond) {
			var cookieString = name + "=" + escape(value);
			//判断是否设置过期时间,0代表关闭浏览器时失效
			if (expiresSecond > 0) {
				var date = new Date();
				date.setTime(date.getTime() + expiresSecond * 1000);
				cookieString = cookieString + ";expires=" + date.toUTCString();
			}
			document.cookie = cookieString;
		}
		//修改cookie的值
	this.editCookie = function(name, value, expiresSecond) {
			var cookieString = name + "=" + escape(value);
			if (expiresSecond > 0) {
				var date = new Date();
				date.setTime(date.getTime() + expiresSecond * 1000);
				cookieString = cookieString + ";expires=" + date.toGMTString();
			}
			document.cookie = cookieString;
		}
		//根据名字获取cookie的值
	this.getCookieValue = function(name) {
			var strCookie = document.cookie;
			var arrCookie = strCookie.split("; ");
			for (var i = 0; i < arrCookie.length; i++) {
				var arr = arrCookie[i].split("=");
				if (arr[0] == name) {
					return unescape(arr[1]);
					break;
				} else {
					return "";
					break;
				}
			}
		}
		//校验手机号是否合法
	this.isPhoneNum = function() {
			var phonenum = $("#get-phone").val();
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			if (!myreg.test(phonenum)) {
				$(".get-phone-hint").slideDown(500).css("color", "#FF4400").html("请输入有效的手机号码")
				return false;
			} else {
				return true;
			}
		}
		//发送POST请求
	this.doPostRequest = function(url, backFunc, param) {
			$.ajax({
				async: false,
				cache: false,
				type: 'POST',
				url: url, // 请求的action路径
				data: param,
				error: function() { // 请求失败处理函数
				},
				success: backFunc
			});
		}
		//获取Url参数
	this.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) return unescape(r[2]);
		return null; //返回参数值
	}
}