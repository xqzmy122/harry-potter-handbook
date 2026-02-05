import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";

export function Loader({ text }: { text: string }) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" />
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
