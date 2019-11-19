// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants"

$(document).ready(function() {
    
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
        $('#welcome').text('Welcome ' + user.displayName )
        $('#login').css('display', 'none')
        validateUser()
    }

    $('#signout').on('click', function(){
        localStorage.setItem('user', JSON.stringify(''))
        location.href = '/search'
    })

    let email = ({
        name: user.email
    })
    let userId = ""
    
    function validateUser() {
        $.get("/api/user", function(data){
            console.log(data.length)
            console.log(data)
            let currentUserValid = false
            if (data.length === 0) {
                addUser()
            } else {
                for (let i = 0; i < data.length; i++){
                    console.log(data)
                    console.log(data.length)
                    console.log(data[i].name)
                    console.log(email.name)
                    if (data[i].name === email.name ) {
                        currentUserValid = true
                        userId = data[i].id    
                    } else {
                        console.log('no')
                    }
                }
                if (!currentUserValid) {
                    console.log("new user")
                    addUser()
                } else {
                    console.log('already a user')
                    console.log(userId)  
                    getItems()
                }
            }
        })
    }

   
    function getItems() {
        console.log(userId)
        UserId = userId || "";
        console.log(UserId)
        // authorId = "/?author_id=" + authorId;
        
        $.get("/api/user/" + userId, function(data){
            console.log(data)
            for (let i = 0; i < data.length; i++){
                console.log(data[i].itemId)
                console.log(data[i].catagory)
                let queryUrl =  'https://itunes.apple.com/lookup?id=' + data[i].itemId
                
                $.ajax({
                    url: queryUrl,
                    method: "GET",
                    // The name of the callback parameter
                    jsonp: "callback",
        
                    // Tell jQuery we're expecting JSONP
                    dataType: "jsonp",
                    // Work with the response
                    success: function (response) {
                    console.log(response);
                    

                    const cardDiv = $("<div class= 'cardDiv'>")
                    const movieDiv = $("<div class='cardImg'>");
                    const movieDiv2 = $("<div class='cardText'>")
                    const artwork = response.results[0].artworkUrl100;
                    const pOne = $("<img>").attr({
                        src: artwork,
                        class: "displayPic",

                    });
                    movieDiv.append(pOne);

                   

                    if(data[i].catagory === 'tvSeason') {
                        console.log('tv show')
                        const name = response.results[0].collectionName
                        const title = $('<p>').text("Title: " + name)
                        movieDiv2.append(title)

                        const kind = response.results[0].collectionType
                        const type = $('<p>').text("Kind: " + kind)
                        movieDiv2.append(type)

                        const genre = response.results[0].primaryGenreName
                        const genreType = $('<p>').text("Genre: " + genre)
                        movieDiv2.append(genreType)
                    } else {


                    const name = response.results[0].trackName;
                    const pTwo = $("<p>").text("Title: " + name);
                    movieDiv2.append(pTwo);
                    //   -----------------------------------------------
                    const artist = response.results[0].artistName;
                    const pThree = $("<p>").text("Artist: " + artist);
                    movieDiv2.append(pThree);
                    //   ------------------------------------------------
                    const kind = response.results[0].kind;
                    const pFour = $("<p>").text("Kind: " + kind);
                    movieDiv2.append(pFour);
                    }

                    const minus = $('<div>').attr({
                        id: "tt1",
                        class: "icon material-icons destroyButton",
                        id: data[i].id
                    })
                    movieDiv2.append(minus)

                    $(cardDiv).append(movieDiv);
                    $(cardDiv).append(movieDiv2)
                    $('#box').append(cardDiv)
                    $('.destroyButton').text('cancel')
                
                
                
                    }
                })
            }
        })
    }

    $('.listButton').on('click', function(){
       console.log(userId)
       value = $(this).val()
       console.log(value)
       $('#box').text('')
        
        
        $.get("/api/user/" + userId + "/" + value, function(data){
            console.log(data)
            for (let i = 0; i < data.length; i++){
                console.log(data[i].itemId)
                console.log(data[i].catagory)
                let queryUrl =  'https://itunes.apple.com/lookup?id=' + data[i].itemId
                
                $.ajax({
                    url: queryUrl,
                    method: "GET",
                    // The name of the callback parameter
                    jsonp: "callback",
        
                    // Tell jQuery we're expecting JSONP
                    dataType: "jsonp",
                    // Work with the response
                    success: function (response) {
                    console.log(response);
                    

                    const cardDiv = $("<div class='cardDiv'>")
                    const movieDiv = $("<div class='cardImg'>");
                    const movieDiv2 = $("<div class='cardText'>")
                    const artwork = response.results[0].artworkUrl100;
                    const pOne = $("<img>").attr({
                        src: artwork,
                        class: "displayPic",

                    });
                    movieDiv.append(pOne);

                    if (data[i].category === 'tvSeason') {
                        console.log('tv show')
                        const name = response.results[0].collectionName
                        const title = $('<p>').text("Title: " + name)
                        movieDiv2.append(title)

                        const kind = response.results[0].collectionType
                        const type = $('<p>').text("Kind: " + kind)
                        movieDiv2.append(type)

                        const genre = response.results[0].primaryGenreName
                        const genreType = $('<p>').text("Genre: " + genre)
                        movieDiv2.append(genreType)
                   
                    } else {

                    const name = response.results[0].trackName;
                    const pTwo = $("<p>").text("Title: " + name);
                    movieDiv2.append(pTwo);
                    //   -----------------------------------------------
                    const artist = response.results[0].artistName;
                    const pThree = $("<p>").text("Artist: " + artist);
                    movieDiv2.append(pThree);
                    //   ------------------------------------------------
                    const kind = response.results[0].kind;
                    const pFour = $("<p>").text("Kind: " + kind);
                    movieDiv2.append(pFour);
                    }

                    const minus = $('<div>').attr({
                        id: "tt1",
                        class: "icon material-icons destroyButton",
                        catagory: value,
                        UserId: userId,
                        id: data[i].id
                    })
                    
                    movieDiv2.append(minus)

                    $(cardDiv).append(movieDiv);
                    $(cardDiv).append(movieDiv2)
                    $('#box').append(cardDiv)
                    $('.destroyButton').text('cancel')
                
                    }
                })
            }
        })
    })
        

    function addUser() {
        $.post("/api/new", email)
        .then(function(email) {
            // Log the data we found
        console.log(email);
        })
     }

     $(document).on('click', '.destroyButton', destroyObject)

     function destroyObject() {
         console.log('minus')
             $(this).css('display', 'none')
         item = ({
             id: $(this).attr('id')
         })
         let id = $(this).attr('id')
         console.log(item)

        $.ajax({
            method: "DELETE",
            url: "/api/item/" + id
        })
            .then(function() {
                location.reload()
            });
        }
     
}) 