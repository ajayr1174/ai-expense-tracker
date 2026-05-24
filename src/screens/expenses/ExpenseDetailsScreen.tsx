import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ExpenseDetailsScreen() {
  const navigation = useNavigation<any>();

  const expense = {
    title: 'Food & Dining',
    amount: 850,
    merchant: 'Dinner with friends at Zomato',
    date: '15 May 2024',
    time: '1:30 PM',
    method: 'UPI',
    transactionId: 'UPI234567890',
  };

  return (
    <ScreenWrapper className="flex-1 bg-background">
      <View className="px-6 pt-8">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-3 rounded-2xl bg-surface"
          >
            <Ionicons name="arrow-back" size={22} color="#171C33" />
          </TouchableOpacity>
          <Text variant="h5" weight="bold" color="primary">
            Expense details
          </Text>
          <View className="w-10" />
        </View>

        <Card className="rounded-[32px] p-6 bg-primary">
          <Text
            color="inverse"
            weight="semibold"
            className="text-sm opacity-90"
          >
            {expense.title}
          </Text>
          <Text color="inverse" weight="bold" className="text-4xl mt-4">
            ₹{expense.amount}
          </Text>
          <Text color="inverse" className="mt-3 text-sm opacity-90">
            {expense.merchant}
          </Text>
        </Card>

        <Card className="rounded-[32px] p-6 mt-5">
          <View className="space-y-4">
            {[
              { label: 'Date', value: `${expense.date} • ${expense.time}` },
              { label: 'Payment method', value: expense.method },
              { label: 'Transaction ID', value: expense.transactionId },
            ].map(item => (
              <View
                key={item.label}
                className="flex-row justify-between items-center"
              >
                <Text color="secondary" className="text-sm">
                  {item.label}
                </Text>
                <Text
                  color="primary"
                  weight="semibold"
                  className="text-sm text-right"
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <View className="mt-6">
          <Button
            title="Delete Expense"
            variant="outlined"
            onPress={() => navigation.goBack()}
            width="full"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
