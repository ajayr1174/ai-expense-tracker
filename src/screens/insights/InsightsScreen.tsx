import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { routes } from '@/constants/routes';

export default function InsightsScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScreenWrapper className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-6 pt-8">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text variant="h4" weight="bold" color="primary">
                Insights
              </Text>
              <Text color="secondary" className="text-sm mt-1">
                Review your spending trends and categories.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.root.assistant)}
              className="rounded-3xl bg-primary px-4 py-3"
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <Card className="rounded-[32px] p-5 mb-5 bg-primary">
            <Text color="inverse" className="text-sm opacity-90">
              This month
            </Text>
            <Text color="inverse" weight="bold" className="text-4xl mt-3">
              ₹24,560
            </Text>
            <View className="mt-4 flex-row items-center gap-2">
              <Ionicons name="trending-up" size={18} color="#4EE071" />
              <Text color="inverse" className="text-sm">
                12% more than last month
              </Text>
            </View>
          </Card>

          <Card className="rounded-[32px] p-5 mb-5">
            <View className="flex-row items-center justify-between mb-4">
              <Text color="primary" weight="semibold">
                Category insights
              </Text>
              <Text color="secondary" className="text-sm">
                This month
              </Text>
            </View>
            <View className="rounded-3xl bg-background-secondary p-4 mb-4">
              <Text color="primary" weight="semibold" className="mb-3">
                Food & Dining
              </Text>
              <View className="h-2 rounded-full bg-surface overflow-hidden">
                <View
                  className="h-full rounded-full bg-primary"
                  style={{ width: '72%' }}
                />
              </View>
              <View className="flex-row justify-between mt-3">
                <Text color="secondary" className="text-sm">
                  ₹8,450 spent
                </Text>
                <Text color="secondary" className="text-sm">
                  34%
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center">
              <Text color="secondary" className="text-sm">
                Top category
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.tabs.expenses)}
              >
                <Text color="primary" weight="semibold" className="text-sm">
                  View details
                </Text>
              </TouchableOpacity>
            </View>
          </Card>

          <Card className="rounded-[32px] p-5">
            <View className="flex-row items-center justify-between mb-4">
              <Text color="primary" weight="semibold">
                Spending comparison
              </Text>
              <Text color="secondary" className="text-sm">
                12% increase
              </Text>
            </View>
            <View className="h-44 rounded-3xl bg-background-secondary items-center justify-center">
              <Text color="secondary" className="text-sm">
                Chart preview placeholder
              </Text>
            </View>
          </Card>

          <View className="mt-6">
            <Button
              title="Ask the assistant"
              onPress={() => navigation.navigate(routes.root.assistant)}
              width="full"
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
