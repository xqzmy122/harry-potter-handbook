import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";
import { useFetch } from "@services/api/useFetch";
import { ICard } from "@/types/types";
import { getAllPotions } from "@services/api/potions.service";
import { Card } from "@components/Card.tsx";
import { mapPotionToCard } from "@/helpers/mappers";
import { Loader } from "@components/Loader.tsx";
import { FilterDropdown } from "@components/FilterDropdown.tsx";

export function PotionsScreen() {
  const [selected, setSelected] = useState<string>("");

  const { status, data, execute } = useFetch<ICard>(async () => {
    const spells = await getAllPotions();
    return spells.map(mapPotionToCard);
  });

  useEffect(() => {
    execute();
  }, [execute]);

  if (status === "loading") {
    return <Loader text="Loading your magic..." />;
  }

  return (
    <View style={styles.container}>
      <FilterDropdown
        options={[
          "Beginner",
          "Begginer to Moderate",
          "Moderate to Ordinary Wizarding Level",
          "Ordinary Wizarding Level",
          "Moderate to Advanced",
          "Varies",
          "Advanced",
        ]}
        selected={selected}
        onSelect={setSelected}
      />
      <Button title="Reset Filter" onPress={() => setSelected("")} />
      <FlatList
        data={data?.filter(item => item.subtitle.includes(selected))}
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
