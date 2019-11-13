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

    let userId = ""
    let email = ({
        name: user.email
    })
    let item = ({})

 


    
    function validateUser() {
        $.get("/api/user", function(data){
            console.log(data.length)
            console.log(data)
            let currentUserValid = false
            if (data.length === 0) {
                // addUser()
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
                } else {
                    console.log('already a user')
                    console.log(userId) 
                    // callData()
                }
            }
        })
    }



    // async function callData(){
    //     console.log('in call data')
    //     try{
    //         console.log('in try')
    //         const callPod = await callPodcast()
       

    //         // const results = await Promise.all([callPodcast, addItem])
    //     } catch(e){
    //         throw e
    //     }
    // }
   
    $('#searchButton').on('click', function(event){
        event.preventDefault()
        let searchTerm = $('#search').val().trim()
        console.log(searchTerm)
        console.log('working')   
    // function callPodcast() {
        const podQueryURL = 'https://itunes.apple.com/search?term=' + searchTerm + '&entity=podcast&limit=10'
        let lookUpId = 'https://itunes.apple.com/lookup?id=769189585'
        $.ajax({
            url:  podQueryURL,
            method: "GET",
            // The name of the callback parameter
            jsonp: "callback",

            // Tell jQuery we're expecting JSONP
            dataType: "jsonp",
            // Work with the response
            success: function(response) {
                console.log( response );
                console.log(response.results.length)
                for (let i = 0; i < response.results.length; i++){
             // server response
                    console.log(response.results[i].artworkUrl100)
                    console.log(response.results[i].trackId)
                    console.log(response.results[i].collectionName)
                    console.log(response.results[i].artistName)
                    console.log(response.results[i].kind)
                    console.log('------------------------------------')

                    const movieDiv = $("<div class='podcast'>");
//             //   ------------------------------------------
            const id = response.results[i].trackId;
            const pID = $("<p>").text("Id" + id);
            movieDiv.append(pID);
            const artwork = response.results[i].artworkUrl100;
            const pOne = $("<p>").text("Artwork: " + artwork);
            movieDiv.append(pOne);
            //   ---------------------------------------------
            const name = response.results[i].collectionName;
            const pTwo = $("<p>").text("Name: " + name);
            movieDiv.append(pTwo);
            //   -----------------------------------------------
            const artist = response.results[i].artistName;
            const pThree = $("<p>").text("Artist: " + artist);
            movieDiv.append(pThree);
            //   ------------------------------------------------
            const kind = response.results[i].kind;
            const pFour = $("<p>").text("Kind: " + kind);
            movieDiv.append(pFour);
            
            $("#box").prepend(movieDiv);
   
             }
                }
            //  item = ({
            //     catagory: "podcast",
            //     title: response.results[0].collection,
            //     itemid:  response.results[0].trackId,
            //     UserId: 2
            // })
            
            // console.log(item)

            // return item
            // }
        })
    })
    // }

    
    function addAnItem(){
        console.log('ITEM')
        $.post("/api/newItem", item)
        .then(function(item){
            console.log(item)
            console.log('in post')
        })
    }

    

//     let movie = $(this).val("#movie-input");
//         // let movie = $('#movie-form').val();
//         const queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=c21b2973";
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).then(function(response) {
//             // console.log(response)
//             $("#search-movie").on("click", function(event){
//             console.log(movie)
//             event.preventDefault();
//             console.log("I work!")
//             console.log(response.Title)
//             const movieDiv = $("<div class='movie'>");
//             //   ------------------------------------------
//             const id = response.imdbID;
//             const pID = $("<p>").text("ID: " + id);
//             movieDiv.append(pID);
//             //   -----------------------------------------------
//             const rating = response.Rated;
//             const pOne = $("<p>").text("Rating: " + rating);
//             movieDiv.append(pOne);
//             //   ---------------------------------------------
//             const released = response.Released;
//             const pTwo = $("<p>").text("Released: " + released);
//             movieDiv.append(pTwo);
//             //   -----------------------------------------------
//             const plot = response.Plot;
//             const pThree = $("<p>").text("Plot: " + plot);
//             movieDiv.append(pThree);
//             //   ------------------------------------------------
//             const review = response.imdbRating;
//             const pFour = $("<p>").text("Score: " + review);
//             movieDiv.append(pFour);
//             //   ------------------------------------------------
//             const genre = response.Genre;
//             const pFive = $("<p>").text("Genre: " + genre);
//             movieDiv.append(pFive);
//             //   ------------------------------------------------
//             const imgURL = response.Poster;
//             const image = $("<img>").attr("src", imgURL);
//             movieDiv.append(image);
//             $("#movies-view").prepend(movieDiv);
//             });

})