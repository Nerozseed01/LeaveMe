import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import PostContent from "./PostContent";

const Post = ({ post, onLikeToggle }) => {
  const navigation = useNavigation();

  const handleLikeToggle = (postId, userId) => {
    // Prevenir la navegación al presionar el botón de like
    onLikeToggle(postId, userId);
  };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Details", { post });
      }}
    >
      <PostContent post={post} onLikeToggle={handleLikeToggle} />
    </Pressable>
  );
};

export default Post;