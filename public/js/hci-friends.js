'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$(".imgclicked").click(foodImgClicked);

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






	$('#addFriendForm').submit(function() {
        status('uploading the file ...');
 
        $(this).ajaxSubmit({                                                                                                                 
 
            error: function(xhr) {
		status('Error: ' + xhr.status);
            },
 
            success: function(response) {
		//TODO: We will fill this in later
            }
	});
 
	// Have to stop the form from submitting and causing                                                                                                       
	// a page refresh - don't forget this                                                                                                                      
	return false;
    });

}

function foodImgClicked(e) {
	ga("send", "event", "img", "click", "image", 1);
}

function likeFood(result) {
	console.log(result);
	var foodID = result;
	$("#" + foodID + " .like").replaceWith("<button type='button' class='btn btn-default'><span class='glyphicon glyphicon-heart'> liked</span></button>");
}

function commentFood (result) {
	console.log(result);
	var username = result.comment_usr_id;
	var comment = result.comment;
	$(".comments h4").append('<p>' + username + ' said "' + comment + '"</p>'); // figure out how to add only once with the right css!
}

function erasedUpload (result) {
	$("#" + foodID).replaceWith("<p>This post has been deleted</p>");
}