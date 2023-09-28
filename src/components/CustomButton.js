import { Text, TouchableOpacity } from "react-native"
import React from "react"

export default function CustomButton({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#4caf50",
        padding: 15,
        borderRadius: 25,
        marginBottom: 15,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 16,
          color: "#fff",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
