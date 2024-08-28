import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useCallback, useMemo } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { Avatar } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
import { Chip } from "@rneui/themed";
import ProfileSkeleton from "../Components/SkeletonProfile";
import { SafeAreaView } from "react-native-safe-area-context";


const FILENAME = "profilepic.jpg";
const API_Url = process.env.API_URL;

const InterestList = React.memo(({ intereses }) => (
  <ScrollView>
    <View className="flex-row flex-wrap justify-center items-center">
      {intereses.map(item => (
        <View key={item._id} className="m-2">
          <Chip title={item.nombre} />
        </View>
      ))}
    </View>
  </ScrollView>
));

export default function Profile() {
  const { logout, token, idUser,intereses } = useContext(AuthContext);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [interesesUser, setIntereses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [fileInfo, userResponse] = await Promise.all([
        FileSystem.getInfoAsync(FileSystem.documentDirectory + FILENAME),
        axios.get(`${API_Url}/api/user/obtenerPerfilUsuario/${idUser}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const datosPerfil = userResponse.data.user;
      setIntereses(datosPerfil.intereses);
      setUser({ ...datosPerfil, intereses: undefined });
      setPhoto(fileInfo.exists ? fileInfo.uri : datosPerfil.avatar);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.msg || error.message,
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  }, [idUser, token]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const selectPhoto = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Toast.show({
        type: "error",
        text1: "Permiso denegado para acceder a la galería.",
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      let fotoPerfil = result.assets[0].uri;
      SaveImageLocal(fotoPerfil);
    } else {
      Toast.show({
        type: "error",
        text1: "No se seleccionó ninguna imagen.",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const SaveImageLocal = async uri => {
    const existingImagePath = `${FileSystem.documentDirectory}${FILENAME}`;
    const newPath = `${FileSystem.documentDirectory}${FILENAME}`;

    // Verificar si ya existe una imagen
    const exists = await FileSystem.getInfoAsync(existingImagePath);

    if (exists.exists) {
      // Si existe, elimina la imagen antigua
      await FileSystem.deleteAsync(existingImagePath);
      console.log("Imagen antigua eliminada.");
    }

    try {
      setPhoto(uri); // Actualiza el estado con la nueva ruta de la imagen
      // Copia la nueva imagen
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Hubo un error al actualizar la imagen.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    } finally {
      setPhoto(newPath); // Actualiza el estado con la nueva ruta de la imagen
      Toast.show({
        type: "success",
        text1: "Imagen actualizada correctamente.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    }
  };

  const memoizedInterestList = useMemo(
    () => <InterestList intereses={interesesUser} />,
    [interesesUser]
  );


  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <View className="flex-1 container bg-purple-400">
      <SafeAreaView className="flex">
        <View className="flex-col justify-start items-center mb-7">
          <Avatar
            size={100}
            rounded
            source={{ uri: photo }}
            title="Avatar de Usuario"
          >
            <Avatar.Accessory size={28} onPress={selectPhoto} />
          </Avatar>
          <Text className="text-black text-3xl mt-5 p-1 text-center">
            {user.nombreCompleto}
          </Text>
        </View>
      </SafeAreaView>

      <View
        className="flex-1 bg-neutral-200 px-2 pt-5 mx-auto container"
        style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
      >
        <Text className="text-2xl text-center mb-5">Tus Intereses</Text>
        {interesesUser.length > 0 ? (
          <>
            {memoizedInterestList}
            <TouchableOpacity
              className="bg-orange-500 mx-7 p-3 rounded-xl mt-5"
              onPress={() =>
                navigation.navigate("UpdateInterest", {
                  userId: idUser,
                  interesesUser: interesesUser,
                })
              }
            >
              <Text className="font-semibold text-center text-black text-base">
                Cambiar Intereses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-orange-500 p-3 rounded-xl mt-3 mx-7 mb-4"
              onPress={logout}
            >
              <Text className="font-semibold text-center text-black text-base">
                Cerrar sesión
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View className="justify-center" style={{height: "58%"}}>
              <Text className="text-2xl text-center">
                Aún no hay intereses 😞
              </Text>
            </View>
            <TouchableOpacity
              className="bg-orange-500 mx-7 p-4 rounded-xl"
              onPress={() =>
                navigation.navigate("UpdateInterest", {userId:idUser, interesesUser: [] })
              }
            >
              <Text className="font-semibold text-center text-black text-lg">
                Agregar Intereses 😊
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-orange-500 p-3 rounded-xl mt-3 mx-7 mb-4"
              onPress={logout}
            >
              <Text className="font-semibold text-center text-black text-base">
                Cerrar sesión
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
