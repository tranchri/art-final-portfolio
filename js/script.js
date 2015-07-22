$(document).ready (function() {
	$(".aboutButton").click(function() {
		if($(".workText").is(":visible")) {
			$(".workText").fadeToggle(300);
		}
		$(".aboutText").fadeToggle(300);
	});

	$(".workButton").click(function() {
		if($(".aboutText").is(":visible")) {
			$(".aboutText").fadeToggle(300);
		}
		$(".workText").fadeToggle(300);
	});
});