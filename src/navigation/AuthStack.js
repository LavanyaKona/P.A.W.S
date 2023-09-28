import React, { useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeTest from "../screens/HomeTest"
import LoginScreen from "../screens/LoginScreen.js"
import RegisterScreen from "../screens/RegisterScreen.js"
import AppointmentsScreen from "../screens/AppointmentsScreen"
import AddNewMemory from "../screens/AddNewMemory"
import SuccessScreen from "../screens/SuccessScreen"
import AddNewPet from "../screens/AddNewPet"

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeTest} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='AddNewMemory' component={AddNewMemory} />
      <Stack.Screen name='AddNewPet' component={AddNewPet} />
      <Stack.Screen name='SuccessScreen' component={SuccessScreen} />
      <Stack.Screen name='AppointmentsScreen' component={AppointmentsScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack
