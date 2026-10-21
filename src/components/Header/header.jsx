import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import Button from '../Button/button';
import Logo from '../Logo/logo';
import { styles as shared } from '../../styles/styles';
import { styles as s } from './header.styles';

export default function Header() {
  const { t, i18n } = useTranslation();
  const compact = useWindowDimensions().width <= 992;

  return (
    <View style={s.header}>
      <View style={[shared.container, compact && s.mobileContainer]}>
        <View style={s.row}>
          <Link href="/" asChild>
            <Pressable accessibilityRole="link" accessibilityLabel={t('MOBILE.HOME_LABEL')} style={s.brandLink}>
              <Logo size={compact ? 80 : 56} />
              {!compact && <Text style={s.brand}>Quiz Word</Text>}
            </Pressable>
          </Link>
          <Link href="https://quiz-word.com/login" style={[s.link, compact && s.mobileLogin]}>
            {t('MOBILE.LOGIN')}
          </Link>
        </View>
        {!compact && <View style={s.navigation}>
          <Link href="/" style={s.link}>{t('MOBILE.HOME')}</Link>
          <Link href="/price" style={s.link}>{t('HEADER.PRICE')}</Link>
          <Link href="/help-desk" style={s.link}>{t('FOOTER.FAQ')}</Link>
          <Link href="/contact" style={s.link}>{t('FOOTER.CONTACT')}</Link>
        </View>}
        {!compact && <View style={s.actions}>
          <View style={s.languages} accessibilityLabel={t('MOBILE.LANGUAGE')}>
            {['de', 'en'].map((language) => (
              <Pressable
                key={language}
                accessibilityRole="button"
                accessibilityLabel={language === 'de' ? 'Deutsch' : 'English'}
                accessibilityState={{ selected: i18n.resolvedLanguage === language }}
                onPress={() => i18n.changeLanguage(language)}
              >
                <Text style={[s.link, i18n.resolvedLanguage === language && s.activeLanguage]}>
                  {language.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
          <Button href="https://quiz-word.com/create-account" label={t('WEBSITE.HERO.REGISTER')} />
        </View>}
      </View>
    </View>
  );
}
