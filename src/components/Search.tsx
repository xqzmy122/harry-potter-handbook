import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Search({
  value,
  onChange,
}: {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}) {
  return (
    <SafeAreaView style={styles.container}>
      <TextInput value={value} onChangeText={onChange} placeholder="Search" style={styles.input} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
  },
  container: {
    backgroundColor: "#ffffff",
  },
});
