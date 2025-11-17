import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Stock } from '@/types/stock';

export default function StockCard({ item }: { item: Stock })  {
    const router = useRouter();

    return (
        <Pressable style={styles.card} onPress={() => router.navigate({
        pathname: '../stock/[symbol]',
        params: {symbol: item.symbol}
        })}>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={styles.company}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={[styles.change, { color: item.change > 0 ? 'green' : 'red' }]}>
            {item.change > 0 ? '+' : ''}{item.change} ({item.percent}%)
        </Text>
        </Pressable>
    );
}

  const styles = StyleSheet.create({
    card: {
        width: '46%',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    symbol: { fontSize: 16, fontWeight: '700' },
    company: { fontSize: 12, color: '#555' },
    price: { fontSize: 18, fontWeight: '700', marginTop: 8 },
    change: { marginTop: 4, fontSize: 14 },
});