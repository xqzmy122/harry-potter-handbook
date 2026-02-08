import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useFetch } from "@services/api/useFetch";
import { ICard } from "@/types/types";
import { Card } from "@components/Card";
import { mapSpellToCard } from "@helpers/mappers";
import { Loader } from "@components/Loader";
import { Search } from "@components/Search.tsx";
import { useDebounce } from "@hooks/useDebounce.tsx";
import { getSpellsByPage } from "@services/api/spells.service";

export function SpellsScreen() {
  const { status, data, execute } = useFetch<ICard>(async () => {
    const spells = await getSpellsByPage(page, debouncedSearch);
    return spells.map(mapSpellToCard);
  });

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    execute();
  }, [execute, debouncedSearch, page]);

  function handleLoadMore() {
    setPage(prev => prev + 1);
  }

  const loader = () => {
    return status === "loading" ? <Loader text="Loading more spells..." /> : null;
  };

  return (
    <View style={styles.container}>
      <Search value={search} onChange={setSearch} />
      <FlatList
        data={data?.filter(item =>
          item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Card data={item} />}
        ListFooterComponent={loader}
        contentContainerStyle={styles.spellsList}
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
