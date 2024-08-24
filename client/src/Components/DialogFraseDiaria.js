import React from 'react'

export default function DialogFraseDiaria({ visible, toggleDialog, frase  }) {
  return (
    <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
    <Dialog.Title title="Frase del dia" />
    <View className="flex-1 items-center justify-center">
      <Text className="text-center text-lg">
        {frase}
      </Text>
    </View>
  </Dialog>
  )
}
