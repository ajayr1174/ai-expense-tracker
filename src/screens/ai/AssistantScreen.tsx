import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const initialMessages = [
  {
    id: '1',
    from: 'assistant',
    text: 'Hi there! Ask me anything about your spending.',
  },
];

export default function AssistantScreen() {
  const navigation = useNavigation<any>();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: `${Date.now()}-user`,
      from: 'user',
      text: input.trim(),
    };
    const assistantMessage = {
      id: `${Date.now()}-assistant`,
      from: 'assistant',
      text: 'I found 4 transactions on food and dining this month, totaling ₹8,450.',
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <ScreenWrapper className="flex-1 bg-background" noScroll>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="px-6 pt-8 flex-1">
          <View className="flex-row items-center justify-between mb-4">
            <Text variant="h4" weight="bold" color="primary">
              AI Assistant
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="rounded-2xl bg-surface p-3"
            >
              <Ionicons name="close" size={20} color="#7C4DFF" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                className={`mb-3 rounded-3xl px-4 py-4 ${
                  item.from === 'assistant' ? 'bg-surface' : 'bg-primary'
                }`}
              >
                <Text color={item.from === 'assistant' ? 'primary' : 'inverse'}>
                  {item.text}
                </Text>
              </View>
            )}
          />
        </View>

        <View className="border-t border-border bg-surface p-4">
          <View className="flex-row items-center gap-3">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask how much you spent this month..."
              placeholderTextColor="#7C7C94"
              className="flex-1 rounded-3xl bg-white px-4 py-3 text-base text-text-primary"
            />
            <TouchableOpacity
              onPress={handleSend}
              className="rounded-full bg-primary p-3"
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
