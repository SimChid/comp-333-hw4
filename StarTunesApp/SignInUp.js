import axios from "axios";
import React, {Component, useState} from "react";
import { Text, View, Button, TextInput } from "react-native";
/*
class SignInUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            preferredPage: "",
            username: "",
            password: "",
            confirm: "",
            information: "Please login or sign up to access ratings."
        };
    }

    trackUsername = (event) => { // Update the username state on the fly
        this.setState({username: Text}) ;
    } ;
    trackPassword = (event) => { // Update the password state on the fly
        this.setState({password: Text}) ;
    } ;
    trackConfirm = (event) => { // Update the confirm password state on the fly
        this.setState({confirm: Text}) ;
    } ;

    //LogInHandler and SignUpHandler pulled from SimChid/comp-333-hw3
    LogInHandler = (event) => { // Send the HTTP request to log in
        event.preventDefault() ;
        axios.post("http://localhost/comp-333-hw3/index.php/user/read", 
        {
            username : this.state.username,
            password : this.state.password
        }).then((response) => { 
            if (response.data === "login success"){
                this.props.setLoggedIn(true)
            } else {
                this.setState({information : "Incorrect username or password"})
            }
        }).catch((error) => console.log(error)) ; // Handle errors
    } ;
    
    SignUpHandler  = (event) => { // Send the HTTP request to sign up
        event.preventDefault() ;
        fetch("http://localhost/comp-333-hw3/index.php/user/create",{
            method : "POST",
            body : JSON.stringify({username : this.state.username, p1 : this.state.password, p2 : this.state.confirm})
        }).then((response) => {
            if (response.data === "user created"){
                this.props.setLoggedIn(true)
            } else {
                this.setState({information : response.data})
            }
        }).catch((error) => console.log(error)) ;
        
        axios.post("http://localhost/comp-333-hw3/index.php/user/create", // Request
            {username : this.state.username,p1 : this.state.password, p2 : this.state.confirm}).then((response) => // Info
            { // What to do with the response
                if (response.data === "user created"){
                    this.props.setLoggedIn(true)
                } else {
                    this.setState({information : response.data})
                }
            }).catch((error) => console.log(error)) ; // Handle errors 
    } ;

    render() {
        switch (this.state.preferredPage) {
            default :
                return(
                    <View>
                        <Text>Welcome to StarTunes!</Text>
                        <Text> {this.state.information} </Text>
                        <TextInput
                            onChangeText = {this.trackUsername}
                            placeholder = "Username"
                        />
                        <TextInput
                            onChangeText = {this.trackPassword}
                            secureTextEntry={true}
                            placeholder = "Password"
                        />
                        <Button 
                            onFormSubmit = {this.LogInHandler}
                            title = "Log In"
                        />
                        <Text>New to StarTunes?</Text>
                        <Button 
                            onPress = {() => this.setState({preferredPage: "Sign up"})}
                            title = "Create Account"
                        />
                    </View>
                    );
            case "Sign up" :
                return(
                    <View>
                        <Text>Create an account: </Text>
                        <TextInput 
                            onChangeText = {this.trackUsername} 
                            placeholder = "Username"
                        />
                        <TextInput
                            onChangeText = {this.trackPassword}
                            secureTextEntry = {true}
                            placeholder = "Password"
                        />
                        <TextInput
                            onChangeText = {this.trackConfirm}
                            secureTextEntry = {true}
                            placeholder = "Confirm Password"
                        />
                        <Button 
                            onPress = {this.SignUpHandler}
                            title = "Sign Up"
                        />
                        <Button 
                            onPress = {() => this.setState({preferredPage: ""})}
                            title = "Return to Login"
                        />
                    </View>
                )
            }
        
    }

}

*/

/* 
I used ChatGPT to understand using functions instead of classes and 
got help with setting state here.
*/
const SignInUp = () => {
    const [uname,setUsername] = useState('') ;
    const [password,setPassword] = useState('') ;
    const [confirm,setConfirm] = useState('') ;
    const [preferredPage,setPreferredPage] = useState('') ;
    const [information,setInformation] = useState('Information') ;

    const handleSU = (event) => {
        print(signUpData) ;
        event.preventDefault() ;
        fetch("http://localhost/comp-333-hw3/index.php/user/create",{
            method : "POST",
            body : JSON.stringify({username : uname, p1 : password, p2 : confirm})
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

export default SignInUp;