import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SpellsScreen } from "../screens/Main/SpellsScreen";
import { PotionsScreen } from "../screens/Main/PotionsScreen";
import SpellIcon from "../assets/spell.svg";
import PotionIcon from "../assets/potion.svg";

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Spells"
        component={SpellsScreen}
        options={{ tabBarIcon: () => <SpellIcon /> }}
      />
      <Tab.Screen
        name="Potions"
        component={PotionsScreen}
        options={{ tabBarIcon: () => <PotionIcon /> }}
      />
    </Tab.Navigator>
  );
}
