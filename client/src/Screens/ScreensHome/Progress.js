import React, { useEffect, useState,useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Card from "../../Components/Card";
import AntDesign from "@expo/vector-icons/AntDesign";
import { format, addDays, subDays, previousDay } from "date-fns";
import axios from "axios";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";

const API_Url = process.env.EXPO_PUBLIC_API_URL;

export default function Progress({ route }) {
  const { idUser } = route.params;
  const { intereses } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dataProgress, setDataProgress] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (idUser) {
      FetchProgreso();
    }
  }, [currentDate]);

  const FetchProgreso = async () => {
    setMsg("");
    setDataProgress([]);
    const date = format(currentDate, "yyyy-MM-dd");
    try {
      const response = await axios.post(
        `${API_Url}/api/user/ObtenerProgresoUsuario`,
        {
          idUser,
          fecha: date,
        }
      );

      const data = response.data;

      if (data.estado == 0) {
        setMsg(data.msg);
        setLoading(false);
      }

      if (data.length >= 0 && response.status === 200) {
        setDataProgress(data[0]);
        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Error al obtener datos:",
        error.response ? error.response.data.msg : error.message
      );
      Toast.show({
        type: "error",
        text1: "Error obteniendo el progreso",
        text2: error.response ? error.response.data.msg : "Error de conexión",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };
  const goToPreviusDay = () => {
    setCurrentDate(prevDate => subDays(prevDate, 1));
  };

  const goToNextDay = () => {
    setCurrentDate(prevDate => addDays(prevDate, 1));
  };

  return (
    <View className=" flex-1" style={styles.color}>
      {loading ? (
        <View className="flex-1 flex-col items-center justify-center">
          <Spinner size="large" color="#a855f7" />
        </View>
      ) : (
        <SafeAreaView>
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
                Progreso de tu dia
              </Text>
            </View>
          </View>
          <View className="flex flex-row ">
            <View className="w-1/6  justify-center items-center">
              <TouchableOpacity onPress={() => goToPreviusDay()}>
                <AntDesign name="doubleleft" size={35} color="black" />
              </TouchableOpacity>
            </View>
            <View className=" w-4/6 h-10">
              <Text className=" font-bold text-center text-2xl mt-1 ">
                {format(currentDate, "dd-MM-yy")}
              </Text>
            </View>
            <View className="w-1/6 justify-center items-center">
              <TouchableOpacity onPress={() => goToNextDay()}>
                <AntDesign name="doubleright" size={35} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="justify-center items-center mt-5">
            <AnimatedCircularProgress
              size={215} // Tamaño del círculo
              width={25} // Ancho de la barra
              fill={
                Object.keys(dataProgress).length > 0
                  ? dataProgress.porcentaje
                  : 0
              } // Progreso (valor entre 0 y 100)
              tintColor="#3498db" // Color de la barra
              backgroundColor="#e0e0e0" // Color de fondo de la barra
              rotation={0} // Rotación de la barra
              lineCap="round" // Estilo de los extremos de la barra
            >
              {fill => (
                <Text style={styles.progressText} className="text-center m-1">
                  Completaste el{" "}
                  {Math.round(
                    Object.keys(dataProgress).length > 0
                      ? dataProgress.porcentaje
                      : 0
                  )}
                  % de tus actividades ese dia.
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>
          {typeof dataProgress === "object" &&
          Object.keys(dataProgress).length > 0 ? (
            <View className="flex flex-col justify-center items-center mt-5 ">
              <Card
                title={"Actividades totales del dia:"}
                value={dataProgress.actividadesTotal}
                tipo={"totales"}
              />
              <View className="flex flex-row justify-around items-center ">
                <Card
                  title={"Completadas:"}
                  value={dataProgress.actividadesCompletada}
                  tipo={"completada"}
                />
                <Card
                  title={"Incompletas:"}
                  value={dataProgress.actividadesIncompletas}
                  tipo={"no"}
                />
              </View>
              <View className="justify-center items-center">
                <Text className="text-center text-xl m-3">
                  {dataProgress.mensaje}
                </Text>
              </View>
            </View>
          ) : (
            <View className="items-center justify-center mt-14 ">
              <Text className="text-center text-xl m-3">{msg}</Text>
            </View>
          )}
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  color: {
    backgroundColor: "#E8EAED",
  },
});
