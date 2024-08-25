import React, { useState } from "react";
import { Button } from "@rneui/themed";
import {  View, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";

export default Questions = ({route}) => {
  const { Usuario } = route.params;
  const [selectedPrice, setSelectedPrice] = useState(null);
  const navigation = useNavigation();

  const handlePriceSelection = (price) => {
   if (selectedPrice === price){ 
    setSelectedPrice(null);
   }else{
    setSelectedPrice(price);
   }
  };
  const handleSave = () => {
    if(selectedPrice === null || selectedPrice === null){
      Toast.show({
        text2: "Debes seleccionar un rango de precios",
        type: "error",
        duration: 4000,
      });
    }
    try {
      Usuario.preferenciasPrecio = selectedPrice;
      navigation.navigate("Interests", {Usuario});
    } catch (error) {
      console.log(error);
      Toast.show({
        text2: "Error al guardar tus preferencias",
        type: "error",
        duration: 4000,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View className="bg-purple-500 pb-6 p-2">
        <SafeAreaView>
          <Text className="text-xl text-center">
            Selecciona el rango de precios que prefieres para las actividades que te recomendaremos.
          </Text>
        </SafeAreaView>
      </View>
      <View className="justify-center items-center h-2/4 flex-col space-y-8">
        <Button
          title="Costo bajo"
          buttonStyle={styles.buttonStyle}
          style={styles.containerButton}
          titleStyle={styles.titleStyle}
          onPress={() => handlePriceSelection(1)}
          disabled={selectedPrice !== null && selectedPrice !== 1}
        />
        <Button
          title="Costo medio"
          buttonStyle={styles.buttonStyle}
          style={styles.containerButton}
          titleStyle={styles.titleStyle}
          onPress={() => handlePriceSelection(2)}
          disabled={selectedPrice !== null && selectedPrice !== 2}
        />
        <Button
          title="Costo alto"
          buttonStyle={styles.buttonStyle}
          style={styles.containerButton}
          titleStyle={styles.titleStyle}
          onPress={() => handlePriceSelection(3)}
          disabled={selectedPrice !== null && selectedPrice !== 3}
        />
      </View>
      <View className="justify-center items-center">
        <Button
          title="Guardar y continuar"
          buttonStyle={{
            backgroundColor: "#007BFF",
            borderRadius: 30,
            paddingVertical: 15,
          }}
          style={{
            width: 350,
            marginTop: 20,
          }}
          titleStyle={styles.titleStyle}
          onPress={() => handleSave()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  buttonStyle: {
    backgroundColor: "#f97316",
    borderRadius: 30,
    paddingVertical: 15,
    marginBottom: 20,
    width: 300,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  containerButton: {
    width: 400,
    marginBottom: 50,
  },
});
