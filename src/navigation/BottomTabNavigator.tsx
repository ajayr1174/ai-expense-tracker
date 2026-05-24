import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '@/screens/dashboard/DashboardScreen';
import AddExpenseScreen from '@/screens/expenses/AddExpenseScreen';
import ExpensesScreen from '@/screens/expenses/ExpensesScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import InsightsScreen from '@/screens/insights/InsightsScreen';
import { routes } from '@/constants/routes';
import CustomTabBar from '@/components/navigation/CustomTabBar';
import { BottomTabParamList } from './types';
const Tab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name={routes.tabs.dashboard} component={DashboardScreen} />
      <Tab.Screen name={routes.tabs.insights} component={InsightsScreen} />
      <Tab.Screen name={routes.tabs.addExpense} component={AddExpenseScreen} />
      <Tab.Screen name={routes.tabs.expenses} component={ExpensesScreen} />
      <Tab.Screen name={routes.tabs.profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
