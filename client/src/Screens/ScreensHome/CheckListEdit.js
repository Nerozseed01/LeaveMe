import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import React, { useState, useContext,useEffect } from "react";
import EditTask from "../../Components/EditTask";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Divider } from "@rneui/themed";
import Toast from "react-native-toast-message";
import AddTask from "../../Components/AddTasks";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreenSkeleton from "../../Components/SqueletonTask";
import { AuthContext } from "../../context/authContext";

const API_Url = process.env.API_URL;

const CheckListEdit = ({ route }) => {
  const navigation = useNavigation();
  const { idAgenda, idUser } = route.params;
  const [activities, setActivities] = useState(route.params.activities);
  const [isLoading, setIsLoading] = useState(false);
  const { intereses, price_preference } = useContext(AuthContext);
  const [recomendaciones, setRecomendaciones] = useState([]);

  const completadas =
    activities.filter(activity => activity.completed).length ===
    activities.length
      ? true
      : false;
  const [actividadesNuevas, setActividadesNuevas] = useState([]);

  useEffect(() => {
    if(intereses && price_preference){
      fetchRecomendaciones();
    }
  },[intereses])

  const toggledelete = async (id, actividad) => {
    const existe = actividadesNuevas.some(item => item.actividad === actividad);
    try {
      if (!existe) {
        const response = await axios.delete(
          `${API_Url}/api/agendas/EliminarActividad/${idAgenda}/${id}`
        );
        const msg = response.data.msg;
        const status = response.status;
        if (status === 200) {
          setActivities(activities.filter(activity => activity._id !== id));
          Toast.show({
            type: "success",
            text1: msg,
            visibilityTime: 2000, // milisegundos
            autoHide: true,
          });
        }
      } else {
        const newActividadesNuevas = actividadesNuevas.filter(
          item => item.actividad !== actividad
        );
        const newActivities = activities.filter(
          item => item.actividad !== actividad
        );
        setActividadesNuevas(newActividadesNuevas);
        setActivities(newActivities);
      }
    } catch (error) {
      console.error("Error al eliminar la actividad", error);
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

  const handleAddTask = async (actividad, tipo) => {
    if (actividadesNuevas === undefined || actividadesNuevas.length === 0) {
      setActividadesNuevas([{ actividad: actividad, completada: false }]);
      setActivities([
        ...activities,
        { actividad: actividad, completada: false },
      ]);
    } else {
      const existe =
        actividadesNuevas.some(item => item.actividad === actividad) &&
        activities.some(item => item.actividad === actividad);
      if (existe) {
        const newActividadesNuevas = actividadesNuevas.filter(
          item => item.actividad !== actividad
        );
        const newActivities = activities.filter(
          item => item.actividad !== actividad
        );
        setActividadesNuevas(newActividadesNuevas);
        setActivities(newActivities);
      } else {
        setActividadesNuevas([
          ...actividadesNuevas,
          { actividad: actividad, completada: false },
        ]);
        setActivities([
          ...activities,
          { actividad: actividad, completada: false },
        ]);
      }
    }
  };

  const handleSaveTasks = async () => {
    if (actividadesNuevas.length === 0) {
      Toast.show({
        type: "error",
        text2: "Debes agregar al menos una actividad",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    }
    try {
      const response = await axios.put(
        `${API_Url}/api/agendas/ActualizarAgenda/${idAgenda}`,
        {
          idUser,
          nuevasActividades: actividadesNuevas,
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
      console.error("Error al actualizar", error);
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

  const fetchRecomendaciones = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_Url}/api/recomendaciones`, {
        interests: intereses,
        price_preference: parseInt(price_preference),
      });
      const data = response.data.recommendations;
      if (response.status == 200) {
        setRecomendaciones(data);
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
  if (isLoading) {
    <HomeScreenSkeleton />;
  }
  console.log(recomendaciones);
  return (
    <View className="flex-1" style={styles.colorMain}>
      <SafeAreaView>
        {/**Botones de regreso y Guardar */}
        <View className="flex flex-row justify-between items-center mb-5">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-orange-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-1"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>

          {/* Contenedor para el texto */}
          <View className="flex-grow justify-center items-center">
            <Text className="text-black text-2xl font-bold">
              Tus Actividades
            </Text>
          </View>
        </View>

        {/* Aqui se cargan todas las actividades */}
        <View style={{ height: "45%" }}>
          {activities.length === 0 || completadas ? (
            <Text style={{ textAlign: "center", marginTop: 100 }}>
              No hay actividades agregadas
            </Text>
          ) : (
            <>
              <FlatList
                data={activities}
                renderItem={({ item }) => {
                  if (item.completada == false) {
                    return <EditTask {...item} toggleDelete={toggledelete} />;
                  } else {
                    return null;
                  }
                }}
                keyExtractor={(item, index) => index.toString()}
                className="p-3"
              />
              <Divider width={2} />
            </>
          )}
        </View>
        <View style={{ height: "39%" }}>
          <View className="flex flex-row justify-around items-center">
            <Text className="text-center text-xl">
              Añade Actividades Recomendadas
            </Text>
            <TouchableOpacity onPress={() => fetchRecomendaciones()}>
              <Ionicons name="reload" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={recomendaciones.filter(
              item => !activities.some(a => a.actividad === item.activity)
            )}
            className="p-3"
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const existe = actividadesNuevas.some(
                i => i.actividad === item.activity
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
          className="h-16 flex-row items-center justify-center"
          style={styles.color}
        >
          <View style={styles.buttonShadow}>
            <Button
              title="Guardar"
              buttonStyle={{
                backgroundColor: "#FFF",
                width: "100%",
                borderRadius: 60,
                paddingVertical: 15,
                paddingHorizontal: 15,
              }}
              titleStyle={{ color: "black", fontWeight: "bold" }}
              onPress={() => handleSaveTasks()}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  colorMain: {
    backgroundColor: "#E8EAED",
  },
  buttonShadow: {
    boxShadow: "0px 20px 5px rgba(0, 0, 0, 0.6)",
    elevation: 5, // Solo para Android
  },
});

export default CheckListEdit;
