import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { CheckBox, Icon } from "@rneui/themed";

export default function Task({
  _id,
  actividad,
  completada,
  toggleTodo,
}) {
  return (
    <View className="flex-row items-center justify-between mb-5 bg-white p-3 rounded-xl " key={_id}>
      <Text className=" text-center text-lg  ">{actividad}</Text>
      <CheckBox
        checked={completada}
        onPress={() => toggleTodo(_id)}
        checkedColor="#f97316"
        uncheckedColor="#007BFF"
        size={25}
        containerStyle={{
          padding: 1,
        }}
      />
    </View>
  );
}





