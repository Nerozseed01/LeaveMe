import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useCallback, useEffect } from "react";
import Task from "../../Components/Task";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Button, FAB } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import Toast from "react-native-toast-message";
import DialogFraseCompletada from "../../Components/DialogFraseCompletada";
import HomeScreenSkeleton from "../../Components/SqueletonTask";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from 'expo-constants';

const API_Url = process.env.EXPO_PUBLIC_API_URL;

export default function Home() {
  const [activities, setActivities] = useState([]);
  const { idUser, token } = useContext(AuthContext);
  const [idAgenda, setIdAgenda] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actividadesFaltantes, setActividadesFaltantes] = useState(0);
  const [dialogCompletada, setDialogCompletada] = useState(false);
  const [dialogFraseDiaria, setDialogFraseDiaria] = useState(null);

  useFocusEffect(
    useCallback(() => {
      if (idUser) {
        fetchActivities();
      }
    }, [idUser])
  );

  useEffect(() => {}, [activities]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        `${API_Url}/api/agendas/ObtenerAgendaUser/${idUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 && response.data.agendaActiva === null) {
        setIsLoading(false);
        return;
      }

      const data = response.data;
      const estatus = response.status;
      if (estatus === 200) {
        setActivities(data.actividades);
        setIdAgenda(data._id);
        setActividadesFaltantes(data.actividades.filter(act =>!act.completada).length);
      }
    } catch (error) {
      const errorMessage = error.response.data.msg || error.message;
      console.error(error);
      Toast.show({
        type: "error",
        text2: errorMessage,
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = async id => {
    const yaMarcado = activities.find(activity => {
      if (activity._id === id) {
        if (activity.completada === true) {
          return true;
        } else {
          return false;
        }
      }
    });
    if (yaMarcado) {
      Toast.show({
        type: "error",
        text1: "Esta tarea ya está marcada como realizada.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_Url}/api/agendas/MarcarComoRealizada`,
        {
          idAgenda,
          idActividad: id,
        }
      );
      const data = response.data;
      const estatus = response.status;
      if (estatus === 200) {
        // Actualizar la lista de actividades
        setActivities(
          activities.map(activity =>
            activity._id === id
              ? { ...activity, completada: !activity.completada }
              : activity
          )
        );
        setActividadesFaltantes(actividadesFaltantes - 1);
        Toast.show({
          type: "success",
          text1: data.msg,
          visibilityTime: 2000, // milisegundos
          autoHide: true,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Hubo un error al cambiar el estado de la tarea.",
          visibilityTime: 2000, // milisegundos
          autoHide: true,
        });
      }
    } catch (error) {
      const errorMessage = error.response.data.msg || error.message;
      console.error(error);
      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
      toggleDialog("completada");
    }
  };

  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate("CheckListEdit", { activities, idAgenda, idUser });
  };

  const toggleDialog = origen => {
    if (origen === "completada") {
      setDialogCompletada(!dialogCompletada);
    } else if (origen === "fraseDiaria") {
      setDialogFraseDiaria(!dialogFraseDiaria);
    }
  };

  return (
    <View className="flex-1" style={styles.color}>
      {isLoading ? (
       <HomeScreenSkeleton />
      ) : (
        <SafeAreaView>
          {/* En este view se crea el boton de editar*/}
          <View className="flex-row items-center justify-between mb-2">
            <Text className="font-bold text-start text-2xl  ml-4 ">
              Lista de Actividades
            </Text>
            {/* Botón de edición con ícono */}
            {activities.length > 0 && (
              <TouchableOpacity
                onPress={handleEdit}
                className="bg-orange-500 rounded-full px-3 py-3 mr-3  "
              >
                <MaterialIcons name="edit" size={15} color="black" />
              </TouchableOpacity>
            )}
          </View>
          {/* Aqui se cargan todas las actividades */}
          <View style={{ height: "82%" }}>
            {activities.length <= 0 ? (
              <View className="flex-1 flex-col items-center justify-center">
                <Text className="text-center text-3xl font-bold">
                  No hay actividades, agrega algunas nuevas!
                </Text>
                <Text className="text-sm text-center p-1 ">
                  Puedes usar el botón "Agregar Actividad(+)" para agregar
                  nuevas.
                </Text>
              </View>
            ) : (
              <>
                <View className="flex-row  justify-center">
                  <Text className="text-sm text-center">
                    Tienes{" "}
                    {actividadesFaltantes}{" "}
                    actividades por completar
                  </Text>
                </View>
                <FlatList
                  data={activities}
                  renderItem={({ item }) => (
                    <Task {...item} toggleTodo={toggleTodo} />
                  )}
                  keyExtractor={item => item._id.toString()}
                  className="p-3"
                />
              </>
            )}
          </View>
          {/*El siguiente View es donde se muestra el progreso */}
          {activities.length <= 0 ? (
            <View
              className="h-20 flex-row justify-around items-center pb-3"
              style={styles.color}
            >
              <View style={styles.buttonShadow}>
                <Button
                  title="Progreso"
                  buttonStyle={{
                    backgroundColor: "#007BFF",
                    width: "100%",
                    borderRadius: 60,
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                  }}
                  titleStyle={{ color: "black", fontWeight: "bold" }}
                  onPress={() => navigation.navigate("Progress", { idUser })}
                />
              </View>

              <View style={styles.buttonShadow}>
                <FAB
                  size="medium"
                  icon={{
                    name: "add",
                    color: "black",
                  }}
                  buttonStyle={{
                    backgroundColor: "#f97316",
                  }}
                  onPress={() =>
                    navigation.navigate("AddActivities", { idUser, token })
                  }
                />
              </View>
            </View>
          ) : (
            <View
              className="h-20  items-center justify-center pb-3"
              style={styles.color}
            >
              <View style={styles.buttonShadow}>
                <Button
                  title="Progreso"
                  buttonStyle={{
                    backgroundColor: "#007BFF",
                    width: "100%",
                    borderRadius: 60,
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                  }}
                  titleStyle={{ color: "black", fontWeight: "bold" }}
                  onPress={() => navigation.navigate("Progress", { idUser })}
                />
              </View>
            </View>
          )}
        </SafeAreaView>
      )}

      {dialogCompletada && (
        <DialogFraseCompletada
          visible={dialogCompletada}
          toggleDialog={toggleDialog}
          items={activities}
        />
      )}
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
