import React, { useState } from 'react';
import { View, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

const categories = [
  'Food & Dining',
  'Shopping',
  'Transport',
  'Entertainment',
  'Bills & Utilities',
];

export default function BudgetDetailsScreen() {
  const navigation = useNavigation<any>();
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState('10000');
  const [period, setPeriod] = useState('Monthly');
  const [notify, setNotify] = useState(true);

  return (
    <ScreenWrapper className="flex-1 bg-background">
      <View className="px-6 pt-8 pb-10 gap-5">
        <View className="flex-row items-center justify-between mb-3">
          <Text variant="h4" weight="bold" color="primary">
            Set budget
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-2xl bg-surface p-3"
          >
            <Text color="primary" weight="semibold">
              Close
            </Text>
          </TouchableOpacity>
        </View>

        <Card variant="flat" className="rounded-3xl p-5">
          <Text color="secondary" className="mb-4 text-sm">
            Define a spending limit for the category and get alerts when you
            near it.
          </Text>

          <Input
            label="Category"
            placeholder="Select category"
            value={category}
            onChange={setCategory}
          />

          <Input
            label="Budget amount"
            placeholder="₹10,000"
            value={amount}
            onChange={setAmount}
            keyboardType="numeric"
          />

          <Input
            label="Period"
            placeholder="Monthly"
            value={period}
            onChange={setPeriod}
          />

          <View className="flex-row items-center justify-between mt-4">
            <View>
              <Text color="primary" weight="semibold">
                Notify me when I reach 80%
              </Text>
              <Text color="secondary" className="text-sm">
                Stay on top of your budget.
              </Text>
            </View>
            <Switch value={notify} onValueChange={setNotify} />
          </View>
        </Card>

        <View className="mt-4">
          <Button
            title="Save Budget"
            onPress={() => navigation.goBack()}
            width="full"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
