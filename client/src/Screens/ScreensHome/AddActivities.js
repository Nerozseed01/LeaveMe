import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState,useEffect,useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import AddTask from "../../Components/AddTasks";
import Toast from "react-native-toast-message";
import { Button, FAB, Dialog } from "@rneui/themed";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import HomeScreenSkeleton from "../../Components/SqueletonTask";
import Ionicons from "@expo/vector-icons/Ionicons";

const API_Url = process.env.EXPO_PUBLIC_API_URL;

export default function AddActivities({ route }) {
  const navigation = useNavigation();
  const { idUser, token } = route.params;
  const [ActividadesRecomendadas, setActividadesRecomendadas] = useState();
  const {intereses,price_preference} = useContext(AuthContext);
  const [actividadesAgenda, setActividadesAgenda] = useState([]);
  const [visible, setVisible] = useState(false);
  const [task, setTask] = useState("");
  const [isLoading,setIsLoading]= useState(true)
  const palabrasProhibidas = [
    "sexo",
    "sex",
    "drogas",
    "alcohol",
    "aroma",
    "intoxicación",
    "joder",
    "masturbación",
    "puta",
    "criko",
    "drogarme",
    "foco",
    "matar",
    "murder",
    "maltrato",
    "abusar",
  ];
  useEffect(() => {
    if(intereses && price_preference){
      fetchRecomendaciones();
    }
  },[intereses])

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const fetchRecomendaciones = async () => {
    try {
      const response = await axios.post(`${API_Url}/api/recomendaciones`, {
        interests: intereses,
        price_preference: parseInt(price_preference),
      });
      const data = response.data.recommendations;
      if (response.status == 200) {
        setActividadesRecomendadas(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error al actualizar", error);
      const errorMessage = error.response.msg || "Ocurrió un error inesperado";
      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    }
  };

  // Función para verificar palabras prohibidas
  function contienePalabrasProhibidas(texto) {
    const regex = new RegExp(
      palabrasProhibidas
        .map((palabra) => palabra.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|"),
      "gi"
    );
    return regex.test(texto);
  }

  const handleAddTask = (activity, origen) => {
    if (origen === "pred") {
      if (actividadesAgenda === undefined || actividadesAgenda.length === 0) {
        setActividadesAgenda([{ actividad: activity }]);
      } else {
        let existe = actividadesAgenda.some(
          (item) => item.actividad === activity
        );
        if (existe) {
          let newActividadesAgenda = actividadesAgenda.filter(
            (item) => item.actividad !== activity
          );
          setActividadesAgenda(newActividadesAgenda);
        } else {
          setActividadesAgenda([...actividadesAgenda, { actividad: activity }]);
        }
      }
    } else if (origen === "personal") {
      if (contienePalabrasProhibidas(activity)) {
        Toast.show({
          text1: "La actividad contiene palabras prohibidas o antisonantes.",
          type: "error",
          visibilityTime: 2000, // milisegundos
          zIndex: 15000, // Un valor mayor que el zIndex del diá
        });
        setTask("");
        return;
      } else if (task === "") {
        Toast.show({
          text1: "Por favor, ingrese una actividad.",
          type: "error",
          visibilityTime: 2000, // milisegundo
        });
        return;
      }
      if (actividadesAgenda === undefined || actividadesAgenda.length === 0) {
        setActividadesAgenda([{ activity: activity }]);
      } else {
        setActividadesAgenda([...actividadesAgenda, { actividad: activity }]);
        setActividadesRecomendadas([...ActividadesRecomendadas,{ activity: activity }]);
        setTask("");
        toggleDialog();
      }
    }
  };

  const handleSaveActivities = async () => {
    if (actividadesAgenda.length <= 0) {
      Toast.show({
        text1: "No has agregado ninguna actividad.",
        type: "error",
        visibilityTime: 2000, // milisegundos
      });
      return;
    }
    try {
      const response = await axios.post(`${API_Url}/api/agendas/CrearAgenda`, {
        idUser,
        actividades: actividadesAgenda,
      },{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const msg = response.data.msg;
      const status = response.status;
      if (status === 200) {
        Toast.show({
          type: "success",
          text1: msg,
          visibilityTime: 2000, // milisegundos
          autoHide: true,
        });
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response.data.msg || "Ocurrió un error inesperado";
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

  if(isLoading){
    return (
      <HomeScreenSkeleton />
    )
  }

  return (
    <View className="flex-1" style={styles.color}>
      <SafeAreaView>
        <View className="flex-row space-x-64">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-orange-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => fetchRecomendaciones()}>
              <Ionicons name="reload" size={30} color="black" />
            </TouchableOpacity>
        </View>
        <View style={{ height: "86%" }} className="p-1">
          <Text className=" text-center text-xl font-semibold pb-2">
            Recomendacion de actividades segun tus intereses
          </Text>
          <FlatList
            data={ActividadesRecomendadas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const existe = actividadesAgenda.some(
                (i) => i.actividad === item.activity
              );
              if (existe) {
                return (
                  <AddTask
                    actividad={item.activity}
                    handleAddTask={handleAddTask}
                    isAddTask={true}
                  />
                );
              } else {
                return (
                  <AddTask
                    actividad={item.activity}
                    handleAddTask={handleAddTask}
                    isAddTask={false}
                  />
                );
              }
            }}
          />
        </View>
        <View
          className="h- flex-row justify-around items-center pb-3"
          style={styles.color}
        >
          <View style={styles.buttonShadow}>
            <Button
              title="Personalizar Actividad"
              buttonStyle={{
                backgroundColor: "#007BFF",
                width: "100%",
                borderRadius: 60,
                paddingVertical: 15,
                paddingHorizontal: 20,
              }}
              titleStyle={{ color: "black", fontWeight: "bold" }}
              onPress={() => toggleDialog()}
            />
          </View>

          <View style={styles.buttonShadow}>
            <FAB
              size="medium"
              icon={{
                name: "send",
                color: "black",
              }}
              buttonStyle={{
                backgroundColor: "#f97316",
              }}
              onPress={() => handleSaveActivities()}
            />
          </View>
        </View>
      </SafeAreaView>
      {/**Modal para añadir una actividad Personalizada */}
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="Añadir actividad" />
        <View className="flex-col">
          <Text className="text-center text-lg">
            Agrega la activida de tu agrado.
          </Text>
          <View className=" flex-col  items-center mt-5 justify-between">
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              onChangeText={setTask}
              value={task}
              placeholder="Ingresa la actividad personalizada"
            ></TextInput>
            <Button
              title="Agregar"
              type="clear"
              buttonStyle={{ paddingTop: 20 }}
              titleStyle={{ color: "red", fontSize: 20 }}
              onPress={() => handleAddTask(task, "personal")}
            />
          </View>
        </View>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  color: {
    backgroundColor: "#E8EAED",
  },
  buttonShadow: {
    boxShadow: "0px 20px 5px rgba(0, 0, 0, 0.6)",
    elevation: 5, // Solo para Android
  },
});
