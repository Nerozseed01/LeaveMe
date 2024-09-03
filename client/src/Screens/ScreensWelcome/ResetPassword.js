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
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import { SafeAreaView } from "react-native-safe-area-context";

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const requestCode = async () => {
    try {
      
      setStep(2);
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar el código");
    }
  };

  const verifyCodeAndResetPassword = async () => {
    try {
      await axios.post("http://your-api-url/reset-password", {
        email,
        code,
        newPassword,
      });
      Alert.alert("Éxito", "Tu contraseña ha sido actualizada");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "No se pudo restablecer la contraseña");
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
                  style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60,height:500 }}
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
                  style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60,height:500 }}
                >
                    <View className="form space-y-2">
                    <Text className="text-gray-700">Codigo</Text>
                      <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        onChangeText={setCode}
                        value={code}
                        placeholder="Ingresa el codigo"
                      ></TextInput>
                      <Text className="text-gray-700">Email</Text>
                      <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Ingresa tu Email"
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
                        onPress={() => console.log("pressed")}
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
