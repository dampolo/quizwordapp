import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { styles } from '../../styles/styles';

export default function Button({ href, label, secondary = false, light = false, style, textStyle }) {
  return (
    <Link href={href} asChild>
      <Pressable accessibilityRole="link" style={StyleSheet.flatten([styles.button, secondary && styles.secondary, light && styles.whiteButton, style])}>
        <Text style={[styles.buttonText, (secondary || light) && styles.secondaryText, textStyle]}>{label}</Text>
      </Pressable>
    </Link>
  );
}
