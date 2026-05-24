import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const paymentMethods = [
  { id: '1', title: 'UPI', subtitle: 'jane.doe@bank', current: true },
  { id: '2', title: 'HDFC Bank', subtitle: '**** 1234', current: false },
  { id: '3', title: 'ICICI Bank', subtitle: '**** 9876', current: false },
];

export default function PaymentMethodsScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScreenWrapper className="flex-1 bg-background" noScroll>
      <View className="px-6 pt-8">
        <View className="flex-row items-center justify-between mb-5">
          <Text variant="h4" weight="bold" color="primary">
            Payment methods
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-2xl bg-surface p-3"
          >
            <Ionicons name="close" size={20} color="#7C4DFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={paymentMethods}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <Card key={item.id} className="rounded-3xl p-5 mb-4">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text color="primary" weight="semibold">
                    {item.title}
                  </Text>
                  <Text color="secondary" className="text-sm mt-1">
                    {item.subtitle}
                  </Text>
                </View>
                {item.current && (
                  <View className="rounded-full bg-primary px-3 py-2">
                    <Text color="inverse" className="text-xs">
                      Default
                    </Text>
                  </View>
                )}
              </View>
            </Card>
          )}
        />

        <Button title="Add payment method" onPress={() => {}} width="full" />
      </View>
    </ScreenWrapper>
  );
}
