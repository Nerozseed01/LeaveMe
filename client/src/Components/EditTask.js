import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";

export default function EditTask({ _id, actividad, toggleDelete }) {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container} key={_id}>
      <Text style={styles.activityText}>{actividad}</Text>
      <TouchableOpacity onPress={toggleModal}>
        <MaterialIcons name="delete" size={25} color="grey" />
      </TouchableOpacity>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Actividad</Text>
                <Text style={styles.modalText}>
                  ¿Seguro que quieres eliminar la actividad?
                </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Eliminar"
                    type="clear"
                    titleStyle={styles.deleteButton}
                    onPress={() => {
                      toggleDelete(_id, actividad);
                      toggleModal();
                    }}
                  />
                  <Button
                    title="Cancelar"
                    type="clear"
                    titleStyle={styles.cancelButton}
                    onPress={toggleModal}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
  },
  activityText: {
    textAlign: 'center',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#E6E6FA',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    color: '#333333',
    fontSize: 20,
    marginBottom: 10,
  },
  modalText: {
    color: '#666666',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    color: 'red',
    fontSize: 20,
    marginRight: 20,
  },
  cancelButton: {
    color: '#3b82f6',
    fontSize: 20,
  },
});