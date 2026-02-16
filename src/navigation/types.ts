import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Tabs: undefined;
  Detail: { type: "spell" | "potion"; id: string };
};

export type RootDrawerParamList = {
  Main: undefined;
};

export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;
