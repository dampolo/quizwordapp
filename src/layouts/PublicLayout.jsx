import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import { resets } from '../styles/resets';

export default function PublicLayout({ children }) {
  return (
    <SafeAreaView style={resets.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        {children}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
