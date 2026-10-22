import { useState } from "react";
import { Stack, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import PublicLayout from "../layouts/PublicLayout";
import { styles } from "../styles/styles";
import ArrowLeft from "../../assets/icons/arrow-left.svg";

import { colors } from "../styles/basic";

function handleGoBack() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/");
  }
}

export default function HelpDesk() {
  const { t } = useTranslation();
  const [open, setOpen] = useState();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Help Desk",
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.qwThird,
          },
          headerLeft: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("MOBILE.GO_BACK")}
              hitSlop={12}
              style={({ hovered, pressed }) => ({
                opacity: hovered || pressed ? 0.6 : 1,
              })}
              onPress={handleGoBack}
            >
              <ArrowLeft width={32} height={32} />
            </Pressable>
          ),
        }}
      />
      <PublicLayout showHeader={false}>
        <View style={[styles.container, styles.section]}>
          <Text accessibilityRole="header" style={styles.heading}>
            {t("MOBILE.FAQ_TITLE")}
          </Text>
          <View style={styles.faqList}>
            <View style={styles.faq}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: open === 0 }}
                onPress={() => setOpen(open === 0 ? -1 : 0)}
                style={styles.faqQuestion}
              >
                <Text style={styles.faqTitle}>
                  {t("MOBILE.FAQ.WHAT.QUESTION")}
                </Text>
                <Text style={styles.faqIcon}>{open === 0 ? "−" : "+"}</Text>
              </Pressable>
              {open === 0 && (
                <Text style={styles.faqAnswer}>
                  {t("MOBILE.FAQ.WHAT.ANSWER")}
                </Text>
              )}
            </View>
            <View style={styles.faq}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: open === 1 }}
                onPress={() => setOpen(open === 1 ? -1 : 1)}
                style={styles.faqQuestion}
              >
                <Text style={styles.faqTitle}>
                  {t("MOBILE.FAQ.COST.QUESTION")}
                </Text>
                <Text style={styles.faqIcon}>{open === 1 ? "−" : "+"}</Text>
              </Pressable>
              {open === 1 && (
                <Text style={styles.faqAnswer}>
                  {t("MOBILE.FAQ.COST.ANSWER")}
                </Text>
              )}
            </View>
            <View style={styles.faq}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: open === 2 }}
                onPress={() => setOpen(open === 2 ? -1 : 2)}
                style={styles.faqQuestion}
              >
                <Text style={styles.faqTitle}>
                  {t("MOBILE.FAQ.WHO.QUESTION")}
                </Text>
                <Text style={styles.faqIcon}>{open === 2 ? "−" : "+"}</Text>
              </Pressable>
              {open === 2 && (
                <Text style={styles.faqAnswer}>
                  {t("MOBILE.FAQ.WHO.ANSWER")}
                </Text>
              )}
            </View>
          </View>
        </View>
      </PublicLayout>
    </>
  );
}
