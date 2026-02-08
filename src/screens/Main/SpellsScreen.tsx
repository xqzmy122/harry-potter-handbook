import { View, FlatList, StyleSheet } from "react-native";
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
  const { status, data, execute } = useFetch<ICard>(async () => {
    const spells = await getSpellsByPage(page, debouncedSearch);
    return spells.map(mapSpellToCard);
  });

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
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

  function handleLoadMore() {
    setPage(prev => prev + 1);
  }

  const listFooter = useMemo(
    () => (status === "loading" ? <Loader text="Loading more spells..." /> : null),
    [status],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Search value={search} onChange={setSearch} />
      <FlatList
        data={data?.filter(item =>
          item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <DetailCardItem item={item} type="spell" />}
        ListFooterComponent={listFooter}
        contentContainerStyle={styles.list}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
      />
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
});
