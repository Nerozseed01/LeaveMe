import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "@rneui/base";

const SkeletonCreatePost = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.closeButton} />
          <View style={styles.titlePlaceholder} />
        </View>
        <Divider />

        <ScrollView style={styles.scrollView}>
          <View style={styles.userInfoContainer}>
            <View style={styles.avatarPlaceholder} />
            <View style={styles.usernamePlaceholder} />
          </View>
          <View style={styles.textInputPlaceholder} />
          <View style={styles.characterCounter} />
        </ScrollView>

        <View style={styles.fabPlaceholder} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  closeButton: {
    width: 30,
    height: 30,
    backgroundColor: "#CCCCCC",
    borderRadius: 15,
  },
  titlePlaceholder: {
    width: 120,
    height: 24,
    backgroundColor: "#CCCCCC",
    borderRadius: 4,
  },
  scrollView: {
    backgroundColor: "#E8EAED",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 8,
    marginTop: 8,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    backgroundColor: "#CCCCCC",
    borderRadius: 22,
  },
  usernamePlaceholder: {
    width: 120,
    height: 20,
    backgroundColor: "#CCCCCC",
    marginLeft: 8,
    borderRadius: 4,
  },
  textInputPlaceholder: {
    height: 160,
    backgroundColor: "#CCCCCC",
    marginLeft: 40,
    marginRight: 16,
    borderRadius: 8,
  },
  characterCounter: {
    width: 60,
    height: 20,
    backgroundColor: "#CCCCCC",
    alignSelf: "flex-end",
    marginRight: 16,
    marginTop: 8,
    borderRadius: 4,
  },
  fabPlaceholder: {
    width: 120,
    height: 40,
    backgroundColor: "#CCCCCC",
    borderRadius: 20,
    alignSelf: "flex-end",
    margin: 16,
  },
});

export default SkeletonCreatePost;