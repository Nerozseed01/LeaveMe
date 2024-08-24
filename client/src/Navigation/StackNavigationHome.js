import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import HomeScreen from '../Screens/ScreensHome/Home'
import CheckListEdit from '../Screens/ScreensHome/CheckListEdit'
import AddActivities from "../Screens/ScreensHome/AddActivities";
import Progress from "../Screens/ScreensHome/Progress";

const Stack = createNativeStackNavigator();


//Pila de pantallas que se muestran en el tabCheckList o Home
export default function StackGroupWelcome() {
    return (
      //Contenedor
      <Stack.Navigator initialRouteName="HomeMain" screenOptions={{
          headerShown: false,
      }}>
        <Stack.Screen  name="HomeMain"  component={HomeScreen} />
        <Stack.Screen  name="CheckListEdit" component={CheckListEdit} />
        <Stack.Screen name="AddActivities"  component={AddActivities}/>
        <Stack.Screen name="Progress" component={Progress} />
      </Stack.Navigator>
    );
  }