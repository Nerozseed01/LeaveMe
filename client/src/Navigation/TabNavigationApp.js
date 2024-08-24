import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import StackHome from "./StackNavigationHome";
import StackProfile from "./StackScreenProfile";
import ScreenResources from "../Screens/ScreensResources/Resources";
import StackBlog from "./StackScreenBlog";

const Tab = createBottomTabNavigator();

//Pila de pantallas que se muestran en la barra de navegacion de la aplicacion
export default function TabGroupHome() {
  return (
    <Tab.Navigator
      //Aqui estamos definiendo las configuraciones de nuestro TabBar
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "checkbox" : "checkbox-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Blog") {
            iconName = focused
              ? "chatbubble-ellipses-sharp"
              : "chatbubble-ellipses-outline";
          } else if (route.name === "Resources") {
            iconName = focused ? "book" : "book-outline";
          }
          // Aqui retorna los iconos que se muestran en los elementos de TabBar
          return <Ionicons name={iconName} size={40} color={color} />;
        },
        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "#4A4A4A",
        tabBarStyle: { backgroundColor: "#F2F2F2" },
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        screenOptions={{ headerShown: false }}
        component={StackHome}
      />

      <Tab.Screen
        name="Blog"
        screenOptions={{ headerShown: false }}
        component={StackBlog}
      />
      <Tab.Screen
        name="Resources"
        screenOptions={{ headerShown: false }}
        component={ScreenResources}
      />
      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={StackProfile}
      />
    </Tab.Navigator>
  );
}
