import axios from "axios";
import React, {Component} from "react";
import { Text, View, Button, TextInput } from "react-native";

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
                            onFormSubmit = {this.SignUpHandler}
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

export default SignInUp;