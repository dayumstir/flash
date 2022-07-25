import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image} from 'react-native'
import { Snackbar } from 'react-native-paper';
import { useState } from "react";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);

    const onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch(() => {
                setIsValid({ bool: true, boolSnack: true, message: "Invalid email address / password." })
            })
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/flash_icon.png')}
                style={styles.logo}
            />
            
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder="Email Address"
                    placeholderTextColor='#bbb'
                    style={styles.textInput}
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.space}/>

            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor='#bbb'
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            
            <View style={styles.space}/>

            {/* Sign In Button */} 
            <TouchableOpacity activeOpacity={0.5} style={styles.loginButton} onPress={() => onLogin()}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.space}/>

            <Text style={{ color: '#bbb' }}
                title="Register"
                onPress={() => props.navigation.navigate("Register")} >
                Don't have an account? Sign up here!
            </Text>

            <Snackbar
                visible={isValid.boolSnack}
                duration={2000}
                onDismiss={() => { setIsValid({ boolSnack: false }) }}>
                {isValid.message}
            </Snackbar>

        </View>
    )
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
        backgroundColor: '#444'
    },
    textInput: {
        color: 'white', 
        padding: 15
    },
    loginButton: {
        flexDirection: 'row', 
        height: 50, 
        width: 150,
        backgroundColor: '#C45C01',
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