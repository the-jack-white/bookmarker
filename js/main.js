// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {      // Pass an event parameter
    // Get form values
    var siteName = document.getElementById('siteName').value;
    console.log(siteName);
    var siteURL = document.getElementById('siteURL').value;
    console.log(siteURL);

    if(!validateForm(siteName, siteURL)){
        return false;
    }

    // Save bookmark in an array
    var bookmark = {
        name: siteName,
        url: siteURL,
    }

    /*
        // Save array to local storage
        localStorage.setItem('test', 'Hello World')
        console.log(localStorage.getItem('test'));
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));
    */

    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Reset back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form

document.getElementById('myForm').reset();

    // Re-fetch Bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url) {
    console.log(url);
    // Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Reset back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch Bookmarks
    fetchBookmarks();
}

//Fetch bookmarks

function fetchBookmarks() {
    // Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output ID
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML +=   '<div class="well">'+
                                        '<h3>'+name+
                                        ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                        '</h3>'+
                                        '</div>';
    }
}

// Validate form
function validateForm(siteName, siteURL){
    if(!siteName || !siteURL){
        alert('Please fill out the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL starting with http');
        return false;
    }

    return true;
}