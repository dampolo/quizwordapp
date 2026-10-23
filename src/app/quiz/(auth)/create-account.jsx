import { useRef, useState } from "react";
import { Link } from "expo-router";
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
import ScreenHeader from "../../../components/ScreenHeader/screen-header";
import { auth, authCompact, authCompactWidth } from "../../../styles/auth";
import { resets } from "../../../styles/resets";
import { styles } from "../../../styles/styles";
import MailIcon from "../../../../assets/icons/mail-icon-input-field.svg";
import LockIcon from "../../../../assets/icons/pwd-lock-icon-input-field.svg";
import EyeIcon from "../../../../assets/icons/eye.svg";
import EyeOffIcon from "../../../../assets/icons/eye-off.svg";

const fields = [
  {
    name: "email",
    label: "Deine E-Mail",
    placeholder: "beispielname@email.com",
  },
  { name: "password", label: "Passwort", placeholder: "Passwort" },
  {
    name: "repeated_password",
    label: "Wiederhole dein Passwort",
    placeholder: "Wiederhole dein Passwort",
  },
];

function validate(values) {
  const errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(values.email.trim())) {
    errors.email = "E-Mail ist unvollständig/inkorrekt.";
  }
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%+\-/*?&#])[A-Za-z\d@$!%+\-/*?&#]{10,}$/.test(
      values.password,
    )
  ) {
    errors.password =
      "Mindestens 10 Zeichen erforderlich: ein Klein- u. ein Großbuchstabe, eine Zahl und ein Sonderzeichen.";
  }
  if (values.password !== values.repeated_password) {
    errors.repeated_password = "Passwörter stimmen nicht überein.";
  }
  if (!values.checked)
    errors.checked = "Bitte akzeptiere die Datenschutzerklärung.";
  return errors;
}

export default function CreateAccount() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    repeated_password: "",
    checked: false,
  });
  const [touched, setTouched] = useState({});
  const [visible, setVisible] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [message, setMessage] = useState("");
  const [registered, setRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const inputRefs = useRef({});
  const { createAccount, loading } = useAuth();
  const compact = useWindowDimensions().width <= authCompactWidth;
  const busy = loading || submitting;
  const errors = validate(values);
  const disabled = busy || Object.keys(errors).length > 0;

  function markTouched(name) {
    setTouched((previous) => ({ ...previous, [name]: true }));
  }

  async function handleSubmit() {
    if (busy || submittingRef.current || registered) return;
    setTouched({
      email: true,
      password: true,
      repeated_password: true,
      checked: true,
    });
    if (Object.keys(errors).length) return;
    submittingRef.current = true;
    setSubmitting(true);
    setMessage("");
    try {
      await createAccount({ ...values, email: values.email.trim() });
      setRegistered(true);
      setValues({
        email: "",
        password: "",
        repeated_password: "",
        checked: false,
      });
    } catch (error) {
      const response = error?.response?.data || error?.response;
      const detail =
        response?.email?.[0] ||
        response?.password?.[0] ||
        response?.repeated_password?.[0] ||
        response?.detail;
      setMessage(
        typeof detail === "string"
          ? detail
          : "Konto konnte nicht erstellt werden. Bitte versuche es erneut.",
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={resets.screen}>
      <ScreenHeader title="" fallbackHref="/quiz/(auth)/login-quiz" />
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
                Konto erstellen
              </Text>
            </View>
            {registered ? (
              <View style={auth.form}>
                <Text accessibilityLiveRegion="polite" style={auth.description}>
                  Du bist erfolgreich registriert. Um dich anzumelden, musst du
                  deine E-Mail bestätigen!
                </Text>
                <Link href="/quiz/(auth)/login-quiz" asChild>
                  <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Anmelden</Text>
                  </Pressable>
                </Link>
              </View>
            ) : (
              <>
                <Text style={auth.description}>
                  Hast du schon ein Konto?{" "}
                  <Link href="/quiz/(auth)/login-quiz" style={auth.newUserLink}>
                    Anmelden
                  </Link>
                </Text>
                <View style={auth.form}>
                  {fields.map(({ name, label, placeholder }, index) => {
                    const isPassword = name !== "email";
                    const Icon = isPassword ? LockIcon : MailIcon;
                    const VisibilityIcon = visible[name] ? EyeIcon : EyeOffIcon;
                    return (
                      <View key={name} style={auth.inputContainer}>
                        <Text
                          nativeID={`create-account-${name}-label`}
                          style={auth.inputLabel}
                        >
                          {label}
                        </Text>
                        <TextInput
                          ref={(input) => {
                            inputRefs.current[name] = input;
                          }}
                          testID={`create-account-${name}`}
                          accessibilityLabel={label}
                          accessibilityLabelledBy={`create-account-${name}-label`}
                          style={[
                            auth.inputField,
                            compact && authCompact.inputField,
                            focusedField === name && auth.inputFieldFocus,
                          ]}
                          placeholder={placeholder}
                          autoComplete={isPassword ? "new-password" : "email"}
                          keyboardType={
                            isPassword ? "default" : "email-address"
                          }
                          autoCapitalize="none"
                          autoCorrect={false}
                          secureTextEntry={isPassword && !visible[name]}
                          editable={!busy}
                          value={values[name]}
                          onChangeText={(value) => {
                            setValues((previous) => ({
                              ...previous,
                              [name]: value,
                            }));
                            setMessage("");
                          }}
                          onFocus={() => setFocusedField(name)}
                          onBlur={() => {
                            setFocusedField(null);
                            markTouched(name);
                          }}
                          returnKeyType={
                            index === fields.length - 1 ? "done" : "next"
                          }
                          submitBehavior={
                            index === fields.length - 1
                              ? "blurAndSubmit"
                              : "submit"
                          }
                          onSubmitEditing={() => {
                            if (index < fields.length - 1)
                              inputRefs.current[
                                fields[index + 1].name
                              ]?.focus();
                            else handleSubmit();
                          }}
                        />
                        <View
                          pointerEvents="none"
                          style={[
                            auth.inputIcon,
                            compact && authCompact.inputIcon,
                          ]}
                        >
                          <Icon width={24} height={24} />
                        </View>
                        {isPassword && (
                          <Pressable
                            testID={`create-account-${name}-visibility`}
                            accessibilityRole="button"
                            accessibilityLabel={`${label} ${visible[name] ? "verstecken" : "zeigen"}`}
                            onPress={() =>
                              setVisible((previous) => ({
                                ...previous,
                                [name]: !previous[name],
                              }))
                            }
                            style={({ pressed }) => [
                              auth.eyeButton,
                              pressed && auth.pressed,
                            ]}
                          >
                            <VisibilityIcon width={24} height={24} />
                          </Pressable>
                        )}
                        <Text
                          accessibilityLiveRegion="polite"
                          style={auth.warnText}
                        >
                          {touched[name] && errors[name]}
                        </Text>
                      </View>
                    );
                  })}
                  <View style={auth.checkboxContainer}>
                    <Pressable
                      testID="create-account-checked"
                      accessibilityRole="checkbox"
                      accessibilityLabel="Ich stimme der Datenschutzerklärung zu."
                      accessibilityState={{
                        checked: values.checked,
                        disabled: busy,
                      }}
                      disabled={busy}
                      hitSlop={12}
                      onPress={() => {
                        setValues((previous) => ({
                          ...previous,
                          checked: !previous.checked,
                        }));
                        markTouched("checked");
                      }}
                      style={({ pressed }) => [
                        auth.checkbox,
                        pressed && auth.pressed,
                      ]}
                    >
                      <Text style={auth.checkboxLabel}>
                        {values.checked ? "☑" : "☐"}
                      </Text>
                    </Pressable>
                    <View style={{ flex: 1 }}>
                      <Text style={auth.checkboxLabel}>
                        Ich stimme der{" "}
                        <Link href="/privacy-policy" style={auth.privacy}>
                          Datenschutzerklärung
                        </Link>{" "}
                        zu.
                      </Text>
                      <Text
                        accessibilityLiveRegion="polite"
                        style={auth.warnText}
                      >
                        {touched.checked && errors.checked}
                      </Text>
                    </View>
                  </View>
                  {!!message && (
                    <Text
                      accessibilityRole="alert"
                      accessibilityLiveRegion="polite"
                      style={auth.warnText}
                    >
                      {message}
                    </Text>
                  )}
                  {busy && <PreLoader />}
                  <View style={auth.btnContainer}>
                    <Pressable
                      testID="create-account-submit"
                      accessibilityRole="button"
                      accessibilityState={{ disabled, busy }}
                      disabled={disabled}
                      onPress={handleSubmit}
                      style={({ pressed }) => [
                        styles.button,
                        pressed && !disabled && auth.pressed,
                        disabled && styles.buttonDisabled,
                      ]}
                    >
                      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>Weiter</Text>
                    </Pressable>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
