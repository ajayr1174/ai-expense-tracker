import {
  View,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { useRef, useState } from 'react';

import OnboardingItem from '../../components/onboarding/OnboardingItem';
import Pagination from '../../components/onboarding/Pagination';
import { Button } from '../../components/common/Button';
import { routes } from '@/constants/routes';

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
      navigation.replace(routes.root.auth);
    }
  };

  const handleSkip = () => {
    navigation.replace(routes.root.auth);
  };

  return (
    <View className="flex-1 px-3 py-4 gap-4">
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

      <View className="flex-1 gap-4 py-4 justify-end">
        <Pagination currentIndex={currentIndex} total={onboardingData.length} />

        <View className="mt-7.5">
          <Button
            title={
              currentIndex === onboardingData.length - 1
                ? 'Get Started'
                : 'Next'
            }
            onPress={handleNext}
            width="full"
            variant="primary"
          />
        </View>

        {currentIndex !== onboardingData.length - 1 && (
          <Button
            onPress={handleSkip}
            className="border-none text-text-muted"
            title="Skip"
            width="full"
            variant="link"
          ></Button>
        )}
      </View>
    </View>
  );
}
