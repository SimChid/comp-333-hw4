# comp-333-hw4
Mobile app for creating music

All files are stored in the StarTunesApp. The backend for this app can be found in the repo at [this link]([https://link-url-here.org](https://github.com/SimChid/comp-333-hw3)https://github.com/SimChid/comp-333-hw3). 

The work on this project was an even 50-50 split between Simon and Aaron.

## App.js

The `App` component is more or less the parent component that organizes the page, tracking the logged in status of the user, and from that controlling what content is visible. At the bottom is styling.

## CreateUdpate.js

The component `RatingForm` is the form that pops up when you click on the button to add a song. The component `CreateRating` provides the button at the bottom of the page and toggles on and off the create form. Finally, there is stylling at the bottom of the file.

## SignInUp.js

This file has all of the components related to signing in and signing up. The component `SignInUp` is the parent that manages the information within is the functionality to choose between signing up and logging in, plus move between the screens and update the `App` component once the user has successfully logged in or signed up.

## SongList.js

The component `SongRowPopUp` allows for updating and deleting functionality (only for the song ratings that the signed in user has posted). It controls the page that pops up when a song is selected from the listing of songs. The component `SongRow` is the component that is generated for each song in the database when it is queried and put into the list that appears in the middle of the screen. The component `SongList` is responsible for querying the database to get the data that is put into the components. This query is then fed item by item to create the list of `SongRow` components. At the bottom is some styling.


## Remaining Files
The other files and directories are for running the app, created by React Native, and not modified in the development process.
