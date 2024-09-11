import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import axios from "axios";
import validator from "validator";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const API_Url = process.env.EXPO_PUBLIC_API_URL;

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const requestCode = async () => {
    if (!validator.isEmail(email)) {
      Toast.show({
        type: "success",
        text1: "Ingresa un correo electrónico valido",
        visibilityTime: 4000,
      });
    }
    try {
      const response = await axios.post(
        `${API_Url}/api/auth/recuperar-contrasena`,
        {
          email,
        }
      );
      const data = response.data;
      if (response.status === 200) {
        Toast.show({
          type: "success",
          text2: data.msg,
          visibilityTime: 4000,
        });
        setStep(2);
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
      throw error;
    }
  };

  const verifyCodeAndResetPassword = async () => {
    if (!code) {
      Toast.show({
        type: "error",
        text1: "Ingresa el código de verificación",
        visibilityTime: 4000,
      }); 
      return;
    }

    if (!newPassword) {
      Toast.show({
        type: "error",
        text1: "Ingresa una contraseña nueva",
        visibilityTime: 4000,
      });
      return;
    }
    if(newPassword.length < 6){
      Toast.show({
        type: "error",
        text1: "La contraseña debe tener al menos 6 caracteres",
        visibilityTime: 4000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${API_Url}/api/auth/cambiar-contrasena`,
        {
          token: code,
          newPassword,
        }
      );

      const data = response.data;
      const status = response.status;
      if (status === 200) {
        Toast.show({
          type: "success",
          text2: data.msg,
          visibilityTime: 4000,
        });
        navigation.navigate("Login");
      }
    } catch (error) {
      const errorMessage =
        error.response.data.msg || "Ocurrió un error inesperado";
      Toast.show({
        type: "error",
        text2: errorMessage,
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
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
                    <Text className=" font-bold text-orange-500 text-6xl ">
                      Me
                    </Text>
                  </View>
                </SafeAreaView>

                <View
                  className="flex-1 bg-white px-8 pt-8  "
                  style={{
                    borderTopLeftRadius: 60,
                    borderTopRightRadius: 60,
                    height: 500,
                  }}
                >
                  <View className=" justify-center h-96">
                    <View className="form space-y-2">
                      <Text className="text-gray-700">Email</Text>
                      <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Ingresa tu Email"
                      ></TextInput>
                      <TouchableOpacity
                        className="bg-orange-500 rounded-3xl py-4 active:bg-blue-700 "
                        onPress={() => requestCode()}
                      >
                        <Text className="text-center text-gray-800 font-bold font-xl">
                          Enviar Correo
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <StatusBar />
              </View>
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </>
      )}
      {step === 2 && (
        <>
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
                    <Text className=" font-bold text-orange-500 text-6xl ">
                      Me
                    </Text>
                  </View>
                </SafeAreaView>

                <View
                  className="flex-1 bg-white px-8 pt-8  "
                  style={{
                    borderTopLeftRadius: 60,
                    borderTopRightRadius: 60,
                    height: 500,
                  }}
                >
                  <View className="form space-y-2">
                    <Text className="text-gray-700">Codigo</Text>
                    <TextInput
                      className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                      onChangeText={setCode}
                      value={code}
                      placeholder="Ingresa el codigo"
                    ></TextInput>
                    <Text className="text-gray-700">Nueva Contraseña</Text>
                    <TextInput
                      className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                      onChangeText={setNewPassword}
                      value={newPassword}
                      placeholder="Ingresa tu nueva contraseña"
                    ></TextInput>
                    <TouchableOpacity
                      className="bg-orange-500 rounded-3xl py-4 active:bg-blue-700 "
                      onPress={() => verifyCodeAndResetPassword()}
                    >
                      <Text className="text-center text-gray-800 font-bold font-xl">
                        Cambiar contraseña
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <StatusBar />
              </View>
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default ResetPassword;
