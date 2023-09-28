import React, { useState } from "react"
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native"

import DatePicker from "react-native-date-picker"

import InputField from "../components/InputField"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

import { insertUser } from "../database"

import CustomButton from "../components/CustomButton"
import { COLORS, SIZES } from "../constants"

const RegisterScreen = ({ navigation }) => {
  // const [date, setDate] = useState(new Date())
  // const [open, setOpen] = useState(false)
  // const [dobLabel, setDobLabel] = useState("Date of Birth")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = () => {
    insertUser(email, password)
    navigation.navigate("Login")
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLORS.bgBlack,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        {/* <View style={{ alignItems: "center" }}>
          <RegistrationSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: "-5deg" }] }}
          />
        </View> */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name='chevron-back'
            size={30}
            color={COLORS.icon}
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: SIZES.xxLarge,
            textAlign: "center",
            fontWeight: "500",
            color: "#fff",
            marginTop: 20,
          }}
        >
          Create Account
        </Text>

        <Text
          style={{
            fontSize: SIZES.medium,
            textAlign: "center",
            fontWeight: "400",
            color: "#fff",
            marginBottom: 40,
            marginTop: 10,
          }}
        >
          Finish Signing up
        </Text>

        <InputField
          label={"Full Name"}
          icon={
            <Ionicons
              name='person-outline'
              size={20}
              color={COLORS.icon}
              style={{ marginRight: 5 }}
            />
          }
        />

        <InputField
          label={"Email ID"}
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
        />

        {/* <View
          style={{
            flexDirection: "row",
            borderBottomColor: COLORS.icon,
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        >
          <Ionicons
            name='calendar-outline'
            size={20}
            color={COLORS.icon}
            style={{ marginRight: 5 }}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{ color: COLORS.icon, marginLeft: 5, marginTop: 5 }}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* <DatePicker
          modal
          open={open}
          date={date}
          mode={"date"}
          maximumDate={new Date("2005-01-01")}
          minimumDate={new Date("1980-01-01")}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            setDobLabel(date.toDateString())
          }}
          onCancel={() => {
            setOpen(false)
          }}
        /> */}

        <Text
          style={{
            fontSize: SIZES.xSmall,
            fontWeight: "400",
            color: COLORS.white,
            marginBottom: 30,
            textDecorationLine: "underline",
          }}
        >
          By clicking on the Register button below, you agree to Dog Stop's
          Terms and Conditions, Privacy Policy, and Non Discrimination Policy.
        </Text>

        <CustomButton label={"Register"} onPress={handleRegister} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterScreen
