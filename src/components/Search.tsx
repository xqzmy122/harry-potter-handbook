import { memo, Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";

function SearchComponent({
  value,
  onChange,
}: {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search spells..."
        placeholderTextColor={theme.textMuted}
        style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
      />
    </View>
  );
}

export const Search = memo(SearchComponent);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
  },
});
