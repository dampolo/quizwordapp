import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Platform, Pressable, Share, Text, useWindowDimensions, View } from 'react-native';
import Mail from '../../../assets/icons/mail.svg';
import ShareIcon from '../../../assets/icons/share.svg';
import { colors } from '../../styles/basic';
import { styles as shared } from '../../styles/styles';
import { styles as s } from './footer.styles';

export default function Footer() {
  const { t } = useTranslation();
  const compact = useWindowDimensions().width <= 992;
  const [feedback, setFeedback] = useState('');

  async function handleShare() {
    setFeedback('');
    try {
      if (Platform.OS === 'web' && !globalThis.navigator?.share) {
        await globalThis.navigator.clipboard.writeText('https://quiz-word.com');
        setFeedback(t('MOBILE.LINK_COPIED'));
      } else {
        await Share.share({ title: 'Quiz Word', message: `${t('MOBILE.SHARE_TEXT')} https://quiz-word.com`, url: 'https://quiz-word.com' });
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setFeedback(t('MOBILE.SHARE_ERROR'));
    }
  }

  return (
    <View style={s.footer}>
      <View style={[shared.container, s.container, !compact && s.desktop]}>
        <View style={s.brandGroup}>
          <Text style={s.brand}>Quiz Word</Text>
          <Text style={s.copyright}>© {new Date().getFullYear()} Quiz Word. {t('FOOTER.DESCRIPTION')}</Text>
        </View>
        <View style={s.links}>
          <Link href="https://quiz-word.com/imprint" style={s.link}>{t('FOOTER.IMPRINT')}</Link>
          <Link href="https://quiz-word.com/privacy-policy" style={s.link}>{t('FOOTER.PRIVACY_POLICY')}</Link>
          <Link href="/help-desk" style={s.link}>{t('FOOTER.FAQ')}</Link>
          <Link href="/contact" style={s.link}>{t('FOOTER.CONTACT')}</Link>
        </View>
        <View style={s.socials}>
          <Pressable accessibilityRole="button" accessibilityLabel={t('MOBILE.SHARE')} onPress={handleShare} style={s.social}>
            <ShareIcon width={24} height={24} color={colors.primary} aria-hidden />
          </Pressable>
          <Link href="mailto:support@quiz-word.com" asChild>
            <Pressable accessibilityRole="link" accessibilityLabel={t('MOBILE.EMAIL')} style={s.social}>
              <Mail width={24} height={24} color={colors.primary} aria-hidden />
            </Pressable>
          </Link>
        </View>
        {!!feedback && <Text accessibilityLiveRegion="polite" style={s.feedback}>{feedback}</Text>}
      </View>
    </View>
  );
}
