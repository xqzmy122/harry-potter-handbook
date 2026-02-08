import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SpellsScreen } from "@screens/Main/SpellsScreen";
import { PotionsScreen } from "@screens/Main/PotionsScreen";
import SpellIcon from "@assets/spell.svg";
import PotionIcon from "@assets/potion.svg";
import { colors } from "@/theme/colors";

const Tab = createBottomTabNavigator();

function SpellTabIcon({ color }: { color: string }) {
  return <SpellIcon color={color} />;
}

function PotionTabIcon({ color }: { color: string }) {
  return <PotionIcon color={color} />;
}

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Spells"
        component={SpellsScreen}
        options={{
          tabBarIcon: ({ color }) => <SpellTabIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Potions"
        component={PotionsScreen}
        options={{
          tabBarIcon: ({ color }) => <PotionTabIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
