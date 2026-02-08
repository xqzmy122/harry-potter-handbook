import { memo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";

function FilterDropdownComponent({
  options,
  selected,
  onSelect,
}: {
  options: readonly string[];
  selected: string;
  onSelect?: (value: string) => void;
}) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState<boolean>(false);

  const restOptions = options.length > 1 ? options.slice(1) : [];

  const handleSelect = (item: string) => {
    setExpanded(false);
    onSelect?.(item);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <Pressable
        style={styles.trigger}
        onPress={() => setExpanded(prev => !prev)}
        accessibilityRole="button"
      >
        <Text style={[styles.triggerText, { color: theme.text }]} numberOfLines={1}>
          {selected || "All"}
        </Text>
        <Text style={[styles.chevron, { color: theme.textMuted }]}>{expanded ? "▲" : "▼"}</Text>
      </Pressable>

      {expanded && restOptions.length > 0 && (
        <View style={[styles.dropdown, { borderTopColor: theme.border }]}>
          <FlatList
            data={restOptions}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <Pressable
                style={[styles.option, selected === item && { backgroundColor: theme.background }]}
                onPress={() => handleSelect(item)}
              >
                <Text style={[styles.optionText, { color: theme.text }]} numberOfLines={1}>
                  {item}
                </Text>
              </Pressable>
            )}
            contentContainerStyle={styles.list}
          />
        </View>
      )}
    </View>
  );
}

export const FilterDropdown = memo(FilterDropdownComponent);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    minWidth: 140,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 8,
  },
  triggerText: {
    flex: 1,
    fontSize: 14,
  },
  chevron: {
    fontSize: 10,
  },
  dropdown: {
    borderTopWidth: 1,
    maxHeight: 200,
  },
  list: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 14,
  },
});
