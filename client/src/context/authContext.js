import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { mensajes } from "./mensajes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSelectedInterests, setHasSelectedInterests] = useState(false);
  const [token, setToken] = useState("");
  const [idUser, setIdUser] = useState("");
  const [authOrigin, setAuthOrigin] = useState("");
  const [intereses, setIntereses] = useState([]);
  const [price_preference, setPricePreference] = useState(1)
  const [nombreUser, setNombreUsuario] = useState("");

  const login = async (receivedToken, dataUser, success,origen) => {
    if(origen === "login"){
    setIsAuthenticated(success);
    setToken(receivedToken);
    setIdUser(dataUser.id);
    setNombreUsuario(dataUser.nombre);
    setIntereses(dataUser.intereses);
    setPricePreference(dataUser.price)
    await AsyncStorage.setItem("token", receivedToken);
    await AsyncStorage.setItem("idUser", dataUser.id);
    await AsyncStorage.setItem("nombreUser", dataUser.nombre);
    await AsyncStorage.setItem("intereses", JSON.stringify(dataUser.intereses));
    await AsyncStorage.setItem("price", JSON.stringify(dataUser.price))
  }
  if(origen === "inicio"){
    setIsAuthenticated(success);
    setToken(receivedToken);
    setIdUser(dataUser.idUser);
    setNombreUsuario(dataUser.nombreUser);
    setIntereses(JSON.parse(dataUser.intereses));
    setPricePreference(parseInt(dataUser.price))
  } 
  };

  const porcentajeCompletado = actividades => {
    const totalActividades = actividades.length;

    if (totalActividades === 0)
      return "Aún no has registrado actividades. ¡Empieza con una pequeña meta hoy!";

    const completadas = actividades.filter(
      actividad => actividad.completada == true
    ).length;
   


    const porcentaje = (completadas / totalActividades) * 100;

    // Encuentra el objeto correspondiente al rango de porcentaje
    const mensajeObj = mensajes.find(msg => porcentaje >= msg.min && porcentaje <= msg.max);

    // Si no se encuentra un objeto para el porcentaje, devolver un mensaje predeterminado
    if (!mensajeObj) return "No se pudo encontrar un mensaje para este porcentaje.";

    // Selecciona un mensaje aleatorio de la lista de textos
    const mensajesPosibles = mensajeObj.texts;
    const mensajeAleatorio = mensajesPosibles[Math.floor(Math.random() * mensajesPosibles.length)];

    return {mensajeAleatorio, porcentaje};
  };

  const register = async(receivedToken, receivedIdUser, success) => {
    setIsAuthenticated(success);
    setToken(receivedToken);
    setIdUser(receivedIdUser.id);
    setNombreUsuario(receivedIdUser.nombre);
    setIntereses(receivedIdUser.intereses);
    setPricePreference(receivedIdUser.price)
    await AsyncStorage.setItem("token", receivedToken);
    await AsyncStorage.setItem("idUser", receivedIdUser.id);
    await AsyncStorage.setItem("nombreUser", receivedIdUser.nombre);
    await AsyncStorage.setItem("intereses", JSON.stringify(receivedIdUser.intereses));
    await AsyncStorage.setItem("price", JSON.stringify(receivedIdUser.price))
  };



  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    setIdUser("");
    setAuthOrigin("");
    setNombreUsuario("");
    setIntereses([]);
    setHasSelectedInterests(false);
    setPricePreference(1)
    AsyncStorage.clear(); // Limpia los datos de almacenamiento persistente
  };
  // Función para verificar la expiración del token
  const checkTokenExpiration = () => {
    if (!token) return; // No hay token para verificar

    // Suponiendo que el token es un JWT y quieres verificar la expiración
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos

    if (decodedToken.exp < currentTime) {
      logout(); // Cierra la sesión si el token ha expirado
    }
  };

  // Ejecuta checkTokenExpiration cada minuto
  useEffect(() => {
    const timer = setInterval(checkTokenExpiration, 10800000); // 60000 milisegundos = 1 minuto

    return () => clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        hasSelectedInterests,
        authOrigin,
        token,
        idUser,
        intereses,
        login,
        register,
        logout,
        porcentajeCompletado,
        nombreUser,
        price_preference
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
