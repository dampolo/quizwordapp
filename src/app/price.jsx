import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button/button';
import PublicLayout from '../layouts/PublicLayout';
import { styles } from '../styles/styles';
import { resets } from '../styles/resets';

export default function Price() {
  const { t } = useTranslation();
  return (
    <PublicLayout>
      <View style={[styles.container, styles.section]}>
        <Text accessibilityRole="header" style={styles.heading}>{t('MOBILE.PRICE_TITLE')}</Text>
        <View style={styles.card}>
          <Text style={styles.title}>0 €</Text>
          <Text style={resets.text}>{t('MOBILE.FREE')}</Text>
          <Button href="https://quiz-word.com/create-account" label={t('WEBSITE.CTA.BUTTON')} />
        </View>
      </View>
    </PublicLayout>
  );
}
