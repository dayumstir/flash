import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'

import { View, Text } from 'react-native'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyD1931tf1ScWVbtKcnJOQ5LoIPELsEXZSw",
  authDomain: "flash-17489.firebaseapp.com",
  projectId: "flash-17489",
  storageBucket: "flash-17489.appspot.com",
  messagingSenderId: "88353597899",
  appId: "1:88353597899:web:d621d28a4fd9833acb6e4e",
  measurementId: "G-K4YCFG0LM4"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import FilterScreen from './components/main/Filter'


const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/flash_icon_words.png')}
    />
  );
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return ( 
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">

            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/> 

          </Stack.Navigator>
        </NavigationContainer>
      );     
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">

            <Stack.Screen name="Flash" component={MainScreen} options={{
                //headerTitle: (props) => <LogoTitle {...props} />,
                title: 'FLASH',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Filter" component={FilterScreen} navigation={this.props.navigation}/>

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
