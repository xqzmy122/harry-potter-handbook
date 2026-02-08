import { Text, StyleSheet, Pressable } from "react-native";
import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useTheme } from "@/theme/ThemeContext";
import { ThemeMode } from "@/theme/colors";

export function DrawerContent(_props: DrawerContentComponentProps) {
  const { theme, themeMode, setThemeMode } = useTheme();

  const options: { value: ThemeMode; label: string }[] = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  return (
    <DrawerContentScrollView
      style={[styles.container, { backgroundColor: theme.drawerBg }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: theme.text }]}>Theme</Text>
      {options.map(opt => (
        <Pressable
          key={opt.value}
          style={[
            styles.option,
            { borderColor: theme.border },
            themeMode === opt.value && { backgroundColor: theme.border },
          ]}
          onPress={() => setThemeMode(opt.value)}
        >
          <Text
            style={[
              styles.optionText,
              { color: theme.text },
              themeMode === opt.value && styles.optionTextSelected,
            ]}
          >
            {opt.label}
          </Text>
        </Pressable>
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  optionText: {
    fontSize: 16,
  },
  optionTextSelected: {
    fontWeight: "600",
  },
});
