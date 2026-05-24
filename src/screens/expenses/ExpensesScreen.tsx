import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Input } from '@/components/common/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { routes } from '@/constants/routes';

const filters = [
  'All',
  'Food & Dining',
  'Transport',
  'Shopping',
  'Bills & Utilities',
];

const expenseItems = [
  {
    id: '1',
    merchant: 'Zomato',
    category: 'Food & Dining',
    amount: 850,
    label: 'Today',
    time: '1:30 PM',
  },
  {
    id: '2',
    merchant: 'Amazon',
    category: 'Shopping',
    amount: 2350,
    label: 'Today',
    time: '11:05 AM',
  },
  {
    id: '3',
    merchant: 'Electricity bill',
    category: 'Bills & Utilities',
    amount: 1200,
    label: 'Yesterday',
    time: '9:20 PM',
  },
  {
    id: '4',
    merchant: 'Uber',
    category: 'Transport',
    amount: 420,
    label: 'Yesterday',
    time: '6:45 PM',
  },
];

export default function ExpensesScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredExpenses = useMemo(() => {
    return expenseItems.filter(item => {
      const matchesFilter =
        activeFilter === 'All' || item.category === activeFilter;
      const matchesSearch =
        item.merchant.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && (!search || matchesSearch);
    });
  }, [activeFilter, search]);

  return (
    <ScreenWrapper className="flex-1 bg-background" noScroll>
      <View className="px-6 pt-8 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text variant="h4" weight="bold" color="primary">
              Expenses
            </Text>
            <Text color="secondary" className="text-sm mt-1">
              Track and manage your recent spending.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.tabs.addExpense)}
            className="rounded-3xl bg-primary px-4 py-3"
          >
            <Text color="inverse" weight="semibold">
              Add
            </Text>
          </TouchableOpacity>
        </View>

        <Input
          label="Search expenses"
          placeholder="Search by merchant or category"
          value={search}
          onChange={setSearch}
          leadingIcon={<Ionicons name="search" size={18} color="#98A2B3" />}
        />

        <View className="flex-row flex-wrap gap-2 mt-4 mb-5">
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 border ${
                activeFilter === filter
                  ? 'bg-primary border-primary'
                  : 'bg-surface border-border'
              }`}
            >
              <Text
                color={activeFilter === filter ? 'inverse' : 'primary'}
                className="text-sm"
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredExpenses}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.root.expenseDetails, {
                  expenseId: item.id,
                })
              }
              className="mb-4 rounded-[32px] border border-border bg-surface p-5"
            >
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1 pr-3">
                  <Text color="primary" weight="semibold">
                    {item.merchant}
                  </Text>
                  <Text color="secondary" className="text-sm mt-1">
                    {item.category}
                  </Text>
                </View>
                <Text color="primary" weight="bold">
                  ₹{item.amount}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <Text color="secondary" className="text-sm">
                  {item.label} • {item.time}
                </Text>
                <Text color="primary" className="text-sm">
                  View
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}
