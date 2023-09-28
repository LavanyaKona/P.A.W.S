import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Button,
} from "react-native"
import * as ImagePicker from "expo-image-picker"

import * as SQLite from "expo-sqlite"
import CustomButton from "../components/CustomButton"
import { SIZES, COLORS } from "../constants"

const db = SQLite.openDatabase("users.db")

const AddNewPet = ({ navigation, route }) => {
  const [breed, setBreed] = useState("")
  const [name, setName] = useState("")
  const [imageUri, setImageUri] = useState(null)

  const { userId } = route.params || "test"
  console.log("userId from add pets", userId)
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!")
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    console.log("imageresult: ", result)

    if (!result.canceled) {
      setImageUri(result.assets[0].uri)
    }
  }

  const handleSave = () => {
    if (!breed || !name || !imageUri) {
      alert("Please fill all fields")
      return
    }
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS pets (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, breed TEXT, name TEXT, image_uri TEXT);"
      )
      tx.executeSql(
        "INSERT INTO pets (user_id, breed, name, image_uri) VALUES (?, ?, ?, ?);",
        [userId, breed, name, imageUri],
        (_, { insertId }) => {
          console.log("Pet saved with ID: ", insertId)
          navigation.navigate("SuccessScreen")
        },
        (_, error) => {
          console.log("Error saving pet: ", error)
          alert("Error saving pet")
        }
      )
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ top: 80, left: 20, position: "absolute" }}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButton}>Go Back</Text>
      </TouchableOpacity>
      <Text
        style={{
          marginBottom: 10,
          fontSize: SIZES.large,
          textAlign: "left",
          color: COLORS.white,
        }}
      >
        Add New Pet
      </Text>
      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        value={breed}
        onChangeText={setBreed}
        placeholder='Enter breed'
      />
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder='Enter name'
      />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode='cover'
        />
      )}
      <Button
        title='Choose Pet Image'
        style={{ marginBottom: 50 }}
        onPress={pickImage}
      />
      <View style={{ padding: 20 }} />
      <CustomButton label={"Save"} onPress={handleSave} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  backButton: {
    fontSize: 16,
    // flex: 1,
    // justifyContent: "flex-start",
    // marginTop: 50,
    color: "white",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    color: COLORS.white,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 0,
    marginBottom: 10,
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default AddNewPet
