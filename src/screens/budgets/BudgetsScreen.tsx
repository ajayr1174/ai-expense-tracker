import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { routes } from '@/constants/routes';

const budgets = [
  {
    id: '1',
    category: 'Food & Dining',
    spent: 8400,
    limit: 10000,
    progress: 84,
  },
  {
    id: '2',
    category: 'Shopping',
    spent: 5200,
    limit: 8000,
    progress: 65,
  },
  {
    id: '3',
    category: 'Transport',
    spent: 2100,
    limit: 3000,
    progress: 70,
  },
];

export default function BudgetsScreen() {
  const navigation = useNavigation<any>();

  const renderBudget = ({ item }: { item: (typeof budgets)[0] }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(routes.root.budgetDetails, { budgetId: item.id })
      }
      className="mb-4 rounded-[28px] border border-border bg-surface p-5"
    >
      <View className="flex-row justify-between items-center mb-3">
        <Text color="primary" weight="semibold">
          {item.category}
        </Text>
        <Text color="secondary" className="text-sm">
          {item.progress}%
        </Text>
      </View>
      <Text color="secondary" className="text-sm mb-3">
        ₹{item.spent.toLocaleString('en-IN')} of ₹
        {item.limit.toLocaleString('en-IN')}
      </Text>
      <View className="h-3 rounded-full bg-background-secondary overflow-hidden">
        <View
          className="h-full rounded-full bg-primary"
          style={{ width: `${item.progress}%` }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper className="flex-1 bg-background" noScroll>
      <View className="px-6 pt-8">
        <View className="flex-row items-center justify-between mb-5">
          <Text variant="h4" weight="bold" color="primary">
            Budgets
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.root.budgetDetails)}
            className="rounded-2xl bg-surface px-4 py-3"
          >
            <Ionicons name="add" size={20} color="#7C4DFF" />
          </TouchableOpacity>
        </View>

        <Text color="secondary" className="mb-5 text-sm">
          Track your spending limits and stay within budget each month.
        </Text>

        <FlatList
          data={budgets}
          renderItem={renderBudget}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </ScreenWrapper>
  );
}
