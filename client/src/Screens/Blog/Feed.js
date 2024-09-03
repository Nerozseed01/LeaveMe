import React, { useState, useCallback, useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Post from "../../Components/Post";
import { Divider, FAB } from "@rneui/base";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import Toast from "react-native-toast-message";
import Esqueleto from "../../Components/SqueletonFeed";

const API_Url = process.env.EXPO_PUBLIC_API_URL;

export default function Feed() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const { idUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (idUser) fetchPosts();
    }, [idUser])
  );

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${API_Url}/api/posts/MostrarTodosLosPosts`
      );
      const data = response.data;
      const estatus = response.status;

      if (estatus === 200 && data.length > 0) {
        const postsConLikes = data.map(post => {
          if (typeof post.post.likes === "string") {
            post.post.likes = JSON.parse(post.post.likes);
          }
          return post;
        });

        setPosts(postsConLikes);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || error.message;
      Toast.show({
        type: "error",
        text2: errorMessage,
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = async (idPost, userId) => {
    try {
      const response = await axios.post(`${API_Url}/api/posts/AgregarLike`, {
        idUser: userId,
        idPost: idPost,
      });
      
      if (response.status === 200) {
        setPosts(prevPosts => prevPosts.map(post => {
          if (post.post.id === idPost) {
            const updatedPost = { ...post };
            updatedPost.post = { ...updatedPost.post };
            
            if (!Array.isArray(updatedPost.post.likes)) {
              updatedPost.post.likes = [];
            }
            
            const userLiked = updatedPost.post.likes.includes(userId);
            
            if (userLiked) {
              updatedPost.post.likes = updatedPost.post.likes.filter(id => id !== userId);
              updatedPost.post.megusta = Math.max(0, updatedPost.post.megusta - 1);
            } else {
              updatedPost.post.likes.push(userId);
              updatedPost.post.megusta += 1;
            }
            
            return updatedPost;
          }
          return post;
        }));
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
    <SafeAreaView style={{ flex: 1 }}>
      <View className="mb-0.5">
        <Text className="text-center font-bold text-2xl mb-3">Feed</Text>
        <Divider />
      </View>
      {loading ? (
        <Esqueleto />
      ) : (
        <>
          <FlatList
            data={posts}
            keyExtractor={item => item.post.id}
            renderItem={({ item }) => (
              <Post post={item} onLikeToggle={handleLikeToggle} />
            )}
            ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
            ItemSeparatorComponent={() => <Divider />}
          />
          <FAB
            icon={{ name: "add", color: "white" }}
            color="#f97316"
            onPress={() => navigation.navigate("CreatePost")}
            size="large"
            style={styles.addButton}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    boxShadow: "0px 20px 5px rgba(0, 0, 0, 0.6)",
    elevation: 5,
  },
});