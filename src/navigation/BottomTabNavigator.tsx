import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '@/screens/dashboard/DashboardScreen';
import ExpensesScreen from '@/screens/expenses/ExpensesScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import InsightsScreen from '@/screens/insights/InsightsScreen';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import CustomTabBar from '@/components/navigation/CustomTabBar';
import FloatingAddButton from '@/components/navigation/FloatingTabButton';
const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />

      <Tab.Screen name="Insights" component={InsightsScreen} />

      <Tab.Screen
        name="AddExpense"
        component={ExpensesScreen}
        options={{
          tabBarButton: props => <FloatingAddButton onPress={props.onPress!} />,
        }}
      />

      <Tab.Screen name="Expenses" component={ExpensesScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
