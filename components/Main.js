import React, { Component } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from  'react-native-vector-icons/MaterialCommunityIcons' 


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import { event } from 'react-native-reanimated';

// import AddScreen from './components/main/Add'


const EmptyScreen = () =>{
    return(null)
}

const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() { 
        return(       
          <Tab.Navigator initialRouteName="Feed" labeled = {false} >
              <Tab.Screen name="Feed" component={FeedScreen} options={{
                  tabBarIcon: ({ colour, size }) => (
                      <MaterialCommunityIcons name = "home" colour ={colour}
                      size = {26} />
                  )
              }} />
          <Tab.Screen name="AddContainer" component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                        ),
                    }} />
                 <Tab.Screen name="Profile" component={ProfileScreen} options={{
                  tabBarIcon: ({ colour, size }) => (
                      <MaterialCommunityIcons name = "account-circle" colour ={colour}
                      size = {26} />
                  )
              }} />
          </Tab.Navigator>
        )
    }
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main)
