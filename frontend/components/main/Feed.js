import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity } from 'react-native'

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
                            <View style={styles.containerInteraction}>
                                { item.currentUserLike ? 
                                    (
                                        <Button
                                            title="Dislike"
                                            onPress={() => onDislikePress(item.user.uid, item.id)}
                                        />
                                    )
                                :
                                    (
                                        <TouchableOpacity activeOpacity={0.5} style={styles.buttons} onPress={() => onLikePress(item.user.uid, item.id)}>
                                            <Image 
                                            style = {styles.buttonImage}
                                            source={require('../../assets/white_heart.png')}
                                            />
                                        </TouchableOpacity>
                                    )
                                }

                                <TouchableOpacity 
                                    activeOpacity={0.5} 
                                    style={styles.buttons}  
                                    onPress={()=> props.navigation.navigate('Comment',{postId: item.id, uid: item.user.uid})}
                                >
                                     <Image 
                                        style = {styles.commentImage}
                                        source={require('../../assets/message.png')}
                                    />
                                </TouchableOpacity>
                            </View>
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
        flex: 1/3,
    },
    containerInteraction: {
        flexDirection: "row"
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    },
    buttonImage: {
        flex: 1, 
        width: 40, 
        height: 40
    },
    commentImage: {
        flex: 1, 
        width: 40, 
        height: 35
    },
    buttons: {
        flexDirection: 'row', 
        height: 30 , 
        width: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        padding: 10,
        margin: 5
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
})

export default connect(mapStateToProps, null)(Feed)
