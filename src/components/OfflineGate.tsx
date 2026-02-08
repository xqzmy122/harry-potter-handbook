import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import NetInfo from "@react-native-community/netinfo";

interface OfflineGateProps {
  children: React.ReactNode;
}

export function OfflineGate({ children }: OfflineGateProps) {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected ?? false);
    });

    return unsubscribe;
  }, []);

  const handleRetry = async () => {
    setIsRefreshing(true);
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected ?? false);
    setIsRefreshing(false);
  };

  if (isConnected === null) {
    return <>{children}</>;
  }

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No internet connection</Text>
        <Text style={styles.message}>Please check your network settings and try again.</Text>
        <Pressable
          style={[styles.button, isRefreshing && styles.buttonDisabled]}
          onPress={handleRetry}
          disabled={isRefreshing}
        >
          <Text style={styles.buttonText}>{isRefreshing ? "Checking..." : "Try again"}</Text>
        </Pressable>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#333",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
