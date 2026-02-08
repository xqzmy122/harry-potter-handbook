import { Image, Pressable, View, Text, StyleSheet } from "react-native";
import { ICardProp } from "@/types/types";
import { colors } from "@/theme/colors";

interface CardProps extends ICardProp {
  onPress?: () => void;
}

export function Card({ data, onPress }: CardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {data.image ? (
        <Image source={{ uri: data.image }} style={styles.image} />
      ) : (
        <Image source={require("../assets/unknown-spell.png")} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {data.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
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
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    minWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
