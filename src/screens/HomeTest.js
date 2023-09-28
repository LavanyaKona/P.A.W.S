import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"
import React, { useState, useEffect } from "react"
import CustomButton from "../components/CustomButton"
import { COLORS, SIZES } from "../constants"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import MemoriesScreen from "./MemoriesScreen"
import MyDogsScreen from "./MyDogsScreen"
import AddInfoScreen from "./AddInfoScreen"
import ExploreScreen from "./ExploreScreen"
import ProfileScreen from "./ProfileScreen"
import { Colors } from "react-native/Libraries/NewAppScreen"
import AppointmentsScreen from "./AppointmentsScreen"

const Tab = createBottomTabNavigator()

const HomeTest = ({ route }) => {
  const { email, userId } = route.params || "test"
  console.log(email)
  console.log("userId: ", userId)

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            switch (route.name) {
              case "Memories":
                iconName = focused ? "heart" : "heart-outline"
                break
              case "My Dogs":
                iconName = focused ? "paw" : "paw-outline"
                break
              case "Add Info":
                iconName = focused ? "add-circle" : "add-circle-outline"
                break
              case "Explore":
                iconName = focused ? "search" : "search-outline"
                break
              case "Profile":
                iconName = focused ? "person" : "person-outline"
                break
              default:
                iconName = "help-circle-outline"
                break
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          headerStyle: {
            backgroundColor: COLORS.bgBlack,
            borderBottomWidth: 0,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: COLORS.icon,
          tabBarStyle: {
            backgroundColor: COLORS.bgBlack,
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen
          name='Memories'
          children={() => <MemoriesScreen email={email} userId={userId} />}
          options={({ navigation }) => ({
            title: "Memories",
            headerStyle: {
              backgroundColor: COLORS.bgBlack,
            },
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontSize: SIZES.large,
            },
            // headerTintColor: "#EBF2FA",
            headerRight: () => (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.green,
                  padding: 5,
                  borderRadius: 5,
                  right: 15,
                }}
                onPress={() =>
                  navigation.push("AddNewMemory", { email, userId })
                }
              >
                <Text style={{ color: COLORS.white }}>New Memory</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen
          name='My Dogs'
          children={() => <MyDogsScreen email={email} userId={userId} />}
          options={({ navigation }) => ({
            title: "My Dogs",
            headerStyle: {
              backgroundColor: COLORS.bgBlack,
            },
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontSize: SIZES.large,
            },
            // headerTintColor: "#EBF2FA",
            headerRight: () => (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.green,
                  padding: 5,
                  borderRadius: 5,
                  right: 15,
                }}
                onPress={() => navigation.push("AddNewPet", { email, userId })}
              >
                <Text style={{ color: COLORS.white }}>New Pet</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen
          name='Add Info'
          children={() => <AddInfoScreen email={email} userId={userId} />}
        />
        <Tab.Screen
          name='Explore'
          children={() => <ExploreScreen email={email} userId={userId} />}
        />
        <Tab.Screen
          name='Profile'
          children={() => <ProfileScreen email={email} />}
        />
        {/* <Tab.Screen name='AppointmentsScreen' component={AppointmentsScreen} /> */}
      </Tab.Navigator>
    </View>
  )
}

export default HomeTest

const styles = StyleSheet.create({})
