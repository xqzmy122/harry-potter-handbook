import { Image, Pressable, View, Text, StyleSheet } from "react-native";
import { ICardProp } from "../types/types";

export function Card({ data }: ICardProp) {
  return (
    <Pressable style={styles.card}>
      <View style={styles.body}>
        {data.image ? (
          <Image source={{ uri: data.image }} style={styles.image} />
        ) : (
          <Image source={require("../assets/unknown-spell.png")} style={styles.image} />
        )}
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>{data.subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
    width: "80%",
    alignSelf: "center",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
