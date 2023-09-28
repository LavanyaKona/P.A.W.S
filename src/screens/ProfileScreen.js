import React from "react"
import { View, Text } from "react-native"
import CustomButton from "../components/CustomButton"
import { COLORS, SIZES } from "../constants"
import { useNavigation } from "@react-navigation/native"

const ProfileScreen = ({ email }) => {
  const navigation = useNavigation()
  console.log(email, "from profile")
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
      <Text style={{ marginBottom: 10, textAlign: "left", color: COLORS.icon }}>
        Account Info
      </Text>
      <Text
        style={{
          marginBottom: 30,
          color: COLORS.white,
          fontSize: SIZES.large,
        }}
      >
        {email ? email : ""}
      </Text>

      <CustomButton
        label={"Logout"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  )
}

export default ProfileScreen
