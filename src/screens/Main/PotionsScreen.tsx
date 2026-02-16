import { useEffect, useState, useMemo } from "react";
import { View, FlatList, StyleSheet, Pressable, Text } from "react-native";
import { useFetch } from "@services/api/useFetch";
import { ICard } from "@/types/types";
import { getPotionsByPage } from "@services/api/potions.service";
import { DetailCardItem } from "@components/DetailCardItem";
import { mapPotionToCard } from "@/helpers/mappers";
import { Loader } from "@components/Loader";
import { FilterDropdown } from "@components/FilterDropdown";
import { useTheme } from "@/theme/ThemeContext";

const POTION_DIFFICULTY_OPTIONS = [
  "Beginner",
  "Beginner to Moderate",
  "Moderate to Ordinary Wizarding Level",
  "Ordinary Wizarding Level",
  "Moderate to Advanced",
  "Varies",
  "Advanced",
] as const;

export function PotionsScreen() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { status, data, error, execute } = useFetch<ICard>(async () => {
    const potions = await getPotionsByPage(page, selected || undefined);
    return potions.map(mapPotionToCard);
  });

  useEffect(() => {
    execute(page === 1);
  }, [execute, page, selected]);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoadingMore(false);
    }
  }, [status]);

  function handleLoadMore() {
    if (status === "loading" || status === "error") return;
    setIsLoadingMore(true);
    setPage(prev => prev + 1);
  }

  const listFooter = useMemo(
    () =>
      status === "loading" && isLoadingMore ? (
        <Loader text="Loading more potions..." />
      ) : null,
    [status, isLoadingMore],
  );

  function handleSelectDifficulty(value: string) {
    setSelected(value);
    setPage(1);
  }

  function handleResetFilters() {
    setSelected("");
    setPage(1);
  }

  const isError = status === "error";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.filtersRow,
          { backgroundColor: theme.surface, borderBottomColor: theme.border },
        ]}
      >
        <FilterDropdown
          options={POTION_DIFFICULTY_OPTIONS}
          selected={selected}
          onSelect={handleSelectDifficulty}
        />
        <Pressable style={styles.resetButton} onPress={handleResetFilters}>
          <Text style={[styles.resetText, { color: theme.accent }]}>Reset</Text>
        </Pressable>
      </View>

      {isError ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorTitle, { color: theme.error }]}>Failed to load potions</Text>
          {error && (
            <Text style={[styles.errorMessage, { color: theme.textSecondary }]}>{error}</Text>
          )}
          <Pressable
            style={[styles.retryButton, { backgroundColor: theme.accent }]}
            onPress={() => execute(page === 1)}
          >
            <Text style={styles.retryButtonText}>Try again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={data ?? []}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <DetailCardItem item={item} type="potion" />}
          contentContainerStyle={styles.list}
          ListFooterComponent={listFooter}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  resetText: {
    fontSize: 14,
    fontWeight: "500",
  },
  list: {
    paddingVertical: 12,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});
