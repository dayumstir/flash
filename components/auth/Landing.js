import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
        
        <Image 
            source={require('../../assets/flash_icon_words.png')}
            style={{ flex: 0.5, width: 400, height: 400 }}
        />

        {/* Register Button */}
        <TouchableOpacity activeOpacity={0.5} style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.space}/>

        {/* Login Button */}
        <TouchableOpacity activeOpacity={0.5} style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: "black" 
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