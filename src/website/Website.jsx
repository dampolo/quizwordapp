import { useMemo } from "react";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button/button";
import PublicLayout from "../layouts/PublicLayout";
import { useTranslation } from "react-i18next";
import { createWebsiteStyles } from "./website.styles";
import { colors } from "../styles/basic";
import World from "../../assets/icons/world.svg";
import Progress from "../../assets/icons/progress.svg";

const features = ["CHOOSE_ANYWHERE", "SMART_QUIZZES", "TRACK_PROGRESS"];
const featureIcons = [World, Progress, Progress];
const featureColors = ["#ede9fe", "#d1fae5", "#fde7c7"];
// Match the reference cards' minimum word widths without splitting headings.
const featureMinimumWidths = [193, 218, 203];
const steps = ["PICK_YOUR_WORDS", "CREATE_YOUR_QUIZ", "UNLOCK_YOUR_QUIZ"];

export default function Website() {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const compact = width <= 992;
  const s = useMemo(() => createWebsiteStyles(width, height), [width, height]);
  return (
    <PublicLayout>
      <View style={s.hero} testID="website-hero">
        <View style={[s.container, s.heroRow, !compact && s.wideRow]}>
          <View style={s.heroContent}>
            <View style={s.badge}>
              <Text style={s.badgeText}>✦ {t("WEBSITE.HERO.BADGE")}</Text>
            </View>
            <Text accessibilityRole="header" style={s.title}>
              {t("WEBSITE.HERO.TITLE")} <Text style={s.accent}>Quiz Word</Text>
            </Text>
            <Text style={s.description}>{t("WEBSITE.HERO.SUBTITLE")}</Text>
            <View style={s.buttons}>
              <Button
                href="https://quiz-word.com/create-account"
                label={`${t("WEBSITE.HERO.REGISTER")} →`}
                style={s.heroButton}
                textStyle={s.heroButtonText}
              />
              <Button
                href="https://quiz-word.com/login"
                label={t("WEBSITE.HERO.LOGIN")}
                secondary
                style={s.heroButton}
                textStyle={s.heroButtonText}
              />
            </View>
          </View>
          {!compact && (
            <View style={[s.board, s.boardWide]}>
              <Image
                source={require("../../assets/images/learning-board.png")}
                style={s.boardImage}
                resizeMode="cover"
                accessibilityLabel={t("MOBILE.BOARD_LABEL")}
              />
              <Text style={s.boardCaption}>{t("MOBILE.BOARD_CAPTION")}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={s.steps} testID="website-features">
        <View style={s.container}>
          <View style={s.stepsHeading}>
            <Text accessibilityRole="header" style={s.stepsTitle}>
              {t("WEBSITE.HOW_IT_WORKS.TITLE")}
            </Text>
            <Text style={s.stepsDescription}>
              {t("WEBSITE.HOW_IT_WORKS.DESCRIPTION")}
            </Text>
          </View>
          <View style={s.cards}>
            {features.map((feature, index) => {
              const FeatureIcon = featureIcons[index];
              return (
                <View
                  key={feature}
                  style={[
                    s.featureCard,
                    compact && { minWidth: featureMinimumWidths[index] },
                  ]}
                >
                  <View
                    style={[
                      s.featureIcon,
                      { backgroundColor: featureColors[index] },
                    ]}
                  >
                    <FeatureIcon
                      width={24}
                      height={24}
                      color={colors.primary}
                      aria-hidden
                    />
                  </View>
                  <Text accessibilityRole="header" style={s.featureTitle}>
                    {t(`WEBSITE.HOW_IT_WORKS.FEATURES.${feature}.TITLE`)}
                  </Text>
                  <Text style={s.featureDescription}>
                    {t(`WEBSITE.HOW_IT_WORKS.FEATURES.${feature}.DESCRIPTION`)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View style={s.workflow} testID="website-workflow">
        <View style={[s.container, s.workflowContainer]}>
          <View style={s.tutorial}>
            <Image
              source={require("../../assets/images/learning-board.png")}
              style={s.tutorialImage}
              resizeMode="cover"
              accessibilityLabel={t("MOBILE.BOARD_LABEL")}
            />
            <View style={s.tutorialCaption}>
              <Text style={s.tutorialText}>{t("MOBILE.BOARD_LABEL")}</Text>
            </View>
          </View>
          <View style={s.workflowContent}>
            <Text accessibilityRole="header" style={s.workflowTitle}>
              {t("WEBSITE.HOW_TO_USE_IT.TITLE")}
            </Text>
            {steps.map((step, index) => (
              <View key={step} style={s.step}>
                <Text style={s.number}>{index + 1}</Text>
                <View style={s.stepText}>
                  <Text accessibilityRole="header" style={s.stepTitle}>
                    {t(`WEBSITE.HOW_TO_USE_IT.${step}.TITLE`)}
                  </Text>
                  <Text style={s.stepDescription}>
                    {t(`WEBSITE.HOW_TO_USE_IT.${step}.DESCRIPTION`)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={s.journeySection} testID="website-journey">
        <View style={s.container}>
          <LinearGradient
            colors={[colors.secondary, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.journey}
          >
            <Text accessibilityRole="header" style={s.journeyTitle}>
              {t("WEBSITE.CTA.TITLE")}
            </Text>
            <Text style={s.journeyText}>{t("WEBSITE.CTA.DESCRIPTION")}</Text>
            <Button
              href="https://quiz-word.com/create-account"
              label={t("WEBSITE.CTA.BUTTON")}
              light
              style={s.journeyButton}
              textStyle={s.journeyButtonText}
            />
          </LinearGradient>
        </View>
      </View>
    </PublicLayout>
  );
}
