import { Text, StyleSheet, Pressable, View } from 'react-native';
import { Stock } from '@/types/stock';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useRef } from 'react';

interface StockCardProps {
    item: Stock;
    onExpand: (stock: Stock, layout: { x: number; y: number; width: number; height: number }) => void;
}

export default function StockCard({ item, onExpand }: StockCardProps) {
    const cardRef = useRef<View>(null);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.95, {
            damping: 15,
            stiffness: 150,
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 150,
        });
    };

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        // Measure card position on screen
        cardRef.current?.measure((x, y, width, height, pageX, pageY) => {
            onExpand(item, { x: pageX, y: pageY, width, height });
        });
    };

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            style={styles.container}
        >
            <Animated.View
                ref={cardRef}
                style={[styles.card, animatedStyle]}
            >
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.company}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={[styles.change, { color: item.change > 0 ? 'green' : 'red' }]}>
                    {item.change > 0 ? '+' : ''}{item.change} ({item.percent}%)
                </Text>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '46%',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#eee',
    },
    symbol: { fontSize: 16, fontWeight: '700' },
    company: { fontSize: 12, color: '#555' },
    price: { fontSize: 18, fontWeight: '700', marginTop: 8 },
    change: { marginTop: 4, fontSize: 14 },
});