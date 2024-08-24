import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ButtonInteres = ({ id, interes }) => {
  return (
    <View
      className="rounded-2xl h-10 mr-2 mt-2 bg-slate-300 justify-center items-center"
      style={{ width: interes.length * 15 }}
      key={id}
    >
      <Text className=" text-base">{interes} </Text>
    </View>
  );
};

export default ButtonInteres;
