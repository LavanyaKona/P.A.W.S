import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { COLORS } from "../constants"
import AppointmentsScreen from "./AppointmentsScreen"
import { useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import EventsScreen from "./EventsScreen"
import TrainingScreen from "./TrainingScreen"
import MedicalScreen from "./MedicalScreen"

const ExploreStack = createNativeStackNavigator()

const ExploreScreen = ({ email, userId }) => {
  const navigation = useNavigation()

  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ExploreStack.Screen
        name='ExploreScreen'
        children={() => <Explore email={email} userId={userId} />}
      />
      <ExploreStack.Screen
        name='AppointmentsScreen'
        children={() => <AppointmentsScreen email={email} userId={userId} />}
      />
      <ExploreStack.Screen
        name='EventsScreen'
        children={() => <EventsScreen email={email} userId={userId} />}
      />
      <ExploreStack.Screen
        name='TrainingScreen'
        children={() => <TrainingScreen email={email} userId={userId} />}
      />
      <ExploreStack.Screen
        name='MedicalScreen'
        children={() => <MedicalScreen email={email} userId={userId} />}
      />
    </ExploreStack.Navigator>
  )
}

const Explore = ({ userId }) => {
  const navigation = useNavigation()

  console.log("user id from explore small", userId)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("AppointmentsScreen", {
            info_type: "appointment",
          })
        }
      >
        <Text style={styles.buttonText}>Appointments</Text>
        <Ionicons name='chevron-forward-outline' size={24} color='#fff' />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EventsScreen")}
      >
        <Text style={styles.buttonText}>Events</Text>
        <Ionicons name='chevron-forward-outline' size={24} color='#fff' />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TrainingScreen")}
      >
        <Text style={styles.buttonText}>Training</Text>
        <Ionicons name='chevron-forward-outline' size={24} color='#fff' />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MedicalScreen")}
      >
        <Text style={styles.buttonText}>Medical Records</Text>
        <Ionicons name='chevron-forward-outline' size={24} color='#fff' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#000",
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
})

export default ExploreScreen
