import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabParamList } from '@/navigation/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { routes } from '@/constants/routes';

type DashboardNavProp = NativeStackNavigationProp<
  BottomTabParamList,
  'Dashboard'
>;

// ─── Types ────────────────────────────────────────────────────────────────────

interface CategoryItem {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  icon: string;
  color: string;
}

interface SpendingOverview {
  total: number;
  percentageChange: number;
  trend: 'up' | 'down';
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const spendingData: SpendingOverview = {
  total: 24560,
  percentageChange: 12,
  trend: 'up',
};

const categoriesData: CategoryItem[] = [
  {
    id: '1',
    name: 'Food & Dining',
    amount: 8450,
    percentage: 34,
    icon: 'restaurant-outline',
    color: '#FF6B35',
  },
  {
    id: '2',
    name: 'Transport',
    amount: 4350,
    percentage: 18,
    icon: 'car-outline',
    color: '#7C3AED',
  },
  {
    id: '3',
    name: 'Shopping',
    amount: 3250,
    percentage: 13,
    icon: 'bag-outline',
    color: '#10B981',
  },
  {
    id: '4',
    name: 'Bills & Utilities',
    amount: 2980,
    percentage: 12,
    icon: 'document-outline',
    color: '#3B82F6',
  },
];

// ─── Header component ─────────────────────────────────────────────────────────

const DashboardHeader: React.FC = () => (
  <View className="px-6 pt-4 pb-2">
    <View className="flex-row justify-between items-center mb-2">
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Open menu"
        className="p-2"
      >
        <Ionicons name="menu" size={24} color="#171C33" />
      </TouchableOpacity>

      <View className="flex-row gap-3">
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          className="p-2 relative"
        >
          <Ionicons name="notifications-outline" size={24} color="#171C33" />
          {/* Notification badge */}
          <View className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Settings"
          className="p-2"
        >
          <Ionicons name="settings-outline" size={24} color="#171C33" />
        </TouchableOpacity>
      </View>
    </View>

    <Text variant="h3" color="primary" weight="bold" className="mb-1">
      Hi, John 👋
    </Text>
    <Text color="secondary" className="text-sm">
      Here's your financial overview
    </Text>
  </View>
);

// ─── Spending card component ───────────────────────────────────────────────────

interface SpendingCardProps {
  data: SpendingOverview;
}

const SpendingCard: React.FC<SpendingCardProps> = ({ data }) => {
  const formattedAmount = data.total.toLocaleString('en-IN');

  return (
    <Card
      variant="flat"
      className="mx-6 my-4 rounded-3xl overflow-hidden"
      style={{ backgroundColor: '#7C4DFF' }}
    >
      <View className="p-6 relative overflow-hidden">
        {/* Decorative blobs */}
        <View
          className="absolute w-32 h-32 rounded-full opacity-20"
          style={{
            backgroundColor: '#FFFFFF',
            top: -20,
            right: -20,
          }}
        />
        <View
          className="absolute w-24 h-24 rounded-full opacity-15"
          style={{
            backgroundColor: '#FFFFFF',
            bottom: -10,
            left: -10,
          }}
        />

        {/* Content */}
        <View className="relative z-10">
          <Text color="inverse" weight="medium" className="text-sm opacity-90">
            Total Spending
          </Text>

          <View className="flex-row items-baseline justify-between mt-3 mb-4">
            <Text
              color="inverse"
              weight="bold"
              className="text-4xl"
              style={{ fontFamily: 'System' }}
            >
              ₹{formattedAmount}
            </Text>
          </View>

          {/* Trend indicator */}
          <View className="flex-row items-center gap-1">
            <Ionicons
              name={
                data.trend === 'up' ? 'arrow-up-outline' : 'arrow-down-outline'
              }
              size={14}
              color={data.trend === 'up' ? '#4EE071' : '#FF6B6B'}
            />
            <Text
              color="inverse"
              weight="medium"
              className="text-sm"
              style={{
                color: data.trend === 'up' ? '#4EE071' : '#FF6B6B',
              }}
            >
              {data.percentageChange}% vs last month
            </Text>
          </View>
        </View>

        {/* Wave chart placeholder */}
        <View className="mt-6 h-12 relative">
          <View
            className="absolute inset-0 opacity-40"
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#FFFFFF',
              borderRadius: 50,
              transform: [{ scaleY: 0.3 }],
            }}
          />
        </View>
      </View>
    </Card>
  );
};

// ─── Category item component ───────────────────────────────────────────────────

interface CategoryItemProps {
  item: CategoryItem;
}

const CategoryListItem: React.FC<CategoryItemProps> = ({ item }) => {
  const formattedAmount = item.amount.toLocaleString('en-IN');

  return (
    <TouchableOpacity
      className="px-6 py-4 flex-row items-center justify-between border-b border-border"
      accessibilityRole="button"
      accessibilityLabel={`${item.name} category`}
    >
      {/* Icon and name */}
      <View className="flex-row items-center flex-1 gap-3">
        <View
          className="w-12 h-12 rounded-2xl items-center justify-center"
          style={{ backgroundColor: `${item.color}20` }}
        >
          <Ionicons name={item.icon as any} size={24} color={item.color} />
        </View>

        <View className="flex-1">
          <Text color="primary" weight="medium" className="text-sm">
            {item.name}
          </Text>
        </View>
      </View>

      {/* Amount and percentage */}
      <View className="items-end gap-1">
        <Text color="primary" weight="bold" className="text-sm">
          ₹{formattedAmount}
        </Text>
        <Text color="muted" className="text-xs">
          ({item.percentage}%)
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ─── Category list header ──────────────────────────────────────────────────────

const CategoryListHeader: React.FC = () => (
  <View className="px-6 py-4 flex-row items-center justify-between">
    <Text variant="h4" color="primary" weight="bold">
      Top Categories
    </Text>
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="See all categories"
    >
      <Text color="primary" weight="semibold" className="text-sm">
        See All
      </Text>
    </TouchableOpacity>
  </View>
);

// ─── Main component ───────────────────────────────────────────────────────────

export default function DashboardScreen() {
  const navigation = useNavigation<DashboardNavProp>();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch fresh data from API
    // await expenseService.getExpenses();
    await new Promise(resolve => setTimeout(() => resolve(undefined), 1500));
    setRefreshing(false);
  };

  const renderCategoryItem: ListRenderItem<CategoryItem> = ({ item }) => (
    <CategoryListItem item={item} />
  );

  return (
    <ScreenWrapper className="flex-1 bg-background" noScroll>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#7C4DFF"
          />
        }
        scrollEventThrottle={16}
      >
        {/* Header */}
        <DashboardHeader />

        {/* Spending overview card */}
        <SpendingCard data={spendingData} />

        {/* Top categories section */}
        <View className="mt-2">
          <CategoryListHeader />

          <FlatList
            data={categoriesData}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => null}
          />

          {/* View all button */}
          <TouchableOpacity
            className="mx-6 my-4 py-3 rounded-xl bg-surface border border-border items-center"
            onPress={() => navigation.navigate(routes.tabs.expenses)}
            accessibilityRole="button"
            accessibilityLabel="View all expenses"
          >
            <Text color="primary" weight="semibold" className="text-sm">
              View All Expenses
            </Text>
          </TouchableOpacity>
        </View>

        {/* Extra spacing for tab bar */}
        <View className="h-6" />
      </ScrollView>
    </ScreenWrapper>
  );
}
