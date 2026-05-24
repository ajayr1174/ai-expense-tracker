import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import OnboardingScreen from '@/screens/onboarding/OnboardingScreen';
import ExpenseDetailsScreen from '@/screens/expenses/ExpenseDetailsScreen';
import BudgetsScreen from '@/screens/budgets/BudgetsScreen';
import BudgetDetailsScreen from '@/screens/budgets/BudgetDetailsScreen';
import PaymentMethodsScreen from '@/screens/profile/PaymentMethodsScreen';
import AssistantScreen from '@/screens/ai/AssistantScreen';
import { routes } from '@/constants/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={routes.root.onboarding}
          component={OnboardingScreen}
        />
        <Stack.Screen name={routes.root.auth} component={AuthNavigator} />
        <Stack.Screen
          name={routes.root.mainTabs}
          component={BottomTabNavigator}
        />
        <Stack.Screen
          name={routes.root.expenseDetails}
          component={ExpenseDetailsScreen}
        />
        <Stack.Screen name={routes.root.budgets} component={BudgetsScreen} />
        <Stack.Screen
          name={routes.root.budgetDetails}
          component={BudgetDetailsScreen}
        />
        <Stack.Screen
          name={routes.root.paymentMethods}
          component={PaymentMethodsScreen}
        />
        <Stack.Screen
          name={routes.root.assistant}
          component={AssistantScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
