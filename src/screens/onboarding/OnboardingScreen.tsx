import {
  View,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  Text,
} from 'react-native';

import { useRef, useState } from 'react';

import OnboardingItem from '../../components/onboarding/OnboardingItem';
import Pagination from '../../components/onboarding/Pagination';
import NextButton from '../../components/onboarding/NextButton';

import { onboardingData } from './onboarding.data';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.replace('Auth');
    }
  };

  const handleSkip = () => {
    navigation.replace('Auth');
  };

  return (
    <View className="flex-1">
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      <View className="px-6 pb-10">
        <Pagination currentIndex={currentIndex} total={onboardingData.length} />

        <View className="mt-7.5">
          <NextButton
            title={
              currentIndex === onboardingData.length - 1
                ? 'Get Started'
                : 'Next'
            }
            onPress={handleNext}
          />
        </View>

        {currentIndex !== onboardingData.length - 1 && (
          <TouchableOpacity
            onPress={handleSkip}
            className="mt-4.5 items-center"
          >
            <Text className="text-text-secondary text-base font-medium">
              Skip
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
