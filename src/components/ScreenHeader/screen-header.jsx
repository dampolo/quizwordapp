import { Stack, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import ArrowLeft from '../../../assets/icons/arrow-left.svg';
import { colors } from '../../styles/basic';

export default function ScreenHeader({ title, fallbackHref = '/' }) {
  const { t } = useTranslation();

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace(fallbackHref);
  }

  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title,
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.qwThird },
        headerLeft: () => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('MOBILE.GO_BACK')}
            hitSlop={12}
            style={({ hovered, pressed }) => ({ opacity: hovered || pressed ? 0.6 : 1 })}
            onPress={goBack}
          >
            <ArrowLeft width={32} height={32} />
          </Pressable>
        ),
      }}
    />
  );
}
