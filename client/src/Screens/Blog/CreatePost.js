import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar,Divider, FAB } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import SkeletonCreatePost from "../../Components/SkeletonCreate";

const API_Url = process.env.API_URL;

export default function CreatePost() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { idUser, token } = useContext(AuthContext);
  const MAX_CHARACTERS = 280;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (idUser) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${API_Url}/api/user/obtenerPerfilUsuario/${idUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.msg || error.message,
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostCreation = async () => {
    if (text.trim().length === 0) {
      Toast.show({
        type: "error",
        text2: "No se puede publicar por que esta vacio",
        visibilityTime: 4000, // milisegundos
        autoHide: true,
      });
      return;
    }
    try {
      setIsPublishing(true);
      const response = await axios.post(`${API_Url}/api/posts/AgregarPost`, {
        idUser,
        descripcion: text,
      });
      const data = response.data;

      if (data.estado === 1) {
        Toast.show({
          type: "success",
          text2: data.msg,
          visibilityTime: 9000, // milisegundos
          autoHide: true,
        });
        navigation.goBack();
      }

      if (data.estado === 0) {
        Toast.show({
          type: "error",
          text2: data.msg,
          visibilityTime: 2000, // milisegundos
          autoHide: true,
        });
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response.data.msg || error.message;
      Toast.show({
        type: "error",
        text2: errorMessage,
        visibilityTime: 8000, // milisegundos
        autoHide: true,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return <SkeletonCreatePost />;
  }

  return (
    <View className="flex-1">
      <SafeAreaView>
        <View className="flex flex-row justify-between items-center mb-6 ">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="ml-1"
          >
            <AntDesign name="close" size={30} color="black" />
          </TouchableOpacity>
          <View className="flex-grow justify-center items-center pr-8">
            <Text className="text-black text-2xl font-bold">Crear Post</Text>
          </View>
        </View>
        <Divider />

        <ScrollView style={{ backgroundColor: "#E8EAED" }}>
          <View className="flex-row items-center mb-2 ml-2 mt-2">
            <Avatar
              size={44}
              rounded
              source={{
                uri:
                  user.avatar ||
                  "https://th.bing.com/th/id/R.5baab3a76b4366e35625927a75c4d73f?rik=bvgTooGM0f8WKg&pid=ImgRaw&r=0",
              }}
            />
            <Text className="ml-2 text-lg font-semibold pb-2">
              {user.nombreCompleto}
            </Text>
          </View>
          <TextInput
            multiline
            numberOfLines={10}
            placeholder="Escribe algo..."
            value={text}
            onChangeText={setText}
            className=" h-40 p-4 text-gray-700 ml-10 mr-4 "
          />
          <View style={styles.characterCounter}>
            <Text style={styles.characterCounterText}>
              {text.length}/{MAX_CHARACTERS}
            </Text>
          </View>
        </ScrollView>
        {isPublishing && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>Publicando...</Text>
          </View>
        )}
        <FAB
          title="Publicar"
          style={styles.addButton}
          color="#3b82f6"
          onPress={() => handlePostCreation()}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5, // Solo para Android
  },
  characterCounter: {
    alignItems: "flex-end",
    paddingBottom: 5,
    marginRight: 5,
  },
  characterCounterText: {
    fontSize: 14,
    color: "#666666",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1DA1F2",
  },
});
