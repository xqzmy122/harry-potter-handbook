import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/colors";

export function FilterDropdown({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect?: (value: string) => void;
}) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const restOptions = options.length > 1 ? options.slice(1) : [];

  const handleSelect = (item: string) => {
    setExpanded(false);
    onSelect?.(item);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.trigger}
        onPress={() => setExpanded(prev => !prev)}
        accessibilityRole="button"
      >
        <Text style={styles.triggerText} numberOfLines={1}>
          {selected || "All"}
        </Text>
        <Text style={styles.chevron}>{expanded ? "▲" : "▼"}</Text>
      </Pressable>

      {expanded && restOptions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={restOptions}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <Pressable
                style={[styles.option, selected === item && styles.optionSelected]}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText} numberOfLines={1}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.text,
  },
  chevron: {
    fontSize: 10,
    color: colors.textMuted,
  },
  dropdown: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
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
  optionSelected: {
    backgroundColor: colors.background,
  },
  optionText: {
    fontSize: 14,
    color: colors.text,
  },
});
