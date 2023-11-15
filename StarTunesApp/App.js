import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import SignInUp from './SignInUp';
import SongList from './SongList';
import CreateRating from './CreateUpdate';
import DropDown from './SortingDropDown';

export default function App() {
  // Setting up initial parameters before the user logs in
  let [loggedIn,setLoggedIn] = React.useState(false);
  const [username,setParentUsername] = useState('') ;
  const [sortBy, setSortBy] = useState('artist') ;

  // function to log out the user
  const LogOut = () => {
    setLoggedIn(false);
    setParentUsername('');
  }
  
  if (loggedIn) {
    return(
      <View style={styles.container}>
        {/* Welcome text */}
        <Text style = {styles.welcome} ></Text>
        <Text style = {styles.welcome} >Welcome, {username}!</Text>
        <Text style = {styles.welcome}> Select how to sort the song list</Text>
        {/* Dropdown menu to select value to sort by */}
        <DropDown SortBy = {setSortBy}/>
        {/* Send user to Model to create new rating */}
        <CreateRating Username = {username} />
        {/* Displays all ratings from all users */}
        <SongList user = {username} sortBy = {sortBy}/>
        {/* Logs the user out */}
        <Button 
          onPress = {LogOut}
          title = "Log out"
        />
      </View>
    );
  }else{
    // If not logged in, redirected to signin page
    // Function to set username and logged in state carried to SingInUp function
    return (
      <View style={styles.container}>
        <SignInUp setLoggedIn = {setLoggedIn} setParentUsername = {setParentUsername}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical:125,
    marginBottom: 25
  },
  welcome: {
    paddingTop: 10,
    color: 'purple',
    fontSize: 24
  }
});
