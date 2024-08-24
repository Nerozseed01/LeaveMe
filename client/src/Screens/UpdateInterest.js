import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Chip, FAB } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const API_Url = process.env.API_URL;

function UpdateInterest() {
  const { userId, interesesUser } = useRoute().params;
  const navigation = useNavigation();
  const [selectedInterests, setSelectedInterests] = useState(interesesUser);
  const [interesesTodo, setInteresesTodo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_Url}/api/user/obtenerTodosLosIntereses`
        );
        const data = response.data;
        const status = response.status;
        if (status === 200) {
          setInteresesTodo(data);
        }
      } catch (error) {
        console.error(error);
        const errorMessage = error.response.data.msg || error.message;
        console.error(errorMessage);
        Toast.show({
          type: "error",
          text1: errorMessage,
          visibilityTime: 2000, // milisegundos
          autoHide: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleChangeInterest = interestId => {
    const existe = selectedInterests.some(i => i._id === interestId);
    if (existe) {
      const newSelect = selectedInterests.filter(i => i._id !== interestId);
      setSelectedInterests(newSelect);
    } else {
      const item = interesesTodo.find(i => i._id === interestId);
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  const handleUpdate = async () => {
    if (selectedInterests.length <= 0) {
      Toast.show({
        type: "error",
        text1: "Debes seleccionar al menos un interés.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    }
    setIsLoading(true);
    const idSelected = selectedInterests.map(item => item._id);
    try {
      const response = await axios.post(
        `${API_Url}/api/user/actualizarIntereses`,
        {
          idUser: userId,
          intereses: idSelected,
        }
      );
      const status = response.status;
      const mesg = response.data.msg;
      if (status === 200) {
        setIsLoading(false);
        Toast.show({
          type: "success",
          text1: mesg,
          visibilityTime: 2000, // milisegundos
          autoHide: true,
        });
      }
    } catch (error) {
      const errorMessage = error.response.data.msg || error.message;
      console.error(errorMessage);
      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    } finally {
      navigation.goBack();
    }
  };

  return (
    <>
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <Spinner size={80} color="#0000ff" visible={isLoading} />
        </View>
      ) : (
        <View className="bg-neutral-200">
          <SafeAreaView className="bg-neutral-200">
            <View className="ml-2">
              <Text className="text-center text-3xl font-semibold">
                Seleccionar Intereses
              </Text>
              <Text className="text-left text-sm mt-2 text-slate-900">
                Selecciona los intereses los mas te llamen la atencion para
                recomendarte actividades.
              </Text>
            </View>
          </SafeAreaView>
          {/** Esta view contiene los botones para seleccionar los intereses */}
          <View className="mt-1" style={{height:"63%"}}>
            <ScrollView>
              <View className="flex-row flex-wrap justify-center items-center bg-neutral-200 ">
                {interesesTodo.map(item => (
                  <View key={item._id} className="m-1">
                    <Chip
                      title={item.nombre}
                      titleStyle={{ color: "black" }}
                      onPress={() => {
                        handleChangeInterest(item._id);
                      }}
                      buttonStyle={{
                        backgroundColor: selectedInterests.some(
                          i => i._id === item._id
                        )
                          ? "#a78bfa"
                          : "#f97316",
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      }}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          {/** Esta view contiene el botón para guardar los intereses seleccionados */}
          <View className="flex-row justify-center items-center mt-1 h-24">
            <FAB
              visible={visible}
              title="Actualizar Intereses"
              color="black"
              onPress={() => handleUpdate()}
            />
          </View>
        </View>
      )}
    </>
  );
}

export default UpdateInterest;
