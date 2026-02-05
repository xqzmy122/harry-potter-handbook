import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useFetch } from "../../services/api/useFetch";
import { ICard } from "../../types/types";
import { getAllSpells } from "../../services/api/spells.service";
import { Card } from "../../components/Card";
import { mapSpellToCard } from "../../helpers/mappers";
import { Loader } from "../../components/Loader";
import { Search } from "../../components/Search.tsx";
import { useDebounce } from "../../hooks/useDebounce.tsx";

export function SpellsScreen() {
  const { status, data, execute } = useFetch<ICard>(async () => {
    const spells = await getAllSpells();
    return spells.map(mapSpellToCard);
  });

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    execute();
  }, [execute, debouncedSearch]);

  if (status === "loading") {
    return <Loader text="Loading your magic..." />;
  }

  return (
    <View style={styles.container}>
      <Search value={search} onChange={setSearch} />
      <FlatList
        data={data?.filter(item =>
          item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )}
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
