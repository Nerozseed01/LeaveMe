// Components/ResourceModal.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { Button } from "@rneui/themed";

export default function ResourceModal({
  modalVisible,
  selectedResource,
  setModalVisible,
}) {
  const openUrl = () => {
    if (selectedResource?.url) {
      Linking.openURL(selectedResource.url);
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalView}>
              <ScrollView>
                <Text style={styles.modalTitle}>{selectedResource?.titulo}</Text>
                <Text style={styles.modalTag}>
                  Categoría: {selectedResource?.tag}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedResource?.descripcion}
                </Text>
              </ScrollView>
              <Button
                title="Ir al recurso"
                onPress={() => openUrl(selectedResource?.url)}
                buttonStyle={styles.buttonClose}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalTag: {
    marginBottom: 10,
    textAlign: "center",
    fontStyle: "italic",
    color: "#4a5568",
  },
  modalDescription: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalContent: {
    marginBottom: 15,
    textAlign: "justify",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
});
