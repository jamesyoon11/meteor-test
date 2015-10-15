Template.layout.rendered = function() {  

	  	$(document).ready(function(){
	  		
	  		// menu click event handler in the mobile device view
			$(".menuExpander").click(function(){
				var $this = $(this);

				if($('.menu').hasClass('menuOpen')){
					$('.menu').removeClass("menuOpen");
        		} else {
        			$(".menu").addClass("menuOpen");
			    }

		    	return false;
		    });

		});
	  };