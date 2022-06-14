import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import {connect} from 'react-redux'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
require('firebase/firestore')

function Filtered(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let posts = []
        if (props.usersLoaded == props.following.length) {
            for (let i = 0; i < props.following.length; i++) {
                const user = props.users.find(el => el.uid === props.following[i])
                if (user != undefined) {
                    posts = [...posts, ...user.posts]
                }
            }

            posts.sort(function(x, y) {
                return x.creation - y.creation
            })

            setPosts(posts)
        }

    }, [props.usersLoaded])

    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    renderItem={({item}) => (
                        <View style={styles.containerImage}>
                            <Image
                                style={styles.image}
                                source={{uri: item.downloadURL}}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 50
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1/3
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersLoaded: store.usersState.usersLoaded,
})

export default connect(mapStateToProps, null)(Filtered)
