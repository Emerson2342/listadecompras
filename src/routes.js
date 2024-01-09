import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Principal from "./Pages/Principal";
import Carrinho from "./Pages/Carrinho";
import CustomTabBar from "../components/CustomTabBar";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#121212",
        tabBarShowLabel: true,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Principal"
        component={Principal}
        options={{
          tabBarIcon: "content-paste",
        }}
      />

      <Tab.Screen
        name="Carrinho"
        component={Carrinho}
        options={{
          tabBarIcon: "mode-edit",
        }}
      />
    </Tab.Navigator>
  );
}
