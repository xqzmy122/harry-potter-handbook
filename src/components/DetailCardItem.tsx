import { memo, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card } from "@components/Card";
import { ICard } from "@/types/types";
import { RootStackParamList } from "@navigation/types";

type DetailCardItemProps = {
  item: ICard;
  type: "spell" | "potion";
};

function DetailCardItemComponent({ item, type }: DetailCardItemProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPress = useCallback(
    () => navigation.navigate("Detail", { type, id: item.id }),
    [navigation, type, item.id],
  );
  return <Card data={item} onPress={onPress} />;
}

export const DetailCardItem = memo(DetailCardItemComponent);
