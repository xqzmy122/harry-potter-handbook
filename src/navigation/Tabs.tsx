import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SpellsScreen } from "../screens/Main/SpellsScreen";
import { PotionsScreen } from "../screens/Main/PotionsScreen";
import SpellIcon from "../assets/spell.svg";
import PotionIcon from "../assets/potion.svg";
import { Header } from "../components/Header.tsx";

const Tab = createBottomTabNavigator();

function SpellTabIcon() {
  return <SpellIcon />;
}

function PotionTabIcon() {
  return <PotionIcon />;
}

function HeaderComponent() {
  return <Header />;
}

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Spells"
        component={SpellsScreen}
        options={{
          tabBarIcon: SpellTabIcon,
          header: HeaderComponent,
          tabBarActiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="Potions"
        component={PotionsScreen}
        options={{ tabBarIcon: PotionTabIcon, header: HeaderComponent }}
      />
    </Tab.Navigator>
  );
}
