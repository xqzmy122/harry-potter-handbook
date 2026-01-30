import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { PotionsScreenNavigationProp } from "../../navigation/types";

export function SpellsScreen() {
  const navigation = useNavigation<PotionsScreenNavigationProp>();

  return (
    <View>
      <Text>Spells will be here</Text>
      <Button onPress={() => navigation.navigate("Potions")}>Go to potions</Button>
    </View>
  );
}
