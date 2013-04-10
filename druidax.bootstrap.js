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
		
	});
}(window.jQuery);
