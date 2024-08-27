import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackScreenWelcome from "./StackScreenWelcome";
import TabNavigation from "./TabNavigationApp";
import { AuthContext } from "../context/authContext"; // Asegúrate de que la ruta sea correcta
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import ScreenLoading from "../Screens/ScreenLoading";

const AppNavigationDecision = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Estado para controlar si se está cargando

  useEffect(() => {
    const checkTokenAndLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        if (isTokenValid(token)) {
          const idUser = await AsyncStorage.getItem("idUser");
          const nombreUser = await AsyncStorage.getItem("nombreUser");
          const intereses = await AsyncStorage.getItem("intereses");
          const price = await AsyncStorage.getItem("price")
          login(token, {idUser, nombreUser, intereses,price}, true, "inicio");
        }
      } else {
        logout();
      }
      setLoading(false); // Cambiar a no cargar después de realizar las acciones necesarias
    };

    checkTokenAndLogin();
  }, []);

  const isTokenValid = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Tiempo actual en segundos

      return decodedToken.exp > currentTime;
    } catch (error) {
      // Si ocurre un error al decodificar el token, considerarlo como inválido
      return false;
    }
  };

  // Mostrar ScreenLoading mientras se verifica el estado de autenticación
  if (loading) {
    return <ScreenLoading />;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? <StackScreenWelcome /> : <TabNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigationDecision;