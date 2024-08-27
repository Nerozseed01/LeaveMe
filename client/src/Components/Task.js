import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { CheckBox } from "@rneui/themed";

export default function Task({ _id, actividad, completada, toggleTodo }) {
  return (
    <View style={styles.container} key={_id}>
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
          {actividad}
        </Text>
      </View>
      <CheckBox
        checked={completada}
        onPress={() => toggleTodo(_id)}
        checkedColor="#f97316"
        uncheckedColor="#007BFF"
        size={25}
        containerStyle={styles.checkboxContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
  checkboxContainer: {
    padding: 0,
    marginRight: 0,
    marginLeft: 0,
    backgroundColor: 'transparent',
  },
});