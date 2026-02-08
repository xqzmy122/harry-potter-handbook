export const lightTheme = {
  background: "#f5f5f5",
  surface: "#ffffff",
  text: "#1a1a1a",
  textSecondary: "#525252",
  textMuted: "#737373",
  border: "#e5e5e5",
  accent: "#2563eb",
  accentMuted: "#3b82f6",
  error: "#dc2626",
  drawerBg: "#ffffff",
} as const;

export const darkTheme = {
  background: "#0f0f0f",
  surface: "#1a1a1a",
  text: "#fafafa",
  textSecondary: "#a3a3a3",
  textMuted: "#737373",
  border: "#262626",
  accent: "#3b82f6",
  accentMuted: "#60a5fa",
  error: "#ef4444",
  drawerBg: "#171717",
} as const;

/** Base shape for theme colors; both light and dark themes satisfy this. */
export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  accent: string;
  accentMuted: string;
  error: string;
  drawerBg: string;
}

export type ThemeMode = "light" | "dark" | "system";
