import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFetch } from "@services/api/useFetch";
import { ICard } from "@/types/types";
import { getPotionsByPage } from "@services/api/potions.service";
import { Card } from "@components/Card";
import { mapPotionToCard } from "@/helpers/mappers";
import { Loader } from "@components/Loader";
import { FilterDropdown } from "@components/FilterDropdown";
import { RootStackParamList } from "@navigation/types";
import { colors } from "@/theme/colors";

export function PotionsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
      <View style={styles.filtersRow}>
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
        <Pressable
          style={styles.resetButton}
          onPress={() => setSelected("")}
        >
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>
      <FlatList
        data={data?.filter(item => item.subtitle.includes(selected))}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            onPress={() => navigation.navigate("Detail", { type: "potion", id: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        ListFooterComponent={loader}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  resetText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: "500",
  },
  list: {
    paddingVertical: 12,
  },
});
