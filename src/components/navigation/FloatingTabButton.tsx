import { TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FloatingAddButton({
  onPress,
}: {
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#6D28D9',

          justifyContent: 'center',
          alignItems: 'center',

          shadowColor: '#6D28D9',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.4,
          shadowRadius: 10,

          elevation: 12,
        }}
      >
        <Ionicons name="add" size={34} color="white" />
      </View>
    </TouchableOpacity>
  );
}
