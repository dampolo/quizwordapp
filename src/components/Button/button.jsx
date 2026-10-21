import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { styles as s } from '../../styles/styles';

export default function Button({ href, label, secondary = false, light = false, style, textStyle }) {
  return (
    <Link href={href} asChild>
      <Pressable accessibilityRole="link" style={StyleSheet.flatten([s.button, secondary && s.secondary, light && s.whiteButton, style])}>
        <Text style={[s.buttonText, (secondary || light) && s.secondaryText, textStyle]}>{label}</Text>
      </Pressable>
    </Link>
  );
}
