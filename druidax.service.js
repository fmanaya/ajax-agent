!function ($) {
	$(function(){
		
		var stringfy = function(o) {
			
			var data = '';
			for (var property in o) {
				var value = o[property]; 
				var type = typeof(value);
				if (value == null) {
					// Se ignora
				} else if (value["0"] && typeof(value["0"])=='object') {
					data += (data==''?'':',') + '"'+property+'":[';
					var first = true;
					for (var i=0; i<value.length; i++) {
						data += (first?'':',') + stringfy(value[i]);
						first = false;
					}
					data += ']';
				} else if (type == "string") {
					data += (data==''?'':',') + '"'+property+'":"'+value+'"';
				} else if (type == "number") {
					data += (data==''?'':',') + '"'+property+'":'+value;
				} else if (type == "object" && value !== null) {
					data += (data==''?'':',') + '"'+property+'":'+stringfy(value);
				}
			}
			
			return ('{' + data + '}');
		};

		var ajax = function(type, url, data) {
			
			var contentType = 'application/json;charset=utf8';
			var dataType    = 'json';
			
			if (url.indexOf('.php')) {
				return $.ajax({
//				    contentType: contentType,
				    data: data?({'data':stringfy(data)}):'{}',
				    dataType: dataType,
				    type: type,
			        url: url
				});
			} else {
				return $.ajax({
				    contentType: contentType,
				    data: data2,
				    dataType: dataType,
				    type: type,
			        url: url
				});
			}
			
		};

		var send = function(parms, data1, callback) {
			$.when(ajax('POST', parms.service.url, data1), parms.panel.waiter()).then(
				function(data2) {
					if (parms.service.property) {
						callback(data2[0][parms.service.property]);
					} else {
						callback(data2[0]);
					}
				}
			).fail(function(XMLHttpRequest, textStatus, errorThrown) {
	    		if (parms.panel.fail) parms.panel.fail(XMLHttpRequest, textStatus, errorThrown);
			}).always(parms.panel.always);
		};
		
		jQuery.fn.loader = function(parms) {

			var template;
			if (parms.template) {
				template = parms.template+'TPL';
				$('#'+parms.template).template(template);
			}

			var $this = this;

			this.on('LOAD', function(e, data1) {
				if (parms.service) {
					send(parms, data1, function(data2) {
						if (template) {
							$this.html('');
							$this.append($.tmpl( template, data2));
						} else if (parms.filler) {
							parms.filler(data2);
						} else {
							$this.html('');
							$this.append(data2);
						}
					});
				} else if (template){
					$.tmpl( template, data1 ).appendTo( $this );
				}
			});
			
		};
	
		
		
	});
}(window.jQuery);
