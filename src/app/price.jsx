import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button/button';
import PublicLayout from '../layouts/PublicLayout';
import { styles as s } from '../styles/styles';
import { resets } from '../styles/resets';

export default function Price() {
  const { t } = useTranslation();
  return (
    <PublicLayout>
      <View style={[s.container, s.section]}>
        <Text accessibilityRole="header" style={s.heading}>{t('MOBILE.PRICE_TITLE')}</Text>
        <View style={s.card}>
          <Text style={s.title}>0 €</Text>
          <Text style={resets.text}>{t('MOBILE.FREE')}</Text>
          <Button href="https://quiz-word.com/create-account" label={t('WEBSITE.CTA.BUTTON')} />
        </View>
      </View>
    </PublicLayout>
  );
}
