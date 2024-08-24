import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Chip } from '@rneui/themed';

const ProfileSkeleton = () => (
  <View className="flex-1 container bg-purple-400">
    <View className="flex-col justify-start items-center mb-7 pt-10">
      <View className="bg-gray-300 rounded-full w-24 h-24" />
      <View className="bg-gray-300 h-8 w-48 mt-5 rounded" />
      <View className="bg-gray-300 h-6 w-32 mt-2 rounded" />
    </View>
    <View
      className="flex-1 bg-neutral-200 px-2 pt-5 mx-auto container"
      style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
    >
      <Text className="text-2xl text-center mb-5">Tus Intereses</Text>
      <View className="flex-row flex-wrap justify-center items-center">
        {[...Array(6)].map((_, index) => (
          <View key={index} className="m-2">
            <View className="bg-gray-300 h-8 w-20 rounded-full" />
          </View>
        ))}
      </View>
      <View className="bg-gray-300 h-12 mx-7 mt-5 rounded-xl" />
      <View className="bg-gray-300 h-12 mx-7 mt-3 rounded-xl" />
    </View>
  </View>
);

export default ProfileSkeleton;