import React, { useState } from "react"
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

import CustomButton from "../components/CustomButton"
import InputField from "../components/InputField"
import { COLORS, FONT, SIZES } from "../constants"

import { getUser } from "../database"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    getUser(email, (user) => {
      if (user && user.password === password) {
        const userId = user?.id
        navigation.navigate("Home", { email, userId })
      } else {
        alert("Invalid email or password")
      }
    })
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLORS.bgBlack,
      }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center", paddingVertical: 25 }}>
          <Image
            source={require("../assets/images/petshoplogo.png")}
            style={{ width: 100, height: 100 }}
          />

          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.xxLarge,
              fontWeight: 800,
              marginTop: 30,
            }}
          >
            Welcome to Dog Stop
          </Text>
        </View>

        <Text
          style={{
            fontSize: SIZES.small,
            fontWeight: "600",
            color: COLORS.white,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Simplify your pet ownership experience with our app. Keep track of all
          your pets in one place and spend more quality time with them.
        </Text>

        <Text
          style={{
            fontSize: SIZES.small,
            fontWeight: "600",
            color: COLORS.white,
            marginBottom: 30,
            textAlign: "center",
          }}
        >
          Login or Signup
        </Text>

        <InputField
          label={"Email address"}
          icon={
            <MaterialIcons
              name='alternate-email'
              size={20}
              color={COLORS.icon}
              style={{ marginRight: 5 }}
            />
          }
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name='ios-lock-closed-outline'
              size={20}
              color={COLORS.icon}
              style={{ marginRight: 5 }}
            />
          }
          value={password}
          onChangeText={setPassword}
          inputType='password'
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
        />

        <CustomButton label={"Login"} onPress={handleLogin} />

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or
        </Text>

        <CustomButton
          label={"Register"}
          onPress={() => navigation.push("Register")}
        />
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
