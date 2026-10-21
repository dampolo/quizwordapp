import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button/button';
import PublicLayout from '../layouts/PublicLayout';
import { styles as s } from '../styles/styles';
import { resets } from '../styles/resets';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <PublicLayout>
      <View style={[s.container, s.section]}>
        <Text accessibilityRole="header" style={s.heading}>{t('CONTACT.TITLE')}</Text>
        <Text style={s.subtitle}>{t('CONTACT.TITLE_H3')}</Text>
        <Text style={resets.text}>{t('CONTACT.DESCRIPTION_1')}</Text>
        <Text style={resets.text}>{t('CONTACT.DESCRIPTION_2')}</Text>
        <View style={s.card}>
          <Text style={s.subtitle}>{t('CONTACT.DESCRIPTION_3')}</Text>
          <Text style={resets.text}>{t('MOBILE.CONTACT_NOTE')}</Text>
          <Button href="https://quiz-word.com/contact" label={t('MOBILE.CONTACT_OPEN')} />
        </View>
      </View>
    </PublicLayout>
  );
}
