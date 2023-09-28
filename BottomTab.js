import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "./screens/HomeScreen"
import MyDogs from "./screens/MyDogs"
import Explore from "./screens/Explore"
import Profile from "./screens/Profile"
import AddInfoScreen from "./src/screens/AddInfoScreen"
import AppointmentsScreen from "./src/screens/AppointmentsScreen"
// import { TabBar } from "./components/navigation/TabBar"

const Tab = createBottomTabNavigator()

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='My Dogs' component={MyDogs} />
      <Tab.Screen name='Add Info' component={AddInfoScreen} />
      <Tab.Screen name='Explore' component={Explore} />
      <Tab.Screen name='Profile' component={Profile} />
      {/* <Tab.Screen name='AppointmentsScreen' component={AppointmentsScreen} /> */}
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({})
