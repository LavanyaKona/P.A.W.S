import { COLORS } from "../constants"
import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"
import * as SQLite from "expo-sqlite"
import { useNavigation } from "@react-navigation/native"

const db = SQLite.openDatabase("users.db")

const AppointmentsScreen = ({ route, userId }) => {
  const navigation = useNavigation()
  const [appointments, setAppointments] = useState([])
  console.log("user id from appointments", userId)

  useEffect(() => {
    const { info_type } = route ? route.params : {}
    console.log(info_type)

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT i.id, i.info_type, i.description, p.name as pet_name, p.breed, p.image_uri as pet_image 
        FROM info i 
        INNER JOIN pets p ON i.pet_id = p.id 
        INNER JOIN users u ON i.user_id = u.id 
        WHERE i.info_type = 'appointment' AND i.user_id = ?`,
        [userId],
        (_, { rows: { _array } }) => {
          setAppointments(_array)
        },
        (_, error) => {
          console.log("Error fetching appointments: ", error)
        }
      )
    })
  }, [])

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      {console.log("appo", appointments)}
      <View style={styles.card} key={item.id}>
        <Image
          source={{ uri: item.pet_image }}
          style={styles.image}
          resizeMode='cover'
        />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.pet_name}</Text>
          <Text style={styles.breed}>{item.breed}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButton}>Go Back</Text>
      </TouchableOpacity>
      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={{ color: COLORS.white, textAlign: "center" }}>
          Your pets have no upcoming appointments!
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#777",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 10,
  },
  cardContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000",
  },

  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
    color: COLORS.white,
  },
  breed: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.white,
  },
  description: {
    fontSize: 14,
    color: COLORS.white,
  },
  backButton: {
    fontSize: 16,
    color: "white",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
})

export default AppointmentsScreen

// const dogs = [
//   {
//     id: 1,
//     name: "Max",
//     breed: "Golden Retriever",
//     image: "../assets/images/pet1.jpeg",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel nibh dolor. Etiam tincidunt ac sem a elementum. Mauris eu mi vel lorem accumsan bibendum. Integer vitae lectus eu risus maximus blandit.",
//   },
//   {
//     id: 2,
//     name: "Buddy",
//     breed: "Labrador Retriever",
//     image: "../assets/images/pet2.jpeg",
//     description:
//       "Nullam congue eleifend leo, eu lobortis neque lobortis non. Praesent in libero in dolor bibendum euismod eu sit amet sapien. Nam nec massa justo. Sed aliquet hendrerit libero vitae porttitor.",
//   },
//   {
//     id: 3,
//     name: "Charlie",
//     breed: "Poodle",
//     image: "../assets/images/pet3.jpeg",
//     description:
//       "Sed et metus sagittis, rhoncus turpis vitae, imperdiet arcu. Nulla facilisi. Vivamus vestibulum quam ac velit dictum, ut malesuada lorem tempor. Nulla facilisi. Donec sed finibus arcu.",
//   },
// ]

// return (
//   <View style={styles.container}>
//     <TouchableOpacity
//       style={{ marginBottom: 20 }}
//       onPress={() => navigation.goBack()}
//     >
//       <Text style={styles.backButton}>Go Back</Text>
//     </TouchableOpacity>
//     {dogs.map((dog) => (
//       <View style={styles.card} key={dog.id}>
//         <Image
//           source={require("../assets/images/pet2.jpeg")}
//           style={styles.image}
//         />
//         <View style={styles.cardContent}>
//           <Text style={styles.name}>{dog.name}</Text>
//           <Text style={styles.breed}>{dog.breed}</Text>
//           <Text style={styles.description}>{dog.description}</Text>
//         </View>
//       </View>
//     ))}
//   </View>
// )
// }

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   padding: 20,
//   backgroundColor: "#000",
// },
// card: {
//   flexDirection: "row",
//   alignItems: "center",
//   marginBottom: 20,
//   backgroundColor: COLORS.card,
//   borderRadius: 10,
//   padding: 10,
// },
// image: {
//   width: 80,
//   height: 80,
//   borderRadius: 40,
//   marginRight: 20,
// },
// cardContent: {
//   flex: 1,
// },
// name: {
//   fontWeight: "bold",
//   fontSize: 18,
//   marginBottom: 5,
//   color: COLORS.white,
// },
// breed: {
//   fontSize: 16,
//   marginBottom: 5,
//   color: COLORS.white,
// },
// description: {
//   fontSize: 14,
//   color: COLORS.white,
// },
// backButton: {
//   fontSize: 16,
//   color: "white",
//   textDecorationLine: "underline",
//   marginBottom: 10,
// },
