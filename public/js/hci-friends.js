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

	$(".undolike").click(function(e) { // this doesn't work for some reason Office Hours time!
		e.preventDefault();
		var foodID = $(this).closest('.foods').attr('id');
		console.log("user wants to undolike on " + foodID);
		$.get("/undolike/" + foodID, undoLike);
	});

	$(".addCommentBtn").click(function(e) {
		e.preventDefault();
		var modalFoodID = $(this).closest('.modal').attr('id');
		var foodID = modalFoodID.substr('modal_'.length);
		var comments = $("#comment_" + foodID).val();
		
		$.get("/commented?id=" + foodID + "&comments=" + comments, commentFood);
	});

	$('body').on('hidden', '.modal', function () {
		$(this).removeData('modal');
	});

	$(".eraseFromMyFavs").click(function(e) {
		var foodID = $(this).closest('.foods').attr('id');
		$("#" + foodID).remove();
	});

}

function likeFood(result) {
	console.log(result);
	var foodID = result;
	$("#" + foodID + " .like").replaceWith("<button type='button' class='btn btn-default undolike'><span class='glyphicon glyphicon-heart'> liked</span></button>");
	alert("You liked this food!");
}

function undoLike(result) {
	console.log(result);
	var foodID = result;
	$("#" + foodID + " .undolike").replaceWith("<button type='button' class='btn btn-default like'><span class='glyphicon glyphicon-heart-empty'> like</span></button>");
}

function commentFood (result) {
	console.log(result);
	var username = result.comment_usr_id;
	var comment = result.comment;
	$(".comments h4").append('<p>' + username + ' said "' + comment + '"</p>'); // figure out how to add only once with the right css!
}