import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { routes } from '@/constants/routes';

const settings = [
  {
    id: '1',
    title: 'Payment methods',
    subtitle: 'Manage your cards and UPI',
    screen: routes.root.paymentMethods,
    icon: 'wallet-outline',
  },
  {
    id: '2',
    title: 'Budgets',
    subtitle: 'Set spending limits',
    screen: routes.root.budgets,
    icon: 'pie-chart-outline',
  },
  {
    id: '3',
    title: 'Account settings',
    subtitle: 'Privacy, security and notifications',
    screen: routes.root.paymentMethods,
    icon: 'settings-outline',
  },
];

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScreenWrapper className="flex-1 bg-background" noScroll>
      <View className="px-6 pt-8 pb-6">
        <Card className="rounded-[32px] p-6 mb-5">
          <View className="flex-row items-center gap-4">
            <View className="w-16 h-16 rounded-3xl bg-primary items-center justify-center">
              <Ionicons name="person" size={32} color="white" />
            </View>
            <View>
              <Text variant="h4" weight="bold" color="primary">
                John Doe
              </Text>
              <Text color="secondary" className="text-sm mt-1">
                john.doe@example.com
              </Text>
            </View>
          </View>

          <View className="mt-6 grid gap-3">
            <View className="flex-row items-center justify-between rounded-3xl bg-surface p-4">
              <View>
                <Text color="secondary" className="text-sm">
                  Total expenses
                </Text>
                <Text weight="bold" color="primary" className="text-xl mt-1">
                  ₹24,560
                </Text>
              </View>
              <Text color="success" weight="semibold">
                +12%
              </Text>
            </View>
            <View className="flex-row items-center justify-between rounded-3xl bg-surface p-4">
              <View>
                <Text color="secondary" className="text-sm">
                  Transactions
                </Text>
                <Text weight="bold" color="primary" className="text-xl mt-1">
                  246
                </Text>
              </View>
              <Text color="secondary" className="text-sm">
                Since May 2024
              </Text>
            </View>
          </View>
        </Card>

        <FlatList
          data={settings}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.screen)}
              className="mb-4 rounded-[32px] border border-border bg-surface p-5"
            >
              <View className="flex-row items-center justify-between gap-3">
                <View className="flex-row items-center gap-3">
                  <View className="rounded-3xl bg-primary/10 p-3">
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color="#7C4DFF"
                    />
                  </View>
                  <View>
                    <Text color="primary" weight="semibold">
                      {item.title}
                    </Text>
                    <Text color="secondary" className="text-sm mt-1">
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#7C4DFF" />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}
