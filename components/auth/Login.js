import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image} from 'react-native'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "black" }}>
            <Image 
                source={require('../../assets/flash_icon.png')}
                style={{ width: 400, height: 400 }}
            />
            
            <TextInput
                placeholder="Email Address"
                style={{color: 'white'}}
                onChangeText={(email) => this.setState({ email: email })}
            />

            <View style={styles.space}/>

            <TextInput
                placeholder="Password"
                style={{color: 'white'}}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password: password })}
            />

            <View style={styles.space}/>

            {/* Sign In Button */} 
            <TouchableOpacity activeOpacity={0.5} style={styles.LogButton} onPress={() => this.onSignUp()}>
                <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>

        </View>
        )
    }
}

const styles = StyleSheet.create({
    LogButton: {
      flexDirection: 'row', 
      height: 50, 
      width: 150,
      backgroundColor: '#C45C01',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      padding: 10,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white'
    },
    space: {
      width: 20,
      height: 20,
    },
  })

export default Login