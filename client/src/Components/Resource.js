import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ResourceItem = ({ item, handleResourcePress, getIconName }) => {
  return (
    <TouchableOpacity onPress={() => handleResourcePress(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name={getIconName(item.tag)} size={24} color="#4a5568" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.titulo}</Text>
          <Text style={styles.itemDescription}>{item.descripcion}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#4a5568" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    boxShadow: "0px 20px 5px rgba(0, 0, 0, 0.6)",
    elevation: 4,
  },
  iconContainer: {
    backgroundColor: '#e2e8f0',
    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  itemDescription: {
    fontSize: 14,
    color: '#4a5568',
    marginTop: 5,
  },
});

export default ResourceItem;