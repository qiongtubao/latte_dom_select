var LatteObject = require("../../m/data")
			, latte_lib = require("latte_lib")
			, V = require("../../v/index.js");
		var Command = {};
		(function() {
			this.beforeLevel = 1;	
			this.before = function(data, dom, controller) {
				var select = dom.attr("latte-select");
				if(select) {
					dom.attr("latte-list", "data");
					var selectId = data.get("select") || 0;
					var selectEvent = function() {
						var index = data.get("data").indexOf(this);
						data.set("select", index);		
					}
					data.get("data").forEach(function(o, index) {
						o.set("selectClass", "");
						o.set("selectEvent", selectEvent);
					});
					var select = function(value, old) {
						if(value == old) {
							return;
						}
						if(old != null) {
							data.get("data").get(old).set("selectClass", "");
						}
						data.get("data").get(value).set("selectClass", dom.attr("latte-select-class") || "selected");
						var eventName =dom.attr("latte-change");
						var event = data.get(eventName);
						event && event.call(data, data.get("data."+value+".value"));
					}
					controller.bind("data", "select", select);
					data.set("select", selectId);
				}	

				
			};
			
		}).call(Command);
		
		module.exports = Command;