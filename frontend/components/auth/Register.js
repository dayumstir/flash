import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image} from 'react-native'
import { Snackbar } from 'react-native-paper';
import { useState } from "react";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


export default function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(true);

    const onRegister = () => {
        if (name.length == 0 || email.length == 0 || password.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything." })
            return;
        }
        if (!email.includes('@')) {
            setIsValid({ bool: true, boolSnack: true, message: "Please enter a valid email." })
            return;
        }
        if (password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: "Password must be at least 6 characters." })
            return;
        }

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
            .catch(() => {
                setIsValid({ bool: true, boolSnack: true, message: "Account already exists." })
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
                    placeholder="Name"
                    placeholderTextColor='#bbb'
                    style={styles.textInput}
                    onChangeText={(name) => setName(name)}
                />
            </View>

            <View style={styles.space}/>
            
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
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <View style={styles.space}/>

            {/* Create Account Button */} 
            <TouchableOpacity activeOpacity={0.5} style={styles.registerButton} onPress={() => onRegister()}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Create Account</Text>
            </TouchableOpacity>

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