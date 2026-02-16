import { View, FlatList, Pressable, StyleSheet, Text } from "react-native";
import { useEffect, useState, useRef, useMemo } from "react";
import { useFetch } from "@services/api/useFetch";
import { ICard } from "@/types/types";
import { DetailCardItem } from "@components/DetailCardItem";
import { mapSpellToCard } from "@helpers/mappers";
import { Loader } from "@components/Loader";
import { Search } from "@components/Search";
import { useDebounce } from "@hooks/useDebounce";
import { getSpellsByPage } from "@services/api/spells.service";
import { useTheme } from "@/theme/ThemeContext";

export function SpellsScreen() {
  const { theme } = useTheme();
  const { status, data, error, execute } = useFetch<ICard>(async () => {
    const spells = await getSpellsByPage(page, debouncedSearch);
    return spells.map(mapSpellToCard);
  });

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debouncedSearch = useDebounce(search, 300);
  const lastFetchedSearchRef = useRef(debouncedSearch);

  useEffect(() => {
    if (lastFetchedSearchRef.current !== debouncedSearch) {
      setPage(1);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    const searchChanged = lastFetchedSearchRef.current !== debouncedSearch;
    if (searchChanged && page !== 1) return;
    lastFetchedSearchRef.current = debouncedSearch;
    execute(page === 1);
  }, [execute, debouncedSearch, page]);

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
        <Loader text="Loading more spells..." />
      ) : null,
    [status, isLoadingMore],
  );

  const isError = status === "error";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Search value={search} onChange={setSearch} />
      {isError ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorTitle, { color: theme.error }]}>Failed to load spells</Text>
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
          data={
            data?.filter(item =>
              item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
            ) ?? []
          }
          keyExtractor={item => item.id}
          renderItem={({ item }) => <DetailCardItem item={item} type="spell" />}
          ListFooterComponent={listFooter}
          contentContainerStyle={styles.list}
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
