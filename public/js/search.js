$(document).ready(function () {

    // added by tim 11 / 13: to make search text field label work
    // import { MDCFloatingLabel } from '@material/floating-label';

    // const floatingLabel = new MDCFloatingLabel(document.querySelector('.mdc-floating-label'));
    // end tim's 11/13 addition

    console.log("start")
    let user = JSON.parse(localStorage.getItem('user'))
    // console.log(user)
    // console.log(user.email)
    console.log(user)

    if (!user) {
        console.log('no user')
        $('#signout').css('display', 'none')
        $('#myList').css('display', 'none')

    } else {
        console.log('there is a user')
        $('#welcome').text('Welcome ' + user.displayName)
        $('#login').css('display', 'none')
        validateUser()
    }

    $('#signout').on('click', function () {
        localStorage.setItem('user', JSON.stringify(''))
        location.href = '/search'
    })

    let userId = ""
    let email = ({
        name: user.email
    })
    let item = ({})





    function validateUser() {
        $.get("/api/user", function (data) {
            console.log(data.length)
            console.log(data)
            let currentUserValid = false
            if (data.length === 0) {
                // addUser()
            } else {
                for (let i = 0; i < data.length; i++) {
                    console.log(data)
                    console.log(data.length)
                    console.log(data[i].name)
                    console.log(email.name)
                    if (data[i].name === email.name) {
                        currentUserValid = true
                        userId = data[i].id
                    } else {
                        console.log('no')
                    }
                }
                if (!currentUserValid) {
                    console.log("new user")
                } else {
                    console.log('already a user')
                    console.log(userId)
                    // callData()
                }
            }
        })
    }

    $('#searchButton').on('click', function (event) {
        event.preventDefault()
        $('#box').text('')
        value=  $('#type').val()
        console.log(value)
        let searchTerm = $('.search').val().trim()
        console.log(searchTerm)
        console.log('working')
        // function callPodcast() {
        
        const podQueryURL = 'https://itunes.apple.com/search?term=' + searchTerm + '&entity=' + value +'&limit=10'
        let lookUpId = 'https://itunes.apple.com/lookup?id=769189585'
        
        $.ajax({
            url: podQueryURL,
            method: "GET",
            // The name of the callback parameter
            jsonp: "callback",

            // Tell jQuery we're expecting JSONP
            dataType: "jsonp",
            // Work with the response
            success: function (response) {
                console.log(response);
                console.log(response.results.length)
                for (let i = 0; i < response.results.length; i++) {
                    // server response
                    console.log(response.results[i].artworkUrl100)
                    console.log(response.results[i].trackId)
                    console.log(response.results[i].trackName)
                    console.log(response.results[i].artistName)
                    console.log(response.results[i].kind)
                    console.log('------------------------------------')
                    

                    const cardDiv = $("<div>")
                    cardDiv.attr({
                        class: 'cardDiv '
                        // class: 'mdl-card mdl-shadow--2dp'
                    })
                    const movieDiv = $("<div class='cardImg inline'>");
                    const movieDiv2 = $("<div class='cardText inline'>")
                  
                    const artwork = response.results[i].artworkUrl100;
                    const pOne = $("<img>").attr({
                        src: artwork,
                        class: "displayPic",

                    });
                    movieDiv.append(pOne);

                      if(value === 'tvSeason') {
                        console.log('tv show')
                        const name = response.results[i].collectionName
                        const title = $('<p>').text("Title: " + name)
                        movieDiv2.append(title)

                        const kind = response.results[i].collectionType
                        const type = $('<p>').text("Kind: " + kind)
                        movieDiv2.append(type)

                        const genre = response.results[i].primaryGenreName
                        const genreType = $('<p>').text("Genre: " + genre)
                        movieDiv2.append(genreType)

                        const save = $('<div>').attr({
                            id: "tt1",
                            class: "icon material-icons saveButton",
                            catagory: value,
                            title: response.results[i].collectionName,
                            itemId: response.results[i].collectionId,
                            UserId: userId,
                        })
                        
                        movieDiv2.append(save)

                    } else {

                    const name = response.results[i].trackName;
                    const pTwo = $("<p>").text("Title: " + name);
                    movieDiv2.append(pTwo);
                    //   -----------------------------------------------
                    const artist = response.results[i].artistName;
                    const pThree = $("<p>").text("Artist: " + artist);
                    movieDiv2.append(pThree);
                    //   ------------------------------------------------
                    const kind = response.results[i].kind;
                    const pFour = $("<p>").text("Kind: " + kind);
                    movieDiv2.append(pFour);

                    const save = $('<div>').attr({
                        id: "tt1",
                        class: "icon material-icons saveButton",
                        catagory: value,
                        title: response.results[i].trackName,
                        itemId: response.results[i].trackId,
                        UserId: userId,
                    })
                   
                    movieDiv2.append(save)
                    
                }
                    $(cardDiv).append(movieDiv);
                    $(cardDiv).append(movieDiv2)
                    $('#box').append(cardDiv)
                    if (!user) {
                        $('.saveButton').text('')
                    } else {
                        $('.saveButton').text('add')
                    }
                
                }
            }
        }
     
        )
})

        $(document).on('click', '.saveButton', saveObject)

        function saveObject() {
            console.log('plus')
                $(this).css('display', 'none')
            item = ({
                category: $(this).attr('catagory'),
                title: $(this).attr('title'),
                itemId: $(this).attr('itemId'),
                UserId: $(this).attr('UserId')
            })
            console.log(item)
            $.post("/api/newItem", item)
                .then(function (item) {
                    console.log(item)
                    console.log('in post')
                })
                $(this).hide();
        }

})