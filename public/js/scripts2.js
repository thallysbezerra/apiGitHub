// User details
$(".teste").click(function (e) {
	var usuario = $(this).siblings().html();
	console.log(usuario)

	$(".modal").addClass("show");
	$("body").addClass("blockScroll");
	userDetails();
});