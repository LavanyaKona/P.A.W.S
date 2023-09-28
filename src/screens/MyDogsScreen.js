import React, { useState } from "react"
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import { COLORS, SIZES } from "../constants"
import { Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { getAllPets } from "../database"

const { width, height } = Dimensions.get("window")

const MyDogsScreen = ({ navigation, email, userId }) => {
  const [pets, setPets] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      getAllPets(userId, setPets)
    }, [userId])
  )

  console.log("pets", pets)

  const renderPet = ({ item }) => (
    // <View style={styles.imageContainer}>
    //   <Image source={{ uri: item.image_uri }} style={styles.image} />
    // </View>
    <View style={styles.imageContainer}>
      <TouchableOpacity>
        <Image source={{ uri: item.image_uri }} style={styles.image} />
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.small,
            marginTop: 10,
          }}
        >
          {item.breed}
        </Text>
        <Text style={{ color: COLORS.white, fontSize: SIZES.xxLarge }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  )

  const keyExtractor = (item) => item.id.toString()

  const IMAGES = [
    "../assets/images/pet1.jpeg",
    "../assets/images/pet2.jpeg",
    "../assets/images/pet3.jpeg",
    "../assets/images/pet4.jpeg",
  ]

  // const LIKE_ICON = require("./like.png")

  const handleLike = () => {
    // TODO: Handle like button press
  }

  return (
    <View style={styles.container}>
      {pets.length > 0 ? (
        <FlatList
          data={pets}
          renderItem={renderPet}
          keyExtractor={keyExtractor}
          numColumns={1}
        />
      ) : (
        <Text style={styles.noMemoriesText}>You have no pets yet.</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgBlack,
  },
  imageContainer: {
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#191919",
    position: "relative",
  },
  image: {
    padding: 20,
    marginTop: 10,
    width: width * 0.8,
    borderRadius: 10,
    height: height * 0.25,
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  likeIcon: {
    width: 20,
    height: 20,
  },
  noMemoriesText: {
    padding: 20,
    justifyContent: "center",
    color: COLORS.white,
  },
})

export default MyDogsScreen
