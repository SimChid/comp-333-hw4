# comp-333-hw4
Mobile app for creating music

All files are stored in the StarTunesApp. The backend for this app can be found in the repo at [this link](https://github.com/SimChid/comp-333-hw3). Instructions to install will be in the README file.

The work on this project was an even 50-50 split between Simon and Aaron.

To run the app, clone the repository, navigate to make StarTunesApp your working directory, and then input the command `npm run android` while you have an emulator from android studio open and running. This should automatically open up the app Expo Go in the emulator (it should also auto-install the app if it wasn't already installed). To get the app to load, you will have to install the SelectList component using the command `npm install react-native-dropdown-select-list` (if it is not already installed).

Once the app is opened and running, click to log in or sign up and follow the prompts to accomplish that. Once your session is associated with an account (by logging in or signing up), there will be a list of songs on the main page. The songs for which you are the rater will have options to update or delete the rating once you tap on them. For the rest, tapping on them will bring up the rating, but no option to modify or delete the rating.

Please note that you have to put your ip address in the following locations:

CreateUpdate:
-   Line 12

SignInUp:
-   Line 14
-   Line 32

SongList:
-   Line 17
-   Line 33
-   Line 202

## App.js

The `App` component is more or less the parent component that organizes the page, tracking the logged in status of the user, and from that controlling what content is visible. At the bottom is styling.

## CreateUdpate.js

The component `RatingForm` is the form that pops up when you click on the button to add a song. The component `CreateRating` provides the button at the bottom of the page and toggles on and off the create form. Finally, there is stylling at the bottom of the file.

## SignInUp.js

This file has all of the components related to signing in and signing up. The component `SignInUp` is the parent that manages the information within is the functionality to choose between signing up and logging in, plus move between the screens and update the `App` component once the user has successfully logged in or signed up.

## SongList.js

The component `SongRowPopUp` allows for updating and deleting functionality (only for the song ratings that the signed in user has posted). It controls the page that pops up when a song is selected from the listing of songs. The component `SongRow` is the component that is generated for each song in the database when it is queried and put into the list that appears in the middle of the screen. The component `SongList` is responsible for querying the database to get the data that is put into the components. This query is then fed item by item to create the list of `SongRow` components. At the bottom is some styling.

## SortingDropDown.js

Provides the `DropDown` component which is the dropdown to choose how to sort the song rating list.
## Remaining Files
The other files and directories are for running the app, created by React Native, and not modified in the development process.

## Additional feature:

We added dropdown menu to slect how the songs are sorted in the list, as explained in the **SrotingDropDown.js** section above. Click the dropdown menu inside the app and select how you want to sort the songs.
