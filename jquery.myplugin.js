 (function($){
            $.fn.textHover = function(options){
            	var defaultVar = {
            		mytext:'your text here',
            		foreColor:'red',
            		backColor:'black'
            	}
            	var obj = $.extend(defaultVar,options);

            	return this.each(function(){
            		var selObject = $(this);

            		var oldText = selObject.text();
            		var oldBgColor = selObject.css('background-color');
            		var oldColor = selObject.css('color');

            		selObject.hover(function(){
            			selObject.text(obj.mytext);
            			selObject.css('background-color',obj.backColor);
            			selObject.css('color',obj.foreColor);
            		},
            		function(){
            			selObject.text(oldText);
            			selObject.css('background-color',oldBgColor);
            			selObject.css('color',oldColor);
            		}
            		)
            		})
            }
        })(jQuery);