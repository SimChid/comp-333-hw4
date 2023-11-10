import axios from "axios";
import React, {Component, useState} from "react";
import { Text, View, Button, TextInput } from "react-native";

const SignInUp = () => {
    const [loggedIn,setLoggedIn] = useState(false) ;
    const [uname,setUsername] = useState('') ;
    const [password,setPassword] = useState('') ;
    const [confirm,setConfirm] = useState('') ;
    const [preferredPage,setPreferredPage] = useState('') ;
    const [information,setInformation] = useState([]) ;

    LogInHandler = (event) => { // Send the HTTP request to log in
        fetch("http://<youripaddress>/comp-333-hw3/index.php/user/read",{
            method: "POST" ,
            body: JSON.stringify({username: uname, p1 : password})
        }).then((response) => {
            let output = response.json()
            if(output === "login success"){
                setLoggedIn(true)
            } else {
                setInformation(output)
            }
        }).catch((error) => console.log(error)) ;

    } ;
    
    SignUpHandler  = (event) => {
        fetch("http://<youripaaddress>/comp-333-hw3/index.php/user/create",{
            method : "POST",
            body : JSON.stringify({username : uname, p1 : password, p2 : confirm})
        }).then((response) => {
            let output = response.json()
            if (output === "user created"){
                setLoggedIn(true)
            } else {
                setInformation(output)
            }
        }).catch((error) => console.log(error)) ;
        // Process the form data here
        //console.log('Form Data:', formData);
        // You can send the data to a server, perform validation, etc.
    };

    switch (this.prefferedPage) {
        case "Sign up" :
            return(
                <View>
                    <Text>Welcome to StarTunes!</Text>
                    {/*<Text> {information} </Text> */}
                    <TextInput
                        onChangeText = {setUsername}
                        placeholder = "Username"
                    />
                    <TextInput
                        onChangeText = {setPassword}
                        secureTextEntry={true}
                        placeholder = "Password"
                    />
                    <Button 
                        onPress = {LogInHandler}
                        title = "Log In"
                    />
                    <Text>New to StarTunes?</Text>
                    <Button 
                        onPress = {() => setPreferredPage("Sign up")}
                        title = "Create Account"
                    />
                </View>
                );
        default :
            return(
                <View>
                    <Text>Create an account: </Text>
                    {/* <Text>{information}</Text> */}
                    <TextInput 
                        onChangeText = {setUsername} 
                        placeholder = "Username"
                    />
                    <TextInput
                        onChangeText = {setPassword}
                        secureTextEntry = {true}
                        placeholder = "Password"
                    />
                    <TextInput
                        onChangeText = {setConfirm}
                        secureTextEntry = {true}
                        placeholder = "Confirm Password"
                    />
                    <Button 
                        onPress = {SignUpHandler}
                        title = "Sign Up"
                    />
                    <Button 
                        onPress = {() => setPreferredPage('')}
                        title = "Return to Login"
                    />
                </View>
            )
    }

}



/*
I used ChatGPT to understand using functions instead of classes and 
got help with setting state here.


const SignInUp = () => {
    const [uname,setUsername] = useState('') ;
    const [password,setPassword] = useState('') ;
    const [confirm,setConfirm] = useState('') ;
    const [preferredPage,setPreferredPage] = useState('') ;
    const [information,setInformation] = useState('Information') ;

    const handleSU = (event) => {
        //print(signUpData) ;
        //event.preventDefault() ;
        fetch("http://172.21.68.84/comp-333-hw3/index.php/user/create",{
            method : "POST",
            body : JSON.stringify({username : "Jim", p1 : "jimjam", p2 : "jimjam"})
        }).then((response) => {
            if (response.data === "user created"){
                this.props.setLoggedIn(true)
            } else {
                this.setState({information : response.data})
            }
        }).catch((error) => console.log(error)) ;
        // Process the form data here
        //console.log('Form Data:', formData);
        // You can send the data to a server, perform validation, etc.
    };
    const handleLI = (event) => {} ;

    switch (preferredPage) {
        case "":
            <View>
                <Text>Welcome to StarTunes!</Text>
                <Text> {information} </Text>
                <TextInput placeholder = "Username" onChangeText={(text) => setUsername(text)} />
                <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} />
                <Button title = "Log In" onPress = {handleLI}  />
                <Text>New to StarTunes?</Text>
                //<Button onPress = {setPreferredPage('Sign Up')} title = "Create Account" />
            </View>

        case "Sign Up" :
            return (
                <View>
                    <TextInput placeholder="Username" onChangeText={(text) => setUsername(text)} />
                    <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} />
                    <TextInput placeholder="Confirm Password" onChangeText={(text) => setConfirm(text)} />  
                    <Button title="Submit" onPress={() => handleSU()} />
                </View>
            ) ;
        case "Log In" :
            return (
                <View>
                    <TextInput placeholder="Username" onChangeText={(text) => setUsername(text)} />
                    <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} />
                    <Button title="Log In" onPress={() => handleLI()} />
                </View>
            ) ;  
    }


} ;
*/


export default SignInUp;