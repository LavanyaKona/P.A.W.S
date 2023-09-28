import React, { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useNavigation } from "@react-navigation/native"
import * as SQLite from "expo-sqlite"
import CustomButton from "../components/CustomButton"
import { getAllPets } from "../database"
import { useFocusEffect } from "@react-navigation/native"
const db = SQLite.openDatabase("users.db")

export default function AddInfoScreen({ email, userId }) {
  const navigation = useNavigation()
  const [petId, setPetId] = useState(null)
  const [petList, setPetList] = useState([])
  const [infoType, setInfoType] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Get updated pet list from the database
      getAllPets(userId, (result) => {
        setPetList(result)
      })
    })

    return unsubscribe
  }, [navigation, userId])

  const handleSave = () => {
    if (!petId || !infoType || !description) {
      alert("Please fill all fields")
      return
    }

    // Insert the info into the database
    db.transaction((tx) => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        pet_id INTEGER,
        info_type TEXT,
        description TEXT
      )`)

      tx.executeSql(
        "INSERT INTO info (user_id, pet_id, info_type, description) VALUES (?, ?, ?, ?)",
        [userId, petId, infoType, description],
        (_, { insertId }) => {
          console.log("Info saved with ID: ", insertId)

          navigation.navigate("SuccessScreen")
        },
        (_, error) => {
          console.log("Error saving info: ", error)
          alert("Error saving info")
        }
      )
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name:</Text>
        <Picker
          selectedValue={petId}
          onValueChange={(value) => setPetId(value)}
          style={styles.dropdown}
        >
          <Picker.Item label='Select a pet...' value={null} />
          {petList.map((pet) => (
            <Picker.Item
              key={pet.id}
              label={pet.name}
              value={pet.id.toString()}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Info Type:</Text>
        <Picker
          selectedValue={infoType}
          onValueChange={(value) => setInfoType(value)}
          style={styles.dropdown}
        >
          <Picker.Item label='Select a type...' value='' />
          <Picker.Item label='Appointment' value='appointment' />
          <Picker.Item label='Event' value='event' />
          <Picker.Item label='Medical Record' value='medical' />
          <Picker.Item label='Training' value='training' />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.description}
          value={description}
          onChangeText={(text) => setDescription(text)}
          returnKeyType='done'
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </View>
      <View style={{ padding: 20 }} />
      <CustomButton label={"Save"} onPress={handleSave} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    marginVertical: 0,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    // marginBottom: 5,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    // marginBottom: 10,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 4,
    backgroundColor: "#FFFFFF",
  },
  dropdownButtonText: {
    fontSize: 14,
    color: "#000000",
  },
  description: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    width: "100%",
    height: 50, // this sets the height of the input field
  },
  dropdownMenu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownOption: {
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  dropdownOptionText: {
    fontSize: 12,
    color: "#000000",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
})
