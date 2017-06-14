var allBookPosts = [];

function showCreateBookModal()
{
	var createBookModal = document.getElementById("create-book-post-modal");
	var modalBackdrop = document.getElementById("modal-backdrop");
	
	createBookModal.classList.remove("hidden");
	modalBackdrop.classList.remove("hidden");
}

function closeCreateBookModal()
{
	var createBookModal = document.getElementById("create-book-post-modal");
	var modalBackdrop = document.getElementById("modal-backdrop");
	
	createBookModal.classList.add("hidden");
	modalBackdrop.classList.add("hidden");
	
	clearBookInputValues();
}

function clearBookInputValues()
{
	var bookInputElems = document.getElementsByClassName("book-input-element");
	var bookConditionInput = document.getElementById("book-condition-list");
	for (var i = 0; i < bookInputElems.length; i++)
	{
		var input = bookInputElems[i].querySelector('input', 'textarea');
		input.value = "";
		bookConditionInput.value = 1;
	}
	
}

function generateNewBookPost(bookUrl, bookTitle, bookEdition, bookAuthor, bookCondition, bookPrice, bookPostDate, bookCourse, bookDetails, sellerName, sellerRating, sellerInfo)
{
	var bookPostTemplate = Handlebars.templates.bookPost;
	var bookData = 
	{
		url: bookUrl,
		title: bookTitle,
		edition: bookEdition,
		author: bookAuthor,
		condition: bookCondition,
		price: bookPrice,
		date: bookPostDate,
		course: bookCourse,
		details: bookDetails,
		name: sellerName,
		rating: sellerRating,
		info: sellerInfo
	};
	return bookPostTemplate(bookData);
	
}

function insertNewBookPost()
{
	var bookUrl = document.getElementById("book-url-input");
	var bookTitle = document.getElementById("book-title-input");
	var bookEdition = document.getElementById("book-edition-input");
	var bookAuthor = document.getElementById("book-author-input");
	var bookCondition = getCondition();
	var bookPrice = document.getElementById("book-price-input");
	var bookPostDate = getPostDate();
	var bookCourse = document.getElementById("book-course-input");
	var bookDetails = document.getElementById("book-details-input");
  var sellerName = "Seller Name Here";
  var sellerRating = 1;
  var sellerInfo = "Seller Info Here";
	
	if (bookUrl && bookTitle && bookEdition && bookAuthor && bookPrice && bookCourse && bookDetails)
	{
		var newBookPost = generateNewBookPost(bookUrl, bookTitle, bookEdition, bookAuthor, bookCondition, bookPrice, bookPostDate, bookCourse, bookDetails, sellerName, sellerRating, sellerInfo);
		var bookContainer = document.querySelector(".book-posts-container");
		bookContainer.insertAdjacentHTML("beforeend", newBookPost);
		allBookPosts.push(newBookPost);
		
		closeCreateBookModal();
	}
	else
	{
		alert("You must enter something into all fields!");
	}	
}

function getCondition()
{
	var bookCondition = document.getElementById("book-condition-list");
	condition = bookCondition.options[bookCondition.selectedIndex].text;
	return condition;
}

function getPostDate()
{
	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var postDate = month + "/" + day;
	return postDate;
}

function doBookSearch()
{
	var searchQuery = document.getElementById("navbar-search-input").value;
	searchQuery = searcyQuery ? searchQuery.trim().toLowerCase : '';
	
	var bookContainer = document.querySelector(".book-posts-container");
	while (bookContainer.lastChild)
	{
		bookContainer.removeChild(bookContainer.lastChild);
	}
	
	allBookPosts.forEach(function (bookPost)
	{
		if (!searchQuery || bookPost.textContent.toLowerCase().indexOf(searchQuery) !== -1)
		{
			bookContainer.appendChild(bookPost);
		}
	});
}

window.addEventListener("DOMContentLoaded", function () 
{
	var bookPostsCollection = document.getElementsByClassName("book-post");
	for (var i = 0; i < bookPostsCollection.length; i++)
	{
		allBookPosts.push(bookPostsCollection[i]);
	}
	
	var createBookPostButton = document.getElementById("create-book-post-button");
	createBookPostButton.addEventListener("click", showCreateBookModal);
	
	var modalCloseButton = document.getElementsByClassName("modal-close-button");
	modalCloseButton[0].addEventListener("click", closeCreateBookModal);
	
	var modalCancelButton = document.getElementsByClassName("modal-cancel-button");
	modalCancelButton[0].addEventListener("click", closeCreateBookModal);
	
	var modalAcceptButton = document.getElementsByClassName("modal-accept-button");
	modalAcceptButton[0].addEventListener("click", insertNewBookPost);
	
	var searchButton = document.getElementById("navbar-search-button");
	searchButton.addEventListener("click", doBookSearch);
	
	var searchInput = document.getElementById("navbar-search-input");
	searchInput.addEventListener("input", doBookSearch);
});
