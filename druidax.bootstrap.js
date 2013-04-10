!function ($) {
	$(function(){
		
		jQuery.fn.sidebar = function(parms) {

			var $this = this;
			
			$.get(parms.menu, function(html) {
		    	$this.append(html);
		    	if (parms.href) {
			    	var a = $this.find('a[href='+parms.href+']');
			    	var li = a.closest('li');
			    	li.addClass('active');
		    	}
			});
			
		};

		
		jQuery.fn.loaderaction = function(parms) {
			this.loader(parms);
			
			var $this = this;
			this.find('a').on('click', function(e) {
				if (parms.input) {
					$this.trigger('LOAD', [parms.input()]);
				} else {
					$this.trigger('LOAD');
				}
			});
		};
		
/*
		
		jQuery.fn.loaderbutton = function(parms) {

			var $this = this;
			

			var panel = {
					
					waiter : function() {
						
					    $this.toggle();
					    $this.siblings('img').toggle();
					    
					    if (parms.panel.waiter) {
							return parms.panel.waiter();
					    } else {
						    var dfd = new jQuery.Deferred();
							return dfd.promise();
					    }
					},

					always : function() {
						
					    if (parms.panel.always) {
							return parms.panel.always();
					    }

					    $this.toggle();
					    $this.siblings('img').toggle();


					},
					
					fail : function(XMLHttpRequest, textStatus, errorThrown) {
						if (parms.fail) {
							$this.html(parms.fail.message);
							$this.addClass('btn-alert').addClass('disabled');
						}
					}
			}
			
			$this.loader({service:parms.service, 
				panel:{
					waiter : function() {
						
					    $this.toggle();
					    $this.siblings('img').toggle();
					    
					    if (parms.panel.waiter) {
							return parms.panel.waiter();
					    } else {
						    var dfd = new jQuery.Deferred();
							return dfd.promise();
					    }
					},

					always : function() {
						
					    if (parms.panel.always) {
							parms.panel.always();
					    }

					    $this.toggle();
					    $this.siblings('img').toggle();


					},
					
					fail : function(XMLHttpRequest, textStatus, errorThrown) {
						if (parms.fail) {
							$this.html(parms.fail.message);
							$this.addClass('btn-alert').addClass('disabled');
						}
					}
					
				}
			});	
			
			
			this.on('click', function(e) {
				if (!$this.hasClass('disabled')) {
					if (parms.input) {
						$this.trigger('LOAD', [parms.input()]);
					} else {
						$this.trigger('LOAD');
					}
				}
			});
			
		};
*/		
	});
}(window.jQuery);
