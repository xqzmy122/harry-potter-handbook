import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Loader } from "@components/Loader";
import { colors } from "@/theme/colors";
import { detailConfigs, DetailDisplayData, DetailType } from "@/config/detailConfig";

type DetailParams = {
  Detail: { type: DetailType; id: string };
};

function DetailRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function DetailContent({ name, image, fields }: DetailDisplayData) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Image source={require("@assets/unknown-spell.png")} style={styles.image} />
      )}
      <Text style={styles.name}>{name}</Text>
      <View style={styles.section}>
        {fields.map(({ label, value }) => (
          <DetailRow key={label} label={label} value={value} />
        ))}
      </View>
    </ScrollView>
  );
}

export function DetailScreen() {
  const route = useRoute<RouteProp<DetailParams, "Detail">>();
  const navigation = useNavigation();
  const { type, id } = route.params;

  const [displayData, setDisplayData] = useState<DetailDisplayData | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: "Back",
      headerTitle: "",
      headerShadowVisible: false,
      headerStyle: { backgroundColor: colors.surface },
      headerTintColor: colors.text,
    });
  }, [navigation]);

  useEffect(() => {
    async function load() {
      setStatus("loading");
      const config = detailConfigs[type];
      const raw = await config.fetch(id);
      if (!raw) {
        setStatus("error");
        return;
      }
      setDisplayData(config.mapToDisplay(raw));
      setStatus("success");
    }
    load();
  }, [type, id]);

  if (status === "loading") {
    return <Loader text="Loading..." />;
  }

  if (status === "error" || !displayData) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load details</Text>
      </View>
    );
  }

  return <DetailContent {...displayData} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 16,
    backgroundColor: colors.border,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  row: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 16,
    color: colors.textMuted,
  },
});
