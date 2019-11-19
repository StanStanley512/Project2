# The Later List

## Concept and Motivation

The concept of our app originated from the hustle and bustle in everyday life and not always having the time to take a friend’s recommendation for a new movie, tv show, or podcast.

With our app, *“The Later List”*, users will be able to search for recommended podcasts, tv shows, or movies and save them to your list for when you have time later.

![Image of Homepage](https://github.com/StanStanley512/Project2/blob/master/public/img/sign-up-page-screenshot.JPG)
![Image of search page](https://github.com/StanStanley512/Project2/blob/master/public/img/search-screenshot.JPG)

## Design Process

- Built LaterListdb in MySQL
  - Store users name, email, password, register date, and saved searches.
- Used Sequelize.js library to put user data into SQL database
  - And vice versa, sequelize enables the app to recognize when a client is a registered user and populates user data.
- Installed Node to provide server for our app
  - Used .gitignore to hide node_modules.
- Installed Express to listen to users requests 
- Utilized iTunes API to get data for podcasts
  - Used “GET” method to get artwork, trackID, collectionName (name of podcast), artistName (name of host(s)), and kind (assigns podcast category) from our response. Used .post to save user’s selection to their list.
- Material Design Lite provided framework for UI
  - New library to complete a polished frontend/UI.


## Technologies used

- MySQL
- Sequelize.js
- Node.js
- Express.js
- iTunes API
- Material Design Lite

## Future Development

- Versatility to include Music, Music Videos, and TV shows.
- Give users access to share lists with friends or network.
- Create more dynamic interface.
- Give users a browse feature to provide recommendations.
