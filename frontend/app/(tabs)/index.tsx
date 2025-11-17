import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stock } from '@/types/stock';
import StockCard from '@/components/StockCard';


const dummyStocks: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 178.45, change: 3.25, percent: 1.86 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 342.90, change: -1.85, percent: -0.54 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 136.22, change: 2.14, percent: 1.60 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 152.18, change: 0.95, percent: 0.63 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 254.33, change: -4.21, percent: -1.63 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.55, change: 12.44, percent: 1.44 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 305.74, change: -3.12, percent: -1.01 },
  { symbol: "NFLX", name: "Netflix Inc.", price: 409.88, change: 5.62, percent: 1.39 },
  { symbol: "AMD", name: "Advanced Micro Devices", price: 162.44, change: 2.88, percent: 1.80 },
  { symbol: "INTC", name: "Intel Corp.", price: 39.55, change: -0.22, percent: -0.55 },
  { symbol: "DIS", name: "The Walt Disney Co.", price: 94.10, change: 1.02, percent: 1.10 },
  { symbol: "V", name: "Visa Inc.", price: 248.22, change: -0.44, percent: -0.18 },
  { symbol: "MA", name: "Mastercard Inc.", price: 395.12, change: 6.30, percent: 1.62 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 153.62, change: -1.32, percent: -0.85 },
  { symbol: "BAC", name: "Bank of America Corp.", price: 28.44, change: 0.62, percent: 2.23 },
];

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='flex-1 p-4'>
        <TextInput style={styles.search} placeholder="Search Stocks..." placeholderTextColor='#000000AD'/>

        <Text style={styles.sectionTitle}>Recently Viewed</Text>
        <View className='flex-row justify-around'>
          <StockCard item={dummyStocks[0]}/>
          <StockCard item={dummyStocks[1]}/>
        </View>

        <Text style={styles.sectionTitle}>Watch List</Text>
        <View className='flex-row justify-around'>
          <StockCard item={dummyStocks[0]}/>
          <StockCard item={dummyStocks[1]}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    flex: 1
  },
  search: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
});
