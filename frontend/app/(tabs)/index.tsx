import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stock } from '@/types/stock';
import SearchBar from '@/components/SearchBar';
import StockCard from '@/components/StockCard';
import { BlurView } from 'expo-blur';
import { useStockSearch } from '@/hooks/useStockSearch';


export default function Home() {
  const { searchQuery, setSearchQuery, results, isLoading, dummyStocks } = useStockSearch();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <SafeAreaView className='flex-1 p-4'>
      <View className="z-50">
        <SearchBar
          value={searchQuery}
          onValueChange={setSearchQuery}
          results={results}
          isLoading={isLoading}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </View>
      {isSearchFocused && (
        <Pressable
          className="absolute top-0 left-0 right-0 bottom-0 z-40"
          onPress={() => {
            Keyboard.dismiss();
            setSearchQuery('');
          }}
        >
          <BlurView
            intensity={20}
            style={StyleSheet.absoluteFill}
          />
        </Pressable>
      )}
      <View className='mt-5'></View>
      <Text style={styles.sectionTitle}>Recently Viewed</Text>
      <View className='flex-row justify-around'>
        <StockCard item={dummyStocks[0]} />
        <StockCard item={dummyStocks[1]} />
      </View>

      <Text style={styles.sectionTitle}>Watch List</Text>
      <View className='flex-row justify-around'>
        <StockCard item={dummyStocks[0]} />
        <StockCard item={dummyStocks[1]} />
      </View>
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
