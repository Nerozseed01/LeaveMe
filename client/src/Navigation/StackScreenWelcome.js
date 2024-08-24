import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {React, useContext, useEffect} from 'react'
import WelcomeScreen from "../Screens/ScreensWelcome/Welcome";
import LoginScreen from "../Screens/ScreensWelcome/Login";
import SignupScreen from "../Screens/ScreensWelcome/SignUp"
import { AuthContext } from "../context/authContext";
import InterestsScreen from "../Screens/ScreensWelcome/SelectInteres";
import Questions from './../Screens/ScreensWelcome/Questions';

const Stack = createNativeStackNavigator();


//Stack que se muestra cuando un usuario no esta registrado o no ha iniciado sesion
//Las pantallas que se veran al inicio y la forma de como se muestran
export default function StackGroupWelcome() {

    return (
      //Contenedor
      <Stack.Navigator initialRouteName="Welcome">
        {/*Pestañas que se muestran y su jeraquia*/}  
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Signup"
          options={{ headerShown: false }}
          component={SignupScreen}
        />
        <Stack.Screen
        name="Interests"
        options={{ headerShown: false }}
        component={InterestsScreen}
        />
         <Stack.Screen
        name="Questions"
        options={{ headerShown: false }}
        component={Questions}
        />

      </Stack.Navigator>
    );
  }