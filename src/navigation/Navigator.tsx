import { createStaticNavigation } from "@react-navigation/native";
import { stack } from "./stack/stack";

export const Navigation = createStaticNavigation(stack);
