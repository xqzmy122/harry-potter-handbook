import { Pressable, Text, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  type DrawerContentComponentProps,
  type DrawerNavigationProp,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer, useNavigation } from "@react-navigation/native";
import { useTheme } from "@/theme/ThemeContext";
import { MyTabs } from "./Tabs";
import { DetailScreen } from "@screens/Detail/DetailScreen";
import { DrawerContent } from "@components/DrawerContent";
import { RootDrawerParamList, RootStackParamList } from "./types";

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function DrawerMenuButton({ onPress }: { onPress: () => void }) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={styles.menuButton}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text style={[styles.menuButtonText, { color: theme.text }]}>☰</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    padding: 16,
  },
  menuButtonText: {
    fontSize: 24,
  },
});

function HeaderDrawerButton() {
  const navigation = useNavigation();
  return (
    <DrawerMenuButton
      onPress={() =>
        navigation.getParent<DrawerNavigationProp<RootDrawerParamList>>()?.openDrawer()
      }
    />
  );
}

function renderHeaderLeft() {
  return <HeaderDrawerButton />;
}

function MainStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
        headerTitleStyle: { color: theme.text },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={MyTabs}
        options={{
          headerShown: true,
          headerTitle: "Harry potter",
          headerLeft: renderHeaderLeft,
        }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return <DrawerContent {...props} />;
}

export function Navigation() {
  const { theme, isDark } = useTheme();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        dark: isDark,
        colors: {
          primary: theme.accent,
          background: theme.background,
          card: theme.surface,
          text: theme.text,
          border: theme.border,
          notification: theme.accent,
        },
      }}
    >
      <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerShown: false,
          drawerType: "front",
          drawerStyle: { backgroundColor: theme.drawerBg },
        }}
      >
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
