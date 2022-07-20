import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'

import {connect} from 'react-redux'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
require('firebase/firestore')

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let posts = []
        if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {

            props.feed.sort(function(x, y) {
                return x.creation - y.creation;
            })

            setPosts(props.feed)
        }
        console.log(posts)

    }, [props.usersFollowingLoaded, props.feed])

const onLikePress = (userId, postId) => {
    firebase.firestore()
    .collection("posts")
    .doc(userId)
    .collection("userPosts")
    .doc(postId)
    .collection("likes")
    .doc(firebase.auth().currentUser.uid)
    .set({})
}

const onDislikePress = (userId, postId) => {
    firebase.firestore()
    .collection("posts")
    .doc(userId)
    .collection("userPosts")
    .doc(postId)
    .collection("likes")
    .doc(firebase.auth().currentUser.uid)
    .delete()
}


    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({item}) => (
                        <View style={styles.containerImage}>
                            <Text style={styles.usernameText}>
                                {item.user.name}
                            </Text>
                            <Image
                                style={styles.image}
                                source={{uri: item.downloadURL}}
                            />
                            { item.currentUserLike ? 
                                (
                                    <Button
                                        title="Dislike"
                                        onPress={() => onDislikePress(item.user.uid, item.id)}
                                    />
                                )
                            :
                                (
                                    <Button
                                        title="Like"
                                        onPress={() => onLikePress(item.user.uid, item.id)}
                                    />
                                )
                            }
                            <Text
                                onPress={()=> props.navigation.navigate('Comment',
                                {postId: item.id, uid: item.user.uid}
                                )}
                                style={{fontWeight: 'bold', color: 'white' }}
                            >View Comments...</Text>
                            <View style={styles.containerCaption}>
                                <Text style={styles.captionUsernameText}>
                                    {item.user.name}
                                </Text>
                                <Text>
                                    ""
                                </Text>
                                <Text style={styles.captionText}>
                                    {item.caption}
                                </Text>
                            </View>
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
    usernameText: {
        color: "white",
        margin: 20,
        fontWeight: "bold",
    },
    containerCaption: {
        flexDirection: "row",
        margin: 20
    },
    captionUsernameText: {
        color: "white",
        fontWeight: "bold",
    },
    captionText: {
        color: "white",
        flexDirection: "row"
    },
    containerGallery: {
        flex: 1,
        backgroundColor: "black"
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
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
})

export default connect(mapStateToProps, null)(Feed)
