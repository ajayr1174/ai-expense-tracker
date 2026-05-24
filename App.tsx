/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from '@/navigation/AppNavigator';
import { queryClient } from '@/lib/queryClient';

function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView className="h-full flex-1">
          <AppNavigator />
        </SafeAreaView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
