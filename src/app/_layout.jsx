import "../i18n/i18n";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { fontAssets } from "../assets/fonts";
import PreLoader from "../components/PreLoader/pre-loader";
import { resets } from "../styles/resets";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const { t } = useTranslation();

  if (!fontsLoaded) {
    return (
      <View style={resets.loading}>
        {fontError ? (
          <Text accessibilityRole="alert" style={resets.loadError}>
            {t("MOBILE.FONT_ERROR")}
          </Text>
        ) : (
          <PreLoader />
        )}
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
