import React from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { COLORS, SIZES } from "../constants"

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: COLORS.icon,
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 35,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          color={COLORS.white}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            color: COLORS.white,
            fontSize: SIZES.medium,
          }}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 0,
            color: COLORS.white,
            fontSize: SIZES.medium,
          }}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={false}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
