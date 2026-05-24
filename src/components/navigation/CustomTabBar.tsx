import { View, StyleSheet } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { routes } from '@/constants/routes';
import TabBarButton from './TabBarButton';

import FloatingAddButton from './FloatingTabButton';

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          if (route.name === routes.tabs.addExpense) {
            return <FloatingAddButton key={route.key} onPress={onPress} />;
          }

          let iconName = 'home-outline';

          switch (route.name) {
            case routes.tabs.dashboard:
              iconName = isFocused ? 'home' : 'home-outline';
              break;

            case routes.tabs.insights:
              iconName = isFocused ? 'bar-chart' : 'bar-chart-outline';
              break;

            case routes.tabs.expenses:
              iconName = isFocused ? 'wallet' : 'wallet-outline';
              break;

            case routes.tabs.profile:
              iconName = isFocused ? 'person' : 'person-outline';
              break;
          }

          return (
            <TabBarButton
              key={route.key}
              label={route.name}
              icon={iconName}
              focused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',

    bottom: 24,
    left: 20,
    right: 20,
  },

  container: {
    flexDirection: 'row',

    height: 78,

    backgroundColor: 'rgba(255,255,255,0.92)',

    borderRadius: 28,

    alignItems: 'center',

    paddingHorizontal: 10,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 10,
    },

    shadowOpacity: 0.08,

    shadowRadius: 20,

    elevation: 10,
  },
});
