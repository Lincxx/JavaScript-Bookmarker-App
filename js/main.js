//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e) {
    var siteName = document.getElementById('siteName').value
    var siteUrl = document.getElementById('siteUrl').value

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url : siteUrl
    }

    //local storage test
    // localStorage.setItem('test', 'hello');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test')
    // console.log(localStorage.getItem('test'));

    console.log(bookmark);

    //test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        //init bookmarks array
        var bookmarks = [];
        bookmarks.push(bookmark);
        //set to localStorage
        console.log(bookmarks)
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        //add bookmark to array
        bookmarks.push(bookmark);

        //re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    //clear form
    document.getElementById('myForm').reset();

    //re-fetch bookmarks
    fecthBookmarks();
    //localStorage.removeItem('bookmarks');
    e.preventDefault();
}


//deleteBookmark

function deleteBookmark(url) {

    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //loop bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url) {
            //remove from array
            bookmarks.splice(i,1);
        }
    }



    //re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fecthBookmarks();
}

//fetch bookmarks
function fecthBookmarks() {
    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get out id
    var bookmarkResults = document.getElementById('bookmarkResults');

    //build our output
    bookmarkResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="well">'+
                                    '<h3>' + name +
                                    ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                    ' <a class="btn btn-danger" href="#" onclick="deleteBookmark(\''+url+'\')">Delete</a>'+
                                    '</h3>' +
                                    '</div>';
    }

}

function validateForm(siteName, siteUrl){
    if (!siteUrl || !siteName) {
        alert("Please fill in the form")
        //stops it from processing anymore
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
      alert("Please use a valid url");
      return false;
    }

    return true;
}
