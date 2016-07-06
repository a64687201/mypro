var getFont = function(){
	var newWidth = $(window).width()/10;
	if(newWidth > 58)newWidth = 58;
	$("html").css("font-size",newWidth+"px");
}
getFont();
$(window).resize(function(){
	getFont();
})
