import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData} from '../redux/actions/index'

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import SearchScreen from './main/Search'
import FilterScreen from './main/Filter'



const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () =>  {
    return (null)
}

export class Main extends Component {
    componentDidMount() {
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }
    render() {
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false} barStyle={{ backgroundColor: 'black' }}>
                <Tab.Screen name="Feed" component={FeedScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="ios-home-outline" color={color} size={26}/>
                        ),
                    }}/>
                <Tab.Screen name="SearchScreen" component={SearchScreen} navigation={this.props.navigation}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="ios-search-outline" color={color} size={26} testID="searchButtonFeed"/>
                        ),
                    }}/>
                <Tab.Screen name="AddContainer" component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault()
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="ios-add-circle-outline" color={color} size={26} testID="addButtonFeed"/>
                        ),
                }}/>
                <Tab.Screen name="FilterScreen" component={FilterScreen} navigation={this.props.navigation}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="filter" color={color} size={26} testID="filterButtonFeed"/>
                        ),
                    }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault()
                            navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                    }
                })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="ios-person-outline" color={color} size={26} testID="profileButtonFeed"/>
                        ),
                }}/>
            </Tab.Navigator>
        )
  }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing, clearData}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)