import { Text, StyleSheet, View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

export function Header() {
  const { theme } = useTheme();

  return (
    <SafeAreaView>
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <Text style={[styles.title, { color: theme.text }]}>Harry Potter</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  header: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
