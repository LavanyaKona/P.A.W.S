import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Ionicons name='checkmark-circle' size={80} color='green' />
      <Text style={styles.text}>Added Successfully!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Memories")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 16,
  },
  button: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
})

export default SuccessScreen
