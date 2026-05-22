import { TouchableOpacity, Text, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  label: string;
  icon: string;
  focused: boolean;
  onPress: () => void;
};

export default function TabBarButton({ label, icon, focused, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Ionicons name={icon} size={24} color={focused ? '#7C3AED' : '#9CA3AF'} />

      <Text
        style={{
          marginTop: 4,
          fontSize: 12,
          fontWeight: '600',

          color: focused ? '#7C3AED' : '#9CA3AF',
        }}
      >
        {label}
      </Text>

      {focused && (
        <View
          style={{
            position: 'absolute',
            top: -8,

            width: 6,
            height: 6,

            borderRadius: 3,

            backgroundColor: '#7C3AED',
          }}
        />
      )}
    </TouchableOpacity>
  );
}
