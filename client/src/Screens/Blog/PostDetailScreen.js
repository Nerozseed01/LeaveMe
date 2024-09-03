import React, { useState, useCallback, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import {
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import PostContent from "../../Components/PostContent";
import { Divider } from "@rneui/base";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Comment from "../../Components/comment";
import axios from "axios";
import Toast from "react-native-toast-message";
import Esqueleto from "../../Components/SqueletonFeed";
import { AuthContext } from "../../context/authContext";

const API_Url = process.env.EXPO_PUBLIC_API_URL;


const PostDetailScreen = () => {
  const route = useRoute();
  const [postData, setPostData] = useState(route.params.post);
  const [newComment, setNewComment] = useState("");
  const { idUser } = useContext(AuthContext);
  const [isPublishing, setIsPublishing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [commentsData, setCommentsData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchComments();
    }, [])
  );

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${API_Url}/api/posts/MostrarPost/${postData.post.id}`
      );

      const data = response.data;
      const status = response.status;

      if (status === 200 && data.length >= 0) {
        setCommentsData(data);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || error.message;
      Toast.show({
        type: "error",
        text2: errorMessage,
        visibilityTime: 2000,
        autoHide: true,
        props: {
          numberOfLines: 0,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim().length === 0) {
      Toast.show({
        type: "error",
        text2: "No se puede publicar comentarios en blanco.",
        visibilityTime: 8000, // milisegundos
        autoHide: true,
      });
      return;
    }
    setIsPublishing(true);
    try {
      const response = await axios.post(
        `${API_Url}/api/posts/AgregarComentario`,
        {
          idPost: postData.post.id,
          idUser,
          comentario: newComment,
        }
      );
      const data = response.data;
      const status = response.status;
      if (status === 201) {
        Toast.show({
          type: "success",
          text1: "Comentario publicado correctamente.",
          visibilityTime: 2000, // milisegundos
          autoHide: true,
        });
        setCommentsData([data, ...commentsData]); // Añadir el nuevo comentario al principio de la lista
      }
    } catch (error) {
      const errorMessage = error.response.data.msg || error.message;
      Toast.show({
        type: "error",
        text2: errorMessage,
        visibilityTime: 2000, // milisegundos
        autoHide: true,
        props: {
          numberOfLines: 0,
        },
      });
    } finally {
      setIsPublishing(false);
      setNewComment("");
    }
  };

  const handleLikeToggle = async (idPost, userId) => {
    try {
      const response = await axios.post(`${API_Url}/api/posts/AgregarLike`, {
        idUser: userId,
        idPost: idPost,
      });

      if (response.status === 200) {
        setPostData(prevPost => {
          const updatedPost = { ...prevPost };
          updatedPost.post = { ...updatedPost.post };

          if (!Array.isArray(updatedPost.post.likes)) {
            updatedPost.post.likes = [];
          }

          const userLiked = updatedPost.post.likes.includes(userId);

          if (userLiked) {
            updatedPost.post.likes = updatedPost.post.likes.filter(
              id => id !== userId
            );
            updatedPost.post.megusta = Math.max(
              0,
              updatedPost.post.megusta - 1
            );
          } else {
            updatedPost.post.likes.push(userId);
            updatedPost.post.megusta += 1;
          }

          return updatedPost;
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text2: "Error al actualizar el like",
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 50}
    >
      {loading ? (
        <Esqueleto />
      ) : (
        <>
          <FlatList
            data={commentsData}
            renderItem={({ item }) => <Comment comment={item} />}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => (
              <>
                <View className="flex flex-row justify-between items-center mb-4">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="ml-1"
                  >
                    <AntDesign name="left" size={25} color="black" />
                  </TouchableOpacity>
                  <View className="flex-grow justify-center items-center pr-8">
                    <Text className="text-black text-xl font-bold">
                      Detalles del Post
                    </Text>
                  </View>
                </View>
                <Divider />
                <PostContent post={postData} onLikeToggle={handleLikeToggle} />
                <Divider />
                <View style={styles.commentsSection}>
                  <Text style={styles.commentsSectionTitle}>Comentarios</Text>
                </View>
              </>
            )}
            contentContainerStyle={styles.flatListContent}
            ItemSeparatorComponent={() => <Divider />}
          />
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Escribe un comentario..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity
              onPress={handleAddComment}
              style={[
                styles.sendButton,
                isPublishing ? styles.sendButtonDisabled : null,
              ]}
              disabled={isPublishing}
            >
              {isPublishing ? (
                <ActivityIndicator size="small" color="#F97316" />
              ) : (
                <Feather name="send" size={24} color="#F97316" />
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
      {isPublishing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1DA1F2" />
          <Text style={styles.loadingText}>Publicando...</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "15%",
  },
  flatListContent: {
    flexGrow: 1,
  },
  commentsSection: {
    padding: 16,
  },
  commentsSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  commentItem: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  commentContent: {
    fontSize: 14,
  },
  commentInputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1DA1F2",
    marginTop: 12,
  },
});

export default PostDetailScreen;
