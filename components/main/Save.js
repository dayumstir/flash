import React, { useState } from 'react'
import { View, TextInput, Image, Button, Text } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/storage")

const gyms = [
    {id: 1, item: 'Ark Bloc'},
    {id: 2, item: 'b8A'},
    {id: 3, item: 'BFF Climb (Bukit Timah)'},
    {id: 4, item: 'BFF Climb (Bendemeer)'},
    {id: 5, item: 'Boruda'},
    {id: 6, item: 'Boulder Movement (Bugis+)'},
    {id: 7, item: 'Boulder Movement (OUE Downtown)'},
    {id: 8, item: 'Boulder Movement (Suntec City Mall)'},
    {id: 9, item: 'Boulder Movement (Tai Seng+)'},
    {id: 10, item: 'Boulder Movement (Tekka Place)'},
    {id: 11, item: 'Boulder+ (Aperia Mall)'},
    {id: 12, item: 'Boulder+ (The Chevrons)'},
    {id: 13, item: 'Boulder Planet'},
    {id: 14, item: 'Boulder Planet (Rochor)'},
    {id: 15, item: 'Boulder World'},
    {id: 16, item: 'Boulder World (Paragon)'},
    {id: 17, item: 'Boys Town Adventure Centre'},
    {id: 18, item: 'Climb Central (Katong)'},
    {id: 19, item: 'Climb Central (Novena)'},
    {id: 20, item: 'Climb Central (Sports Hub)'},
    {id: 21, item: 'Climb Central (Funan)'},
    {id: 22, item: 'Clip n Climb'},
    {id: 23, item: 'Fit Bloc (Depot Heights)'},
    {id: 24, item: 'Fit Bloc (Kent Ridge)'},
    {id: 25, item: 'Ground Up Climbing'},
    {id: 26, item: 'Kinetics'},
    {id: 27, item: 'Lighthouse Climbing'},
    {id: 28, item: 'Origin Boulder'},
    {id: 29, item: 'OYEYO Bouldering Home'},
    {id: 30, item: 'Passion Wave (Pasir Ris)'},
    {id: 31, item: 'SAFRA Adventure Sports Centre'},
    {id: 32, item: 'T-Hall.sg'},
    {id: 33, item: 'The Cliff @ Snow City'},
    {id: 34, item: 'The Rock School (Our Tampines Hub)'},
    {id: 35, item: 'UpWall Climbing'},
    {id: 36, item: 'Z-Vertigo Boulder Gym'},
]

const difficulty = [
    {id:1, item: 'Level 1'},
    {id:2, item: 'Level 2'},
    {id:3, item: 'Level 3'},
    {id:4, item: 'Level 4'},
    {id:5, item: 'Level 5'},
    {id:6, item: 'Level 6'},
    {id:7, item: 'Level 7'},
    {id:8, item: 'Level 8'},
    {id:9, item: 'Level 9'},
    {id:10, item: 'Level 10'},
]

export default function Save(props, {navigation}) {
    const [caption, setCaption] = useState("")
    const [selectedGym, setSelectedGym] = useState({})
    const [selectedDifficulty, setSelectedDifficulty] = useState([])

    const uploadImage = async () => {
        const uri = props.route.params.image
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        // console.log(childPath)

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
                // console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted)
    }

    function onGymChange() {
        return (val) => setSelectedGym(val)
    }
    function onDifficultyChange() {
        return (val) => setSelectedDifficulty(val)
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp(),
                gym: selectedGym.item,
                difficulty: selectedDifficulty.item
            }).then((function () {
                props.navigation.popToTop()
            }))
    }    

    return (
        <View style={{ flex: 1, margin: 30}}>
            <Image source={{uri: props.route.params.image}}/>
            <TextInput
                placeholder="Write a caption . . ."
                onChangeText={(caption) => setCaption(caption)}
            />

            <View style={{ height: 40 }} />

            <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Gym</Text>
            <SelectBox
                label='Select One'
                options={gyms}
                value={selectedGym}
                onChange={onGymChange()}
                hideInputFilter={false}
            />

            <View style={{ height: 40 }} />

            <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Difficulty</Text>
            <SelectBox
                label='Select One'
                options={difficulty}
                value={selectedDifficulty}
                onChange={onDifficultyChange()}
                hideInputFilter={false}
            />

            <View style={{ height: 40 }} />

            <Button title="Save" onPress={() => uploadImage()}/>
        </View>
    )
}
