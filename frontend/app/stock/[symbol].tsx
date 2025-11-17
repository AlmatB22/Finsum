import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function StockDetails() {
  const { symbol } = useLocalSearchParams();

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Stock Details: {symbol}</Text>
      <Text>Details will be implemented later.</Text>
    </View>
  );
}
