'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$(".like").click(function(e) {
		e.preventDefault();
		var foodID = $(this).closest('.foods').attr('id');
		console.log("user clicked on food " + foodID);
		$.get("/liked/" + foodID, likeFood);
	});

	$(".addCommentBtn").click(function(e) {
		e.preventDefault;
		var foodID = $(this).closest('.foods').attr('id');
		var comments = $("#comment").val();
		$.get("/commented/" + foodID + "&" + comments, commentFood);
	});

	$('body').on('hidden', '.modal', function () {
		$(this).removeData('modal');
	});

}

function likeFood(result) {
	console.log(result);
	var foodID = result;
	$("#" + foodID + " .glyphicon").replaceWith("<span class='glyphicon glyphicon-heart'></span>");
}

function commentFood (result) {
	console.log(result);
}