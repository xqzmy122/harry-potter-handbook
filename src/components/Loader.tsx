import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "@/theme/colors";

export function Loader({ text }: { text: string }) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
  },
});
