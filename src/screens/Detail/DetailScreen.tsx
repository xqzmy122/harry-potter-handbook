import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Loader } from "@components/Loader";
import { useTheme } from "@/theme/ThemeContext";
import { ThemeColors } from "@/theme/colors";
import { detailConfigs, DetailDisplayData, DetailType } from "@/config/detailConfig";

type DetailParams = {
  Detail: { type: DetailType; id: string };
};

function DetailRow({
  label,
  value,
  theme,
}: {
  label: string;
  value: string | null;
  theme: ThemeColors;
}) {
  if (!value) return null;
  return (
    <View style={[styles.row, { borderBottomColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.textMuted }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

function DetailContent({ name, image, fields, theme }: DetailDisplayData & { theme: ThemeColors }) {
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      {image ? (
        <Image source={{ uri: image }} style={[styles.image, { backgroundColor: theme.border }]} />
      ) : (
        <Image
          source={require("@assets/unknown-spell.png")}
          style={[styles.image, { backgroundColor: theme.border }]}
        />
      )}
      <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        {fields.map(({ label, value }) => (
          <DetailRow key={label} label={label} value={value} theme={theme} />
        ))}
      </View>
    </ScrollView>
  );
}

export function DetailScreen() {
  const { theme } = useTheme();
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
      headerStyle: { backgroundColor: theme.surface },
      headerTintColor: theme.text,
    });
  }, [navigation, theme]);

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
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.textMuted }]}>Failed to load details</Text>
      </View>
    );
  }

  return <DetailContent {...displayData} theme={theme} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  row: {
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 16,
  },
});
