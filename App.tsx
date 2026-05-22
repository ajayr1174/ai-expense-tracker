/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './global.css';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import AppNavigator from '@/navigation/AppNavigator';

function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);
  return (
      <SafeAreaProvider>
        <SafeAreaView className="bg-primary h-full flex-1">
          <AppNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

export default App;
