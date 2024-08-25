import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import validator from "validator";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

//screen para hacer el registro de un nuevo cliente
export default function SignUp() {
  const navigation = useNavigation();
  const [correo, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [nombre, setNombre] = useState("");

  //Funcion para el registro de un nuevo usuario
  const validaciones = () => {
    // Verificar si el campo de correo electrónico está vacío
    if (nombre.trim().length === 0) {
      Toast.show({
        type: "error",
        text2: "Por favor ingresa un nombre.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    }

    if (edad.trim().length === 0 || edad < "18") {
      Toast.show({
        type: "error",
        text2: "Por favor ingresa una edad mayor a 18 años.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    }
    if (!validator.isEmail(correo)) {
      Toast.show({
        type: "error",
        text2: "Por favor ingresa un correo electrónico válido.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    }
    // Verificar si el campo de contraseña está vacío
    if (validator.isEmpty(password)) {
      Toast.show({
        type: "error",
        text2: "Por favor ingresa una contraseña.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    } else if (password.length < 6) {
      Toast.show({
        type: "error",
        text2: "Por favor ingresa una contraseña de al menos 6 caracteres.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    }
    handleRegister();
  };

  const handleRegister = async () => { 
   try {
      const Usuario = {
        nombre,
        edad,
        correo,
        password,
      }
      navigation.navigate("Questions",{Usuario});
   } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Hubo un error al registrarte, intente nuevamente.",
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

            <View className=" flex-row justify-center p-10">
              <Text className="text-black font-bold text-6xl ">Leve</Text>
              <Text className=" font-bold text-orange-500 text-6xl ">Me</Text>
              <Image
                source={require("../../Assets/Icons/megafonoN.png")}
                style={{ width: 30, height: 30}}
              />
            </View>
          </SafeAreaView>

          <View
            className="flex-1 bg-white px-8 pt-8"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <View className="form space-y-2 ">
              <Text className="text-gray-700 ml-4">Nombre Completo:</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Ingresa tu nombre completo"
                value={nombre}
                onChangeText={text => setNombre(text)}
                blurOnSubmit
              />
              <Text className="text-gray-700 ml-4">Edad:</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Ingresa tu edad"
                value={edad}
                onChangeText={text => setEdad(text)}
                keyboardType="number-pad"
                blurOnSubmit
              />
              <Text className="text-gray-700 ml-4">Correo:</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="ingresa tu correo"
                value={correo}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
                blurOnSubmit
              />
              <Text className="text-gray-700 ml-4">Contraseña:</Text>

              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2 "
                secureTextEntry
                placeholder="Mayor a 6 caracteres"
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity
                className="py-3 bg-orange-500 rounded-xl"
                onPress={() => validaciones()}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-7">
              <Text className="text-gray-500 font-semibold">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="font-semibold text-orange-500"> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
