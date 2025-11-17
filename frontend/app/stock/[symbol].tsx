import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StockDetails() {
  const { symbol } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Stock Details: {symbol}</Text>
      <Text>Details will be implemented later.</Text>
    </SafeAreaView>
  );
}
