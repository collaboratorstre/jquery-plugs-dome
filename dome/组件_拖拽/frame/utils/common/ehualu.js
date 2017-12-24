/**
 * ehualu自身的js组件
 */
var ehualu = {};
(function() {
	// 时间格式化函数
	Date.prototype.format = function(format) {
		var date = {
			"M+" : this.getMonth() + 1,
			"d+" : this.getDate(),
			"h+" : this.getHours(),
			"m+" : this.getMinutes(),
			"s+" : this.getSeconds(),
			"q+" : Math.floor((this.getMonth() + 3) / 3),
			"S+" : this.getMilliseconds()
		};
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for ( var k in date) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	};

	// alert('test');
	ehualu.utils = {};
	// 字符串处理函数
	ehualu.utils.StringUtil = {
		trim : function(str) {
			return str.replace(/(^\s*)|(\s*$)/g, '');
		},
		lTrim : function(str) {
			return str.replace(/(^\s*)/g, '');
		},
		rTrim : function(str) {
			return str.replace(/(\s*$)/g, '');
		},
		isNull : function(str) {
			if (typeof str == 'undefined' || str == null) {
				return true;
			} else {
				return false;
			}
		},
		null2Empty : function(str) {
			if (this.isNull(str)) {
				return "";
			}
		},
		isBlank : function(str) {
			if (typeof str == 'undefined' || str == null || ehualu.utils.StringUtil.trim(str) == '') {
				return true;
			} else {
				return false;
			}
		},
		isNotBlank : function(str) {
			return !this.isBlank(str);
		},
		isNumber : function(str) {
			if (typeof str == 'undefined' || str == null || ehualu.utils.StringUtil.trim(str) == '') {
				return false;
			}
			if (!(/^\d*$/g).test(str)) {
				return false;
			}
			return true;
		},
		isLicenseNo : function(str) {
			return /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/
					.test(str);
		},
		isSpecialChar : function(str) {
			var reg = /[`~!%_@#\$\^&\*\(\)=\|\{\}':;,\[\]\.<>\/\?~！@#￥…&*（）——【】‘；：”“'’。，、？]/g;
			if (reg.test(str)) {
				return true;
			}
			return false;
		}
	};
	// 常用数组操作函数
	ehualu.utils.ArrayUtil = {
		// 交换数组两元素
		// splice(p1,p2,p3..pn)第一个参数（起始位置），第二个参数（删除的项数），第三个参数（插入任意数量的项）
		swapItems : function(arr, index1, index2) {
			arr[index1] = arr.splice(index2, 1, arr[index1])[0];
			return arr;
		},
		// 上移
		upItem : function(arr, $index) {
			if ($index == 0) {
				return;
			}
			ehualu.utils.ArrayUtil.swapItems(arr, $index, $index - 1);
		},
		// 下移
		downItem : function(arr, $index) {
			if ($index == arr.length - 1) {
				return;
			}
			ehualu.utils.ArrayUtil.swapItems(arr, $index, $index + 1);
		}
	};
	// 访问地址URL操作函数
	ehualu.utils.URLUtil = {
		// 获取URL的参数数组
		getRequest : function(url) {
			var theRequest = new Object();
			url = decodeURI(url);
			var paramIndex = url.toString().indexOf("?");
			if (paramIndex != -1) {
				var str = url.substr(paramIndex + 1);
				var strs = str.split("&");
				for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
				}
			}
			return theRequest;
		},

		/**
		 * 获取URL的参数
		 * 
		 * @param url
		 * @param param
		 */
		getURLParam : function(url, param) {
			var paramArray = ehualu.utils.URLUtil.getRequest(url.toString());
			return paramArray[param];
		}
	};

	// 访问地址URL操作函数
	ehualu.utils.Time = {
		// 时间转时间戳
		dateToTimeStamp : function(date) {
			var timestamp = Date.parse(date);
			timestamp = timestamp / 1000;
			return timestamp;
		},
		// 时间字符串转时间戳
		strToTimeStamp : function(dateStr) {
			var timestamp = Date.parse(new Date(dateStr));
			timestamp = timestamp / 1000;
			return timestamp;
		},
		// 时间戳转时间
		timestampToDate : function(timestamp) {
			var date = new Date();
			date.setTime(timestamp);
			return date;
		},
		// 时间戳转时间字符串
		timestampToDateFmt : function(timestamp, fmt) {
			var date = new Date();
			date.setTime(timestamp);
			return date.format(fmt);
		}
	};

	// cookie获取、设置、删除
	ehualu.utils.Cookie = {
		set : function(key, val, time) {// 设置cookie方法
			var date = new Date(); // 获取当前时间
			var expiresDays = time; // 将date设置为n天以后的时间
			date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); // 格式化为cookie识别的时间
			document.cookie = key + "=" + val + ";expires=" + date.toGMTString(); // 设置cookie
		},
		get : function(key) {// 获取cookie方法
			/* 获取cookie参数 */
			var getCookie = document.cookie.replace(/[ ]/g, ""); // 获取cookie，并且将获得的cookie格式化，去掉空格字符
			var arrCookie = getCookie.split(";"); // 将获得的cookie以"分号"为标识,将cookie保存到arrCookie的数组中
			var result = null; // 声明变量tips
			for (var i = 0; i < arrCookie.length; i++) { // 使用for循环查找cookie中的tips变量
				var arr = arrCookie[i].split("="); // 将单条cookie用"等号"为标识，将单条cookie保存为arr数组
				if (key == arr[0]) { // 匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
					result = arr[1]; // 将cookie的值赋给变量tips
					break; // 终止for循环遍历
				}
			}
			return result;
		},
		del : function(key) { // 删除cookie方法
			var date = new Date(); // 获取当前时间
			date.setTime(date.getTime() - 10000); // 将date设置为过去的时间
			document.cookie = key + "=v; expires =" + date.toGMTString();// 设置cookie
		}
	// return tips;
	};

	// localStorage获取、设置
	ehualu.utils.localStorage = {
		set : function(key, val) {// 设置cookie方法
			if (!window.localStorage) {
				alert("本浏览器不支持localstorage!");
			} else {
				var storage = window.localStorage;
				storage.setItem(key, val);
			}
		},
		get : function(key) {
			if (!window.localStorage) {
				alert("本浏览器不支持localstorage!");
			} else {
				var storage = window.localStorage;
				return storage.getItem(key);
			}
		}
	};
})()