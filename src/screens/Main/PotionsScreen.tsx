import { View, FlatList, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useFetch } from "../../services/api/useFetch";
import { ICard } from "../../types/types";
import { getAllPotions } from "../../services/api/potions.service";
import { Card } from "../../components/Card";
import { mapPotionToCard } from "../../helpers/mappers";
import { Loader } from "../../components/Loader";

export function PotionsScreen() {
  const { status, data, execute } = useFetch<ICard>(async () => {
    const spells = await getAllPotions();
    return spells.map(mapPotionToCard);
  });

  useEffect(() => {
    execute();
  }, []);

  if (status === "loading") {
    return <Loader text="Loading your magic..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Card data={item} />}
        contentContainerStyle={styles.spellsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spellsList: {
    padding: 10,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    justifyContent: "center",
    flex: 1,
  },
});
