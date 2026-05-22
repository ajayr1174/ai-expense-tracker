import { View, Text, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type Props = {
  item: {
    title: string;
    subtitle: string;
    image: any;
  };
};

export default function OnboardingItem({ item }: Props) {
  return (
    <View className="flex-1 w-screen items-center justify-center gap-2 px-6">
      <Image
        source={item.image}
        resizeMode="contain"
        className="w-[400px] h-[400px]"
      />
      <View className='flex-1 justify-center items-center gap-2'>
        <Text className="text-3xl font-bold text-center  text-text-primary">
          {item.title}
        </Text>

        <Text className="text-xl text-center text-text-secondary">
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
}
