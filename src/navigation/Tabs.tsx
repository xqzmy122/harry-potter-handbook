import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SpellsScreen } from "@screens/Main/SpellsScreen";
import { PotionsScreen } from "@screens/Main/PotionsScreen";
import SpellIcon from "@assets/spell.svg";
import PotionIcon from "@assets/potion.svg";

const Tab = createBottomTabNavigator();

function SpellTabIcon() {
  return <SpellIcon />;
}

function PotionTabIcon() {
  return <PotionIcon />;
}

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Spells" component={SpellsScreen} options={{ tabBarIcon: SpellTabIcon }} />
      <Tab.Screen
        name="Potions"
        component={PotionsScreen}
        options={{ tabBarIcon: PotionTabIcon }}
      />
    </Tab.Navigator>
  );
}
