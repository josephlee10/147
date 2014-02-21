'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#like").click(function(e) {
		e.preventDefault;
		var foodID = $(this).closest('.foods').attr('id');
		console.log("user clicked on food " + foodID);
		$.get("/liked/" + foodID, likeFood);
	});

	$("#addCommentBtn").click(function(e) {
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
	var foodID = result["id"];
	$("#" + foodID + " .glyphicon").replaceWith("<span class='glyphicon glyphicon-heart'></span>");
}

function commentFood (result) {
	console.log(result);
}

//apparently we need to use this shit to delete shit from the modal so that it can be reloaded
// every time we click on a new img. or something like that
