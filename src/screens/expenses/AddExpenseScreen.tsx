import React, { useMemo, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { routes } from '@/constants/routes';

const categories = [
  'Food & Dining',
  'Transport',
  'Shopping',
  'Bills & Utilities',
  'Health',
];

const paymentMethods = ['UPI', 'Credit Card', 'Wallet', 'Cash'];

export default function AddExpenseScreen() {
  const navigation = useNavigation<any>();
  const [mode, setMode] = useState<'manual' | 'ai'>('manual');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState('15 May 2024');
  const [description, setDescription] = useState('Dinner with friends');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [aiInput, setAiInput] = useState(
    'I spent ₹850 on food delivery at Zomato.',
  );
  const [analysis, setAnalysis] = useState('Food & Dining • ₹850 • UPI');
  const [saving, setSaving] = useState(false);

  const canSave = useMemo(() => {
    if (mode === 'manual') {
      return amount.length > 0 && description.length > 0;
    }
    return aiInput.length > 10;
  }, [aiInput, amount, description, mode]);

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    await new Promise<void>(resolve => setTimeout(() => resolve(), 900));
    setSaving(false);
    navigation.navigate(routes.tabs.expenses);
  };

  const handleAnalyze = () => {
    setAnalysis(
      'Category: Food & Dining\nAmount: ₹850\nDate: 15 May 2024\nPayment: UPI',
    );
  };

  return (
    <ScreenWrapper className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-6">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text variant="h4" weight="bold" color="primary">
                Add Expense
              </Text>
              <Text color="secondary" className="mt-1 text-sm">
                Record spending manually or with AI assistance.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-full bg-surface"
            >
              <Ionicons name="close" size={22} color="#171C33" />
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-3 mb-5">
            {['manual', 'ai'].map(option => (
              <TouchableOpacity
                key={option}
                onPress={() => setMode(option as 'manual' | 'ai')}
                className={`flex-1 px-4 py-3 rounded-2xl border ${
                  mode === option
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-surface'
                }`}
              >
                <Text
                  weight={mode === option ? 'semibold' : 'medium'}
                  color={mode === option ? 'primary' : 'secondary'}
                  className="text-center text-sm"
                >
                  {option === 'manual' ? 'Manual' : 'AI Input'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Card variant="flat" className="rounded-3xl p-5">
            {mode === 'manual' ? (
              <View className="gap-4">
                <Input
                  label="Amount"
                  placeholder="₹0.00"
                  value={amount}
                  onChange={setAmount}
                  keyboardType="numeric"
                  leadingIcon={
                    <Ionicons name="cash-outline" size={18} color="#98A2B3" />
                  }
                />

                <View>
                  <Text
                    weight="semibold"
                    color="secondary"
                    className="mb-3 text-sm"
                  >
                    Category
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {categories.map(item => (
                      <TouchableOpacity
                        key={item}
                        onPress={() => setCategory(item)}
                        className={`px-4 py-3 rounded-2xl border ${
                          category === item
                            ? 'bg-primary text-white border-primary'
                            : 'bg-surface border-border'
                        }`}
                      >
                        <Text
                          color={category === item ? 'inverse' : 'primary'}
                          className="text-sm"
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <Input
                  label="Date"
                  placeholder="15 May 2024"
                  value={date}
                  onChange={setDate}
                  leadingIcon={
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#98A2B3"
                    />
                  }
                />

                <Input
                  label="Description"
                  placeholder="What did you spend on?"
                  value={description}
                  onChange={setDescription}
                  multiline
                  numberOfLines={3}
                />

                <View>
                  <Text
                    weight="semibold"
                    color="secondary"
                    className="mb-3 text-sm"
                  >
                    Payment Method
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {paymentMethods.map(method => (
                      <TouchableOpacity
                        key={method}
                        onPress={() => setPaymentMethod(method)}
                        className={`px-4 py-3 rounded-2xl border ${
                          paymentMethod === method
                            ? 'bg-primary text-white border-primary'
                            : 'bg-surface border-border'
                        }`}
                      >
                        <Text
                          color={
                            paymentMethod === method ? 'inverse' : 'primary'
                          }
                          className="text-sm"
                        >
                          {method}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            ) : (
              <View className="gap-4">
                <Input
                  label="Describe your expense"
                  placeholder="I spent ₹850 on dinner at Zomato"
                  value={aiInput}
                  onChange={setAiInput}
                  multiline
                  numberOfLines={5}
                />

                <Button
                  title="Analyze"
                  onPress={handleAnalyze}
                  width="full"
                  variant="secondary"
                />

                {analysis.length > 0 && (
                  <View className="rounded-3xl border border-border bg-surface p-4">
                    <Text weight="semibold" color="primary" className="mb-2">
                      AI Suggestion
                    </Text>
                    <Text
                      color="secondary"
                      className="text-sm whitespace-pre-line"
                    >
                      {analysis}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </Card>

          <View className="mt-6">
            <Button
              title={mode === 'manual' ? 'Save Expense' : 'Confirm & Save'}
              onPress={handleSave}
              loading={saving}
              width="full"
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
