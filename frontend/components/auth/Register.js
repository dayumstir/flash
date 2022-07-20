import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image} from 'react-native'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/flash_icon.png')}
                style={styles.logo}
            />
            
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor='#bbb'
                    style={styles.textInput}
                    onChangeText={(name) => this.setState({ name: name })}
                />
            </View>

            <View style={styles.space}/>
            
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder="Email Address"
                    placeholderTextColor='#bbb'
                    style={styles.textInput}
                    onChangeText={(email) => this.setState({ email: email })}
                />
            </View>

            <View style={styles.space}/>
            
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor='#bbb'
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={(password) => this.setState({ password: password })}
                />
            </View>

            <View style={styles.space}/>

            {/* Create Account Button */} 
            <TouchableOpacity activeOpacity={0.5} style={styles.registerButton} onPress={() => this.onSignUp()}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Create Account</Text>
            </TouchableOpacity>

        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: 'black'
    },
    logo: {
        flex: 0.4,
        justifyContent: 'flex-start',
        width: 400, 
        height: 400,
    },
    textInputContainer: {
        height: 50,
        width: 220,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'white',
        backgroundColor: '#333'
    },
    textInput: {
        color: 'white', 
        padding: 15
    },
    registerButton: {
      flexDirection: 'row', 
      height: 50, 
      width: 150,
      backgroundColor: '#E8B63E',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      padding: 10,
    },
    space: {
      width: 20,
      height: 20,
    },
  })

export default Register