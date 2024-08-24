import { View, Text,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from'react-native-safe-area-context'



export default function Welcome() {
  return (
    <SafeAreaView className="flex-1  bg-purple-400"  >
      <View className="flex-1 flex justify-center my-4 mb-8  bg-purple-400" >
        <View className=" flex-row justify-center bottom-1 shadow-lg shadow-orange-500/50">
          <Text className="text-black font-bold text-4xl ">Leve</Text>
          <Text className=" font-bold text-orange-500 text-4xl">Me</Text>
          <Image
            source={require("../Assets/Icons/megafonoN.png")}
            style={{ width: 22, height: 22}}
          />
          
        </View>
        <Text
          className="text-black font-bold text-2xl text-center">
          Empieza el cambio en tu vida!
        </Text>
      </View>
     
    </SafeAreaView>
  )
}