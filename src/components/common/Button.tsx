import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type ButtonProps = {
    variant : 'primary' | 'secondary' | 'outlined';
    title: string;
    onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({title, variant, onPress}) => {
  return (
    <TouchableOpacity
          onPress={onPress}
          className="bg-primary py-4.5 rounded-2xl items-center"
        >
          <Text className="text-text-inverse text-lg font-semibold">{title}</Text>
        </TouchableOpacity>
  )
}

export default Button