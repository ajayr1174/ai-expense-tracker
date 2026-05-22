import { View, Text , TextInput} from 'react-native';

export default function LoginScreen() {
  return (
    <View className="flex-1 w-full h-full px-3 py-4 items-center justify-center gap-4 flex-col">
      <View className="w-full gap-2 ">
        <Text className="text-3xl font-bold text-text-primary text-center">
          Welcome, Back 👋
        </Text>
        <Text className="text-lg text-text-secondary text-center">
          Login to continue
        </Text>
      </View>
      <View className='w-full'>
        <TextInput className='border border-primary rounded-sm w-full'
        
        >
          FullName
        </TextInput>
      </View>
    </View>
  );
}
