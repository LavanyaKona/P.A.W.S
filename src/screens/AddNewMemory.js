import React, { useState } from "react"
import {
  View,
  Button,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { COLORS, SIZES } from "../constants"
import CustomButton from "../components/CustomButton"
import * as ImagePicker from "expo-image-picker"
import * as SQLite from "expo-sqlite"

const AddNewMemory = ({ navigation, route }) => {
  const db = SQLite.openDatabase("users.db")
  const [imageUri, setImageUri] = useState(null)

  const { userId } = route.params || "test"

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
    db.transaction((tx) => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS memories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        image_uri TEXT
      )`)
      tx.executeSql(
        "INSERT INTO memories (user_id, image_uri) VALUES (?, ?)",
        [userId, imageUri],
        (_, { insertId }) => {
          console.log("image uri from execute", imageUri)
          console.log("Image saved with ID: ", insertId)
          navigation.navigate("SuccessScreen")
        },
        (_, error) => {
          console.log("Error saving image: ", error)
          alert("Error saving image")
        }
      )
    })
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#000",
        padding: 20,
      }}
    >
      <TouchableOpacity
        style={{ top: 80, left: 20, position: "absolute" }}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButton}>Go Back</Text>
      </TouchableOpacity>
      <Text style={{ marginBottom: 10, textAlign: "left", color: COLORS.icon }}>
        Choose Memory from your Gallery
      </Text>
      <View style={{ padding: 20 }} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 200,
            height: 200,
            marginBottom: 50,
            alignSelf: "center",
          }}
        />
      )}
      <Button
        title='Choose Memory Picture'
        style={{ marginBottom: 50 }}
        onPress={pickImage}
      />
      <View style={{ padding: 20 }} />
      <CustomButton label='Save' onPress={handleSave} />
    </View>
  )
}

const styles = StyleSheet.create({
  backButton: {
    fontSize: 16,
    // flex: 1,
    // justifyContent: "flex-start",
    // marginTop: 50,
    color: "white",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
})

export default AddNewMemory
