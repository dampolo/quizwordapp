import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../../components/ScreenHeader/screen-header";
import { auth, authCompact, authCompactWidth } from "../../../styles/auth";
import { resets } from "../../../styles/resets";
import { styles } from "../../../styles/styles";

export default function Confirmation() {
  const { message } = useLocalSearchParams();
  const compact = useWindowDimensions().width <= authCompactWidth;
  const mainAuthStyle = [auth.mainAuth, compact && authCompact.mainAuth];
  const contentStyle = [
    auth.mainContentCustomer,
    compact && authCompact.mainContentCustomer,
  ];
  const confirmationMessage = getConfirmationMessage();

  function getConfirmationMessage() {
    if (typeof message === "string" && message.trim()) return message;
    return "Du kannst jetzt deine E-Mail prüfen.";
  }

  function getButtonStyle({ pressed }) {
    return [styles.button, pressed && auth.pressed];
  }

  return (
    <SafeAreaView style={resets.screen}>
      <ScreenHeader title="" fallbackHref="/quiz/(auth)/login-quiz" />
      <ScrollView contentContainerStyle={mainAuthStyle}>
        <View style={contentStyle}>
          <View style={auth.formTitle}>
            <Text accessibilityRole="header" style={auth.formTitleName}>
              Bestätigung
            </Text>
          </View>
          <Text accessibilityLiveRegion="polite" style={auth.description}>
            {confirmationMessage}
          </Text>
          <Link href="/quiz/(auth)/login-quiz" replace asChild>
            <Pressable testID="confirmation-login" style={getButtonStyle}>
              <Text style={styles.buttonText}>Anmelden</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
