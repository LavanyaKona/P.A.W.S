import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import { COLORS } from "../constants"
import { Ionicons } from "@expo/vector-icons"
import * as SQLite from "expo-sqlite"
import { getAllMemories } from "../database"
import { useNavigation } from "@react-navigation/native"
import { useFocusEffect } from "@react-navigation/native"

const { width, height } = Dimensions.get("window")

const MemoriesScreen = ({ navigation, userId }) => {
  const [memories, setMemories] = useState([])
  // const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      getAllMemories(userId, setMemories)
    }, [userId])
  )

  console.log("memories", memories)

  const renderMemory = ({ item }) => (
    <View style={styles.memoryContainer}>
      <Image source={{ uri: item.image_uri }} style={styles.memoryImage} />
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
      {memories.length > 0 ? (
        <FlatList
          data={memories}
          renderItem={renderMemory}
          keyExtractor={keyExtractor}
          numColumns={1}
        />
      ) : (
        <Text style={styles.noMemoriesText}>You have no memories yet.</Text>
      )}
    </View>
    // <View style={styles.container}>
    //   <ScrollView showsVerticalScrollIndicator={false}>
    //     {/* <View style={{ alignItems: "center", marginTop: 15 }}>
    //       <Image
    //         source={require("../assets/images/pet1.jpeg")}
    //         style={styles.image}
    //       />
    //       <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
    //         <Ionicons name='heart-outline' size={30} color='red' />
    //       </TouchableOpacity>
    //     </View> */}

    //     {IMAGES.map((image, index) => (
    //       <View key={index} style={styles.imageContainer}>
    //         <Image source={require(image)} style={styles.image} />
    //         <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
    //           <Text>Like</Text>
    //         </TouchableOpacity>
    //       </View>
    //     ))}
    //   </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  memoryContainer: {
    width: width * 0.9,
    height: 200,
    margin: 10,
  },
  memoryImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  likeIcon: {
    width: 20,
    height: 20,
  },
  noMemoriesText: {
    justifyContent: "center",
    color: COLORS.white,
  },
})
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: COLORS.bgBlack,
//   },
//   imageContainer: {
//     // height: "30%",
//     backgroundColor: "#ccc",
//     position: "relative",
//   },
//   image: {
//     width: width * 0.95,
//     borderRadius: 10,
//     height: height * 0.25,
//   },
//   likeButton: {
//     position: "absolute",
//     top: 10,
//     right: 15,
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   memoryItem: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 50,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: "#777",
//   },
// })

export default MemoriesScreen
