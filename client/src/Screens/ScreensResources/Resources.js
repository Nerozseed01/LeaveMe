import React, { useState,useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { Button, Divider } from "@rneui/themed";
import Resource from "../../Components/Resource";
import ResourceModal from "../../Components/ResourceModal";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_Url = process.env.API_URL;

export default function Resources() {
  const [tags, setTags] = useState();
  const [selectedTag, setSelectedTag] = useState(null);
  const [resources, setResources] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchResources();
    }, [])
  );

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${API_Url}/api/recursos/ObtenerRecursos`);
      const data = response.data;
      if (response.status === 200) {
        const uniqueTags = [...new Set(data.map(resource => resource.tag))];
        setTags(uniqueTags);
        setResources(data);
      }

     
    } catch (error) {
      const errorMessage = error.response.data.msg || error.message;
      console.error(error);
      Toast.show({
        type: "error",
        text2: errorMessage,
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  }
  const handleTagPress = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  const handleResourcePress = (resource) => {
    setSelectedResource(resource);
    setModalVisible(true);
  };

  const getIconName = (tag) => {
    switch (tag) {
      case "Podcast":
        return "headset";
      case "Cursos":
        return "school";
      case "Audiolibros":
        return "book";
      case "Recreativo":
        return "color-palette";
      default:
        return "document";
    }
  };

  const filteredResources = selectedTag
    ? resources.filter((resource) => resource.tag === selectedTag)
    : resources;
  if(isLoading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Vista que contiene solo el encabezado */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recursos de ayuda</Text>
        </View>
        <Divider color="black" />
      </SafeAreaView>
      {/* ScrollView de los tags, separado del SafeAreaView */}
      <ScrollView horizontal={true} style={styles.tagContainer}>
        {tags.map((item, index) => (
          <Button
            key={index}
            title={item}
            buttonStyle={[
              styles.tagButton,
              selectedTag === item && styles.selectedTagButton,
            ]}
            onPress={() => handleTagPress(item)}
          />
        ))}
      </ScrollView>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredResources}
          renderItem={({ item }) => (
            <Resource
              handleResourcePress={handleResourcePress}
              item={item}
              getIconName={getIconName}
            />
          )}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              No hay recursos disponibles
            </Text>
          }
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <ResourceModal
        modalVisible={modalVisible}
        selectedResource={selectedResource}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  safeArea: {
    backgroundColor: "#fff", // Fondo blanco para la SafeAreaView
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Fondo blanco solo para el encabezado
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  tagContainer: {
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: "#E8EAED", // Color original para la sección de tags
  },
  tagButton: {
    backgroundColor: "#a78bfa",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  selectedTagButton: {
    backgroundColor: "#fb923c",
  },
  listContainer: {
    height: "83%",
  },
  separator: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 5,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
  },
  flatListContent: {
    paddingBottom: 20, // Ajuste para agregar espacio debajo de la lista
  },
});
