import React, { useCallback, useEffect } from "react"
import { registerRootComponent } from "expo"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useFonts } from "expo-font"
import * as SQLite from "expo-sqlite"
// import * as SplashScreen from "expo-splash-screen"

import AuthStack from "./src/navigation/AuthStack"
import AppStack from "./src/navigation/AppStack"

import { initDB } from "./src/database"
// SplashScreen.preventAutoHideAsync()

const App = () => {
  // const db = SQLite.openDatabase("mydatabase.db")

  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("./src/assets/fonts/Inter-Bold.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./src/assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("./src/assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("./src/assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
  })

  useEffect(() => {
    initDB()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer>
      {/* <AppStack /> */}
      <AuthStack />
    </NavigationContainer>
  )
}

registerRootComponent(App)

export default App
