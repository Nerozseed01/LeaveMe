import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/authContext";
import Toast from "react-native-toast-message";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const API_Url = process.env.API_URL;

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    // Verificar si el campo de correo electrónico está vacío
    if (!validator.isEmail(correo)) {
      Toast.show({
        type: "error",
        text1: "Correo electrónico no valido.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    }

    // Verificar si el campo de contraseña está vacío
    if (validator.isEmpty(password)) {
      Toast.show({
        type: "error",
        text1: "Ingresa una contraseña, por favor.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    }

    // Lógica de inicio de sesión si pasa todas las validaciones
    try {
      // Aquí puedes hacer la llamada a la API o la lógica de autenticación
      const response = await axios.post(`${API_Url}/api/auth/login`, {
        email: correo,
        password: password,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      const status = response.status;

      if (data.token && status === 200) {
        login(data.token, data.user, data.success,"login");
      }
    } catch (error) {
      const errorMessage =
        error.response.data.msg || "Ocurrió un error inesperado";
      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 bg-purple-400">
          <SafeAreaView className="flex ">
            <View className="flex-row  justify-start">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-orange-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
              >
                <ArrowLeftIcon size="20" color="black" />
              </TouchableOpacity>
            </View>

            <View className="justify-center items-center">
              <Image
                source={require("../../Assets/Icons/megafonoN.png")}
                style={{ width: 150, height: 150, marginLeft: 40 }}
              />
            </View>

            <View className=" flex-row justify-center ">
              <Text className="text-black font-bold text-6xl ">Leve</Text>
              <Text className=" font-bold text-orange-500 text-6xl ">Me</Text>
            </View>
          </SafeAreaView>

          <View
            className="flex-1 bg-white px-8 pt-8 "
            style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
          >
            <View className="form space-y-2">
              <Text className="ml-4 text-gray-700">Email</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                onChangeText={setCorreo}
                value={correo}
                placeholder="Ingresa tu Email"
              ></TextInput>

              <Text className="ml-4 text-gray-700">Password</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                placeholder="Ingresa tu contraseña"
              ></TextInput>

              <TouchableOpacity className="flex items-end  mb-5">
                <Text className="text-orange-400 mt-1 font-semibold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-orange-500 rounded-3xl py-4 active:bg-blue-700 "
                onPress={() => handleLogin()}
              >
                <Text className="text-center text-gray-800 font-bold font-xl">
                  Log in
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-7">
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text className="text-orange-400 ml-1  font-semibold">
                  Sing Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <StatusBar />
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
