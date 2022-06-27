import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
require('firebase/firestore')

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
        .collection('users')
        .where('name', '>=', search)
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            });
            setUsers(users);
        })
    }
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
        <View style={styles.space}/>
        <TouchableOpacity activeOpacity={0.5} style={styles.SearchButton}>
            <Image 
                source={require('../../assets/search.png')}
                style={styles.SearchPhoto}
            />
            <TextInput 
                placeholder="  Search"
                style={styles.SearchWord}
                onChangeText={(search) => fetchUsers(search)}
            />
        </TouchableOpacity>
        <FlatList
            numColumns={1}
            horizontal={false}
            data={users}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                    <Text style={styles.TextColour}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    SearchButton: {
      flexDirection: 'row', 
      height: 50, 
      alignSelf: 'stretch',
      backgroundColor: 'white',
      borderRadius: 50,
      padding: 10,
    },
    SearchPhoto: {
       width: 20, 
       height: 30, 
       alignItems: 'flex-left',
    },
    SearchWord: {
       color: 'black', 
       alignItems: 'flex-left',
    },
    TextColour: {
       color:'white',
       margin: 10,
    },
    space: {
        width: 20,
        height: 20,
    },
  })
