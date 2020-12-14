import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native'


import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'


import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Screen
import AddScreen from './components/main/Add'

const store = createStore(rootReducer, applyMiddleware(thunk))

import * as firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = process.env.apiKey;

// import firebaseConfig from './'
// for production use ennvirment variables
const firebaseConfig = {
  apiKey: "AIzaSyD15ryfnhRk-XmGy97ST8QeSDsHQLSZN1E",
  authDomain: "instagram-dev-b3430.firebaseapp.com",
  databaseURL: "https://instagram-dev-b3430.firebaseio.com",
  projectId: "instagram-dev-b3430",
  storageBucket: "instagram-dev-b3430.appspot.com",
  messagingSenderId: "830735457757",
  appId: "1:830735457757:web:17aa2c73368adf7ab8aa34",
  measurementId: "G-ZY1HKC7QX9"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
const Stack = createStackNavigator();


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
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
         <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={ MainScreen } options={{ headerShown: false }} />
            <Stack.Screen name="Add" component={AddScreen} />

          </Stack.Navigator>
        </NavigationContainer>

      </Provider>
    )
  }
}

export default App






