import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { styles } from "../../styles/styles";

export default function Button({
  href,
  label,
  secondary = false,
  light = false,
  style,
  textStyle,
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="link"
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={StyleSheet.flatten([
          styles.button,
          secondary && styles.secondary,
          light && styles.whiteButton,
          style,
          pressed && styles.pressed,
        ])}
      >
        <Text
          style={[
            styles.buttonText,
            (secondary || light) && styles.secondaryText,
            textStyle,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Link>
  );
}
