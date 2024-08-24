// Tarjeta.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = ({ title, value, tipo }) => {

  const color =
    tipo === "totales"
      ? "white"
      : tipo === "completada"
      ? "#4ade80"
      : tipo === "no"
      ? "#f87171"
      : "white";
  return (
    <>
      {value !== null && value !== undefined ? (
        <View style={[styles.card, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ) : (
        <View style={[styles.card, { backgroundColor: color }]}>
          {/* Corrección aquí: Cambiar className a style */}
          <Text style={styles.title}>{title}</Text>
          {/* Puedes decidir qué mostrar cuando value es null o undefined */}
          <Text style={styles.value}>0</Text> {/* O cualquier otro valor por defecto */}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title2:{
    fontSize: 16,
    fontWeight: "medium",
    marginBottom: 5,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Card;

