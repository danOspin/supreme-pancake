$(document).ready(function() {
	$('.toggle, .toggle2, .toggle3, .toggle4').hide();
});
			
	$(document).ready(function() {
		$('.clickable1').click(function() {
			
			$('.toggle').toggle(250);
		});
	});

	$(document).ready(function() {
		$('.clickable2').click(function() {
	
			$('.toggle2').toggle(250);
		});
	});

	$(document).ready(function() {
		$('.clickable3').click(function() {
	
			$('.toggle3').toggle(250);
		});
	});

	$(document).ready(function() {
		$('.clickable4').click(function() {
	
			$('.toggle4').toggle(250);
		});
	});