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
		e.preventDefault();
		var modalFoodID = $(this).closest('.modal').attr('id');
		var foodID = modalFoodID.substr('modal_'.length);
		// console.log("foodID: " + foodID);
		var comments = $("#comment_" + foodID).val();
		
		$.get("/commented?id=" + foodID + "&comments=" + comments, commentFood);
	});

	$('body').on('hidden', '.modal', function () {
		$(this).removeData('modal');
	});

	$(".eraseFromMyUploads").click(function(e) {
		var foodID = $(this).closest('.foods').attr('id');
		$.get("/eraseMyUpload?id=" + foodID, erasedUpload);
	});

	$(".unlike").click(function(e) {
		var foodID = $(this).closest('.foods').attr('id');
		console.log(foodID);
		$.get("/unlike?id=" + foodID, unlikeFood);
	})
}


function likeFood(result) {
	var foodID = result;
	$("#" + foodID + " .like").replaceWith("<button type='button' class='btn btn-default'><span class='glyphicon glyphicon-heart'> liked</span></button>");
}

function unlikeFood(result) {
	var foodID = result;
	$(".likedFood #" + foodID).fadeOut('slow', function() {
		$(this).remove();
		alert("You have unliked this food");
	})
}

// result is an array where result[0] is the comment, and result[1] is the photo id
function commentFood (result) {
	var username = result[0].comment_usr_id;
	var comment = result[0].comment;
	var photo_id = "#" + result[1].photo_id;
	$(photo_id + " .newComment").append('<p>' + username + ' said "' + comment + '"</p>'); // figure out how to add only once with the right css!
}

function erasedUpload (foodID) {
	$("#" + foodID).fadeOut('slow', function() {
		$(this).remove();
		alert("Your post has been removed");
	});
}