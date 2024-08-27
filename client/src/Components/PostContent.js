import React, { useContext,useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/authContext";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";
const FILENAME = "profilepic.jpg";

const postActions = (comments, likes, addLike, idPost) => {
  const theme = useColorScheme();
  return (
    <View style={[styles.rowActions, styles.actionBar]}>
      <View style={styles.elemAction}>
        <EvilIcons
          style={styles.actionButton}
          name="comment"
          size={21}
          color={theme === "dark" ? "gray" : "#000"}
        />
        <Text style={styles.actionText}>{comments}</Text>
      </View>
      <View style={styles.elemAction}>
        <TouchableOpacity onPress={(event) => addLike(event, idPost)}>
          <EvilIcons
            style={styles.actionButton}
            name="heart"
            size={21}
            color={theme === "dark" ? "gray" : "#000"}
          />
        </TouchableOpacity>
        <Text style={styles.actionText}>{likes}</Text>
      </View>
    </View>
  );
};

const avatar = author => {
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

const PostContent = ({ post, onLikeToggle }) => {
  const { idUser } = useContext(AuthContext);
  const theme = useColorScheme();

  const handleLikePress = (event, idPost) => {
    event.stopPropagation(); // Previene que el evento se propague al Pressable padre
    onLikeToggle(idPost, idUser);
  };

  useEffect(() => {
    fetchPhoto();
  }, [post]);

  const fetchPhoto = async () => {
    try {
      const exist = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + FILENAME
      );
      console.log(exist.exists)
      if (exist.exists && post.usuario.id == idUser) {
        post.usuario.avatar = exist.uri;
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "No se pudo obtener la foto del usuario",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  return (
    <View style={styles.singleItem}>
      <View style={styles.row}>
        {avatar(post.usuario.avatar)}
        <View style={styles.postContentContainer}>
          <View style={styles.rowTop}>
            <Text
              numberOfLines={1}
              style={[
                styles.header,
                { color: theme === "dark" ? "#FFF" : "#000" },
              ]}
            >
              {post.usuario.nombreCompleto}
            </Text>
            <GrayText>{post.post.time}</GrayText>
          </View>
          <Text
            style={[
              styles.description,
              { color: theme === "dark" ? "#FFF" : "#000" },
            ]}
          >
            {post.post.descripcion}
          </Text>
          <View style={styles.rowActions}>
            {postActions(
              post.post.numComentarios,
              post.post.megusta,
              handleLikePress,
              post.post.id
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionBar: {
    marginTop: 8,
    justifyContent: "flex-start",
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
    marginRight: 16,
    flexShrink: 0,
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
    paddingHorizontal: 16,
    minHeight: 44,
    flex: 1,
    padding: 16,
  },
  rowTop: {
    flexDirection: "row",
  },
  rowActions: {
    flexGrow: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
  elemAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 24,
  },
  actionText: {
    fontSize: 12,
    color: "#444",
  },
  postContentContainer: {
    flexShrink: 1,
    flexGrow: 1,
  },
});

export default PostContent;