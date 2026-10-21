import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import PublicLayout from "../layouts/PublicLayout";
import { styles as s } from "../styles/styles";

export default function HelpDesk() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(0);
  return (
    <PublicLayout>
      <View style={[s.container, s.section]}>
        <Text accessibilityRole="header" style={s.heading}>
          {t("MOBILE.FAQ_TITLE")}
        </Text>
        <View style={s.faqList}>
          <View style={s.faq}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: open === 0 }}
              onPress={() => setOpen(open === 0 ? -1 : 0)}
              style={s.faqQuestion}
            >
              <Text style={s.faqTitle}>
                {t("MOBILE.FAQ.WHAT.QUESTION")}
              </Text>
              <Text style={s.faqIcon}>{open === 0 ? "−" : "+"}</Text>
            </Pressable>
            {open === 0 && (
              <Text style={s.faqAnswer}>
                {t("MOBILE.FAQ.WHAT.ANSWER")}
              </Text>
            )}
          </View>
          <View style={s.faq}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: open === 1 }}
              onPress={() => setOpen(open === 1 ? -1 : 1)}
              style={s.faqQuestion}
            >
              <Text style={s.faqTitle}>
                {t("MOBILE.FAQ.COST.QUESTION")}
              </Text>
              <Text style={s.faqIcon}>{open === 1 ? "−" : "+"}</Text>
            </Pressable>
            {open === 1 && (
              <Text style={s.faqAnswer}>
                {t("MOBILE.FAQ.COST.ANSWER")}
              </Text>
            )}
          </View>
          <View style={s.faq}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: open === 2 }}
              onPress={() => setOpen(open === 2 ? -1 : 2)}
              style={s.faqQuestion}
            >
              <Text style={s.faqTitle}>
                {t("MOBILE.FAQ.WHO.QUESTION")}
              </Text>
              <Text style={s.faqIcon}>{open === 2 ? "−" : "+"}</Text>
            </Pressable>
            {open === 2 && (
              <Text style={s.faqAnswer}>
                {t("MOBILE.FAQ.WHO.ANSWER")}
              </Text>
            )}
          </View>
        </View>
      </View>
    </PublicLayout>
  );
}
