import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";
import { useFetch } from "@services/api/useFetch";
import { ICard } from "@/types/types";
import { getPotionsByPage } from "@services/api/potions.service";
import { Card } from "@components/Card.tsx";
import { mapPotionToCard } from "@/helpers/mappers";
import { Loader } from "@components/Loader.tsx";
import { FilterDropdown } from "@components/FilterDropdown.tsx";

export function PotionsScreen() {
  const [selected, setSelected] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { status, data, execute } = useFetch<ICard>(async () => {
    const potions = await getPotionsByPage(page);
    return potions.map(mapPotionToCard);
  });

  useEffect(() => {
    execute();
  }, [execute, page]);

  function handleLoadMore() {
    setPage(prev => prev + 1);
  }

  const loader = () => {
    return status === "loading" ? <Loader text="Loading more potions..." /> : null;
  };

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
        ListFooterComponent={loader}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
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
