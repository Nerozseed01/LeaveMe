import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";

const avatar = (author) => {
  const imageUrl = author;
  return <Image style={styles.avatar} source={{ uri: imageUrl }} />;
};
const GrayText = ({ children, numberOfLines, style }) => {
    return (
      <Text style={[style, styles.gray]} numberOfLines={numberOfLines}>
        {children}
      </Text>
    );
  };

const Comment = ({ comment }) => {
  const theme = useColorScheme();

  return (
    <View style={styles.singleItem}>
      <View style={styles.row}>
        {avatar(comment.usuario.avatar)}
        <View style={styles.postContentContainer}>
          <View style={styles.rowTop}>
            <Text
              numberOfLines={1}
              style={[
                styles.header,
                { color: theme === "dark" ? "#FFF" : "#000" },
              ]}
            >
              {comment.usuario.nombre}
            </Text>
            <GrayText>{comment.time}</GrayText>
          </View>
          <Text
            style={[
              styles.description,
              { color: theme === "dark" ? "#FFF" : "#000" },
            ]}
          >
            {comment.contenido}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  author: {
    flexShrink: 1,
  },
  actionBar: {
    marginTop: 8,
    justifyContent: "flex-start", // Cambiado de space-between a flex-start
    marginRight: 16,
  },
  actionButton: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  gray: {
    color: "#777",
    fontSize: 13,
    paddingRight: 2,
  },
  avatar: {
    height: 44,
    width: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 4,
    paddingRight: 4,
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#000",
  },
  singleItem: {
    paddingHorizontal: 30,
    minHeight: 44,
    flex: 1,
    padding: 16,
  },
  rowTop: {
    flexDirection: "row",
  },
  rowActions: {
    flexGrow: 1,
    justifyContent: "flex-start", // Cambiado de space-between a flex-start
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },

  postContentContainer: {
    flexShrink: 1,
    flexGrow: 1,
  },
});

export default Comment;
