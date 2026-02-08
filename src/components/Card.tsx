import { Image, Pressable, View, Text, StyleSheet } from "react-native";
import { ICardProp } from "@/types/types";
import { useTheme } from "@/theme/ThemeContext";

interface CardProps extends ICardProp {
  onPress?: () => void;
}

export function Card({ data, onPress }: CardProps) {
  const { theme } = useTheme();

  return (
    <Pressable style={[styles.card, { backgroundColor: theme.surface }]} onPress={onPress}>
      {data.image ? (
        <Image
          source={{ uri: data.image }}
          style={[styles.image, { backgroundColor: theme.background }]}
        />
      ) : (
        <Image
          source={require("../assets/unknown-spell.png")}
          style={[styles.image, { backgroundColor: theme.background }]}
        />
      )}
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {data.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]} numberOfLines={1}>
          {data.subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    minWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});
