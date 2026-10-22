import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button/button';
import PublicLayout from '../layouts/PublicLayout';
import { styles } from '../styles/styles';
import { resets } from '../styles/resets';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <PublicLayout>
      <View style={[styles.container, styles.section]}>
        <Text accessibilityRole="header" style={styles.heading}>{t('CONTACT.TITLE')}</Text>
        <Text style={styles.subtitle}>{t('CONTACT.TITLE_H3')}</Text>
        <Text style={resets.text}>{t('CONTACT.DESCRIPTION_1')}</Text>
        <Text style={resets.text}>{t('CONTACT.DESCRIPTION_2')}</Text>
        <View style={styles.card}>
          <Text style={styles.subtitle}>{t('CONTACT.DESCRIPTION_3')}</Text>
          <Text style={resets.text}>{t('MOBILE.CONTACT_NOTE')}</Text>
          <Button href="https://quiz-word.com/contact" label={t('MOBILE.CONTACT_OPEN')} />
        </View>
      </View>
    </PublicLayout>
  );
}
