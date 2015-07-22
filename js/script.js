$(document).ready (function() {
	$(".aboutButton").click(function() {
		if($(".workText").is(":visible")) {
			$(".workText").fadeToggle(300);
		}
		if($(".aboutText").is(":hidden")) {
			$(".aboutText").fadeToggle(300);
		}
	});

	$(".workButton").click(function() {
		if($(".aboutText").is(":visible")) {
			$(".aboutText").fadeToggle(300);
		}
		if($(".workText").is(":hidden")) {
			$(".workText").fadeToggle(300);
		}
	});
});