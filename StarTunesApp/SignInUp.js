import React, {useState} from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";

const SignInUp = (props) => {
    // Setting initial states
    const [loggedIn,setLoggedIn] = useState(false) ;
    const [uname,setChildUsername] = useState('') ;
    const [password,setPassword] = useState('') ;
    const [confirm,setConfirm] = useState('') ;
    const [preferredPage,setPreferredPage] = useState('') ;
    const [information,setInformation] = useState('') ;

    LogInHandler = () => { // Send the HTTP request to log in
        fetch("http://<youripaddress>/comp-333-hw3/index.php/user/read",{
            method: "POST" ,
            body: JSON.stringify({username: uname, password : password})
        }).then(
            (response) => response.json()).then(
                (json) => {
                    if (json === "login success"){
                        props.setLoggedIn(true)
                        props.setParentUsername(uname)
                    } else {
                        setInformation(json)                        
                    }
                }
            ).catch((error) => console.log(error)) ;

    } ;
    
    SignUpHandler  = () => { // Send the HTTP request to create a new user, i.e. register
        fetch("http://<youripaddress>/comp-333-hw3/index.php/user/create",{
            method : "POST",
            body : JSON.stringify({username : uname, p1 : password, p2 : confirm})
        }).then(
            (response) => response.json()).then(
                (json) => {
                    if (json === "user created"){
                        //setInformation(json)
                        props.setLoggedIn(true)
                        props.setParentUsername(uname)
                    } else {
                        setInformation(json)
                    }
                }).catch((error) => console.log(error)) ;
    };

    switch (preferredPage) {
        // If the user is signing up
        case "Sign up" :
            return(
                <View>
                    <Text style = {styles.welcome}>Welcome to StarTunes!</Text>
                    <Text style = {styles.instruction}> {information} </Text> 
                    <TextInput onChangeText = {setChildUsername} placeholder = "Username" style = {styles.form} />
                    <TextInput onChangeText = {setPassword} secureTextEntry={true} placeholder = "Password" style = {styles.form} />
                    <TextInput onChangeText = {setConfirm} secureTextEntry={true} placeholder = "Confirm" style = {styles.form} />
                    <Button onPress = {SignUpHandler} title = "Sign Up!" />
                    <Text style = {styles.instruction}>Already have an account? Tap below to sign in!</Text>
                    <Button onPress = {() => setPreferredPage("Log In")} title = "Log In" />
                </View>
                );
        // If the user is logging in on an account that already exists
        case "Log In" :
            return(
                <View>
                    <Text style = {styles.welcome}>Welcome back to StarTunes!</Text>
                    <Text style = {styles.instruction}>Enter Your Username and Password</Text>
                    <Text style = {styles.instruction}>{information}</Text>
                    <TextInput onChangeText = {setChildUsername} placeholder = "Username" style = {styles.form} />
                    <TextInput onChangeText = {setPassword} secureTextEntry={true} placeholder = "Password" style = {styles.form} />
                    <Button onPress = {LogInHandler} title = "Log In" />
                    <Text style = {styles.instruction}>New to StarTunes?</Text>
                    <Button onPress = {() => setPreferredPage("Sign up")} title = "Create Account" />
                </View>
            ) ;
        default :
        // Initial state of the login screen so the user can choose to login or sign up
            return(
                <View>
                    <Button onPress = {() => setPreferredPage("Sign up")} title = "Create Account" />
                    <Button onPress = {() => setPreferredPage("Log In")} title = "Sign In" />
                </View>
            );
    }

}



/*
Everything below this line and above the stylesheet are dev notes and test cases.

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
        fetch("http://<ip>/comp-333-hw3/index.php/user/create",{
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

const styles = StyleSheet.create({
    welcome: {
        color: 'purple',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: "center"
    },
    form: {
        marginHorizontal: 5,
        backgroundColor: "white",
        marginVertical: 8,
        fontSize: 14,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 5
    },
    instruction: {
        textAlign: "center",
        fontSize: 18,
        color: 'purple'
    }
})