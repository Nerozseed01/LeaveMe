import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native'

const ButtonPersonalizado= ({ ruta , text }) =>{
  const navigation = useNavigation();
    return(
      <View className="mt-3">
        <TouchableOpacity
            onPress={() => navigation.navigate(ruta)}
            className="py-3 bg-orange-500 mx-7 rounded-xl  ">
            <Text
              className="text-xl font-bold text-center text-black"
            >
              {text}
            </Text>
          </TouchableOpacity>
          </View>
    )
};

export default ButtonPersonalizado
