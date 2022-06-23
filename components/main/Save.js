import React, { useState } from 'react'
import { View, TextInput, Image, Button, StyleSheet, TouchableOpacity, Text } from 'react-native'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/storage")


export default function Save(props, {navigation}) {
    const [caption, setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        console.log(childPath)

        const response = await fetch(uri)
        const blob = await response.blob()

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob)

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot)
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted)
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
    }

    return (
        <View style={styles.container}>
            <Image source={{uri: props.route.params.image}}/>
            
            <TextInput
                style={styles.inputBox}
                placeholder="Write a Caption . . ."
                placeholderTextColor="#aaa"
                onChangeText={(caption) => setCaption(caption)}
            />

            <TouchableOpacity style={styles.postButton} onPress={() => uploadImage()}>
                <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    inputBox: {
        margin: 20,
        color: 'white'
    },
    postButton: {
        alignSelf: 'flex-end',
        margin: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
})