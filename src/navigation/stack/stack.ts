import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SpellsScreen } from "../../screens/Main/SpellsScreen";
import { PotionsScreen } from "../../screens/Main/PotionsScreen";

export const stack = createNativeStackNavigator({
  initialRouteName: "Spells",
  screens: {
    Spells: SpellsScreen,
    Potions: PotionsScreen,
  },
});
