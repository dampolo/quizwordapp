import { StyleSheet } from 'react-native';
import { colors, radius } from '../../styles/basic';
import { fonts } from '../../assets/fonts';

export const styles = StyleSheet.create({
  header: { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.white },
  mobileContainer: { paddingHorizontal: 32 },
  mobileLogin: { fontSize: 18, lineHeight: 27, fontFamily: fonts.bold, paddingHorizontal: 0, paddingVertical: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  brandLink: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brand: { fontSize: 23, fontFamily: fonts.extraBold, color: colors.primary },
  navigation: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  link: { paddingVertical: 12, paddingHorizontal: 10, color: colors.primary, fontFamily: fonts.semibold, fontSize: 14 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 12 },
  languages: { flexDirection: 'row', gap: 8 },
  activeLanguage: { backgroundColor: colors.hero, borderRadius: radius, overflow: 'hidden' },
});
