import React, { useContext } from "react";
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/authContext";

export default function DialogFraseCompletada({
  visible,
  toggleDialog,
  items,
}) {
  const { porcentajeCompletado } = useContext(AuthContext);
  const { mensajeAleatorio, porcentaje } = porcentajeCompletado(items);
  
  const getStars = () => {
    if (porcentaje >= 0 && porcentaje <= 30) {
      return 1;
    } else if (porcentaje > 30 && porcentaje <= 70) {
      return 2;
    } else if (porcentaje > 70 && porcentaje <= 100) {
      return 3;
    } else {
      return 1;
    }
  };

  const stars = getStars();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => toggleDialog("completada")}
    >
      <TouchableWithoutFeedback onPress={() => toggleDialog("completada")}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.title}>¡Felicidades!</Text>
              <Text style={styles.text}>{mensajeAleatorio}</Text>
              <View style={styles.starsContainer}>
                {Array.from({ length: stars }, (_, i) => (
                  <MaterialIcons key={i} name="star" size={40} color="#f97316" />
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "#E6E6FA",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    boxShadow: "0px 20px 5px rgba(0, 0, 0, 0.6)",
    elevation: 5,
    width: "80%",
    maxHeight: "60%",
  },
  title: {
    color: "#333333",
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    color: "#666666",
    fontSize: 20,
    fontFamily: "Roboto",
    textAlign: "center",
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
