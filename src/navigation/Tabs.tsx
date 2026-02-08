import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SpellsScreen } from "@screens/Main/SpellsScreen";
import { PotionsScreen } from "@screens/Main/PotionsScreen";
import SpellIcon from "@assets/spell.svg";
import PotionIcon from "@assets/potion.svg";
import { useTheme } from "@/theme/ThemeContext";

const Tab = createBottomTabNavigator();

function SpellTabIcon({ color }: { color: string }) {
  return <SpellIcon color={color} />;
}

function PotionTabIcon({ color }: { color: string }) {
  return <PotionIcon color={color} />;
}

export function MyTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
        },
      }}
    >
      <Tab.Screen
        name="Spells"
        component={SpellsScreen}
        options={{
          tabBarIcon: SpellTabIcon,
        }}
      />
      <Tab.Screen
        name="Potions"
        component={PotionsScreen}
        options={{
          tabBarIcon: PotionTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}
