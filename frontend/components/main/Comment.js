import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Button, TextInput, StyleSheet} from 'react-native'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
require('firebase/firestore')

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUsersData} from '../../redux/actions/index'

function Comment(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {

        function matchUserToComment(comments){
            for(let i = 0; i < comments.length; i++)  {
                if(comments[i].hasOwnProperty('user')) {
                    continue;
                }

                const user = props.users.find(x => x.uid === comments[i].creator)
                if(user == undefined) {
                    props.fetchUsersData(comments[i].creator, false)
                } else {
                    comments[i].user = user
                }
            }
            setComments(comments)
        }
        if(props.route.params.postId !== postId){
            firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .get()
            .then((snapshot) => {
                let comments = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return {id, ...data}
                })
                matchUserToComment(comments)
            })
            setPostId(props.route.params.postId)
        } else {
            matchUserToComment(comments)
        }
    }, [props.route.params.postId, props.users])

const onCommentSend = () => {
    firebase.firestore()
    .collection('posts')
    .doc(props.route.params.uid)
    .collection('userPosts')
    .doc(props.route.params.postId)
    .collection('comments')
    .add({
        creator: firebase.auth().currentUser.uid,
        text
    })
}
    return (
        <View style={styles.container}>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({item}) => (
                    <View style = {styles.containerDirection}>
                        {item.user !== undefined ? 
                            <Text
                            style={styles.text}
                            >
                                {item.user.name}:
                            </Text>

                        : null}
                        <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                )}
            />

            <View>
                <TextInput
                placeholder='Add comment'
                onChangeText={(text) => setText(text)}
                style={styles.tempText}
                />
                <Button
                    onPress={() => onCommentSend()}
                    title="Send"
                />
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    tempText: {
        color: 'red'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        margin: 5
    },
    commentText: {
        color: 'white',
        fontSize: 12,
        margin: 7
    },
    containerDirection: {
        flexDirection: "row"
    },
})

const mapStateToProps = (store) => ({
    users: store.usersState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUsersData}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Comment)