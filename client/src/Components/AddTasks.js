import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { CheckBox, Icon } from "@rneui/themed";

export default function AddTask({
  actividad,
  isAddTask,
  handleAddTask,
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between mb-5 bg-white p-3 rounded-xl "
      onPress={() => handleAddTask(actividad,"pred")}
      style={{backgroundColor : isAddTask? "#d1d5db" : "white"  }}
    >
      <Text className=" text-center text-lg  ">{actividad}</Text>
      <CheckBox
        checked={isAddTask}
        checkedColor="#f97316"
        uncheckedColor="#007BFF"
        size={18}
        containerStyle={{
          padding: 1,
          backgroundColor: "transparent",
        }}
      />
    </TouchableOpacity>
  );
}
