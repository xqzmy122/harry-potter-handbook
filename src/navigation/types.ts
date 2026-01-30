import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Spells: undefined;
  Potions: undefined;
};

export type PotionsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
