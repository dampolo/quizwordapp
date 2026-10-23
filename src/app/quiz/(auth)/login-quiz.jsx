import { useRef, useState } from "react";
import { Link, Stack, router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../context/auth/useAuth";
import PreLoader from "../../../components/PreLoader/pre-loader";
import { auth, authCompact, authCompactWidth } from "../../../styles/auth";
import { resets } from "../../../styles/resets";
import { styles } from "../../../styles/styles";
import MailIcon from "../../../../assets/icons/mail-icon-input-field.svg";
import LockIcon from "../../../../assets/icons/pwd-lock-icon-input-field.svg";
import EyeIcon from "../../../../assets/icons/eye.svg";
import EyeOffIcon from "../../../../assets/icons/eye-off.svg";

export default function LoginQuiz() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const passwordRef = useRef(null);
  const { login, loading } = useAuth();
  const compact = useWindowDimensions().width <= authCompactWidth;
  const busy = loading || submitting;
  const PasswordIcon = isPasswordVisible ? EyeIcon : EyeOffIcon;

  async function handleSubmit() {
    if (loading || submittingRef.current) return;
    const email = formValues.email.trim();
    const errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) {
      errors.email = "Deine E-Mail ist unvollständig/inkorrekt.";
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%+\-/*?&#])[A-Za-z\d@$!%+\-/*?&#]{10,}$/.test(
        formValues.password,
      )
    ) {
      errors.password = "Dein Passwort ist nicht korrekt.";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length) return;
    submittingRef.current = true;
    setSubmitting(true);
    try {
      const response = await login(email, formValues.password);
      if (response) router.replace("/my-quiz/all-words");
      else
        setFormErrors({
          message: "Anmeldung fehlgeschlagen. Bitte versuche es erneut.",
        });
    } catch (error) {
      const detail = error?.response?.data?.detail || error?.response?.detail;
      setFormErrors({
        message: typeof detail === "string" ? detail : "Login Fehler",
      });
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={resets.screen}>
      <Stack.Screen options={{ title: "Login" }} />
      <KeyboardAvoidingView
        style={resets.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={[
            auth.mainAuth,
            compact && authCompact.mainAuth,
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[
              auth.mainContentCustomer,
              compact && authCompact.mainContentCustomer,
            ]}
          >
            <View style={auth.formTitle}>
              <Text accessibilityRole="header" style={auth.formTitleName}>
                Anmeldung
              </Text>
            </View>
            <Text style={auth.description}>
              Wir empfehlen dir, die E-Mail-Adresse zu nutzen, die du bei der
              Arbeit verwendest.
            </Text>
            <Text style={auth.description}>
              Hast du kein Konto?{" "}
              <Link href="/quiz/(auth)/create-account" style={auth.newUserLink}>
                Konto erstellen
              </Link>
            </Text>
            <View style={auth.form}>
              <View style={auth.inputContainer}>
                <Text nativeID="login-email-label" style={auth.inputLabel}>
                  E-Mail-Adresse
                </Text>
                <TextInput
                  testID="login-email"
                  accessibilityLabel="E-Mail-Adresse"
                  accessibilityLabelledBy="login-email-label"
                  style={[
                    auth.inputField,
                    compact && authCompact.inputField,
                    focusedField === "email" && auth.inputFieldFocus,
                  ]}
                  placeholder="beispielname@email.com"
                  autoComplete="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!busy}
                  returnKeyType="next"
                  submitBehavior="submit"
                  value={formValues.email}
                  onChangeText={(email) =>
                    setFormValues((values) => ({ ...values, email }))
                  }
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
                <View
                  pointerEvents="none"
                  style={[auth.inputIcon, compact && authCompact.inputIcon]}
                >
                  <MailIcon width={24} height={24} />
                </View>
                <Text accessibilityLiveRegion="polite" style={auth.warnText}>
                  {formErrors.email}
                </Text>
              </View>
              <View style={auth.inputContainer}>
                <Text nativeID="login-password-label" style={auth.inputLabel}>
                  Passwort
                </Text>
                <TextInput
                  ref={passwordRef}
                  testID="login-password"
                  accessibilityLabel="Passwort"
                  accessibilityLabelledBy="login-password-label"
                  style={[
                    auth.inputField,
                    compact && authCompact.inputField,
                    focusedField === "password" && auth.inputFieldFocus,
                  ]}
                  placeholder="Passwort"
                  autoComplete="current-password"
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!busy}
                  returnKeyType="go"
                  value={formValues.password}
                  onChangeText={(password) =>
                    setFormValues((values) => ({ ...values, password }))
                  }
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  onSubmitEditing={handleSubmit}
                />
                <View
                  pointerEvents="none"
                  style={[auth.inputIcon, compact && authCompact.inputIcon]}
                >
                  <LockIcon width={24} height={24} />
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    isPasswordVisible
                      ? "Passwort verstecken"
                      : "Passwort zeigen"
                  }
                  onPress={() => setIsPasswordVisible((visible) => !visible)}
                  style={({ pressed }) => [
                    auth.eyeButton,
                    pressed && auth.pressed,
                  ]}
                >
                  <PasswordIcon width={24} height={24} />
                </Pressable>
                <Text
                  accessibilityLiveRegion="polite"
                  style={[auth.warnText, auth.warnTxtHight]}
                >
                  {formErrors.password || formErrors.message}
                </Text>
              </View>
              {busy && <PreLoader />}
              <View style={auth.btnContainer}>
                <Pressable
                  testID="login-submit"
                  accessibilityRole="button"
                  accessibilityState={{ disabled: busy, busy }}
                  disabled={busy}
                  onPress={handleSubmit}
                  style={({ pressed }) => [
                    styles.button,
                    (pressed || busy) && auth.pressed,
                  ]}
                >
                  <Text style={styles.buttonText}>Anmelden</Text>
                </Pressable>
              </View>
              <Link href="/quiz/(auth)/forgot-password" asChild>
                <Pressable style={auth.btnPassword}>
                  <Text style={auth.btnPasswordText}>Passwort vergessen?</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
