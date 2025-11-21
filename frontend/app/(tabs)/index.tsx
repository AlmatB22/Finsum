import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Pressable, Keyboard, ActivityIndicator, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stock } from '@/types/stock';
import SearchBar from '@/components/SearchBar';
import StockCard from '@/components/StockCard';
import { BlurView } from 'expo-blur';
import { useStockSearch } from '@/hooks/useStockSearch';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const navigation = useNavigation();
  const { searchQuery, setSearchQuery, results, isLoading, dummyStocks } = useStockSearch();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [expandingStock, setExpandingStock] = useState<Stock | null>(null);
  const [isContractingBack, setIsContractingBack] = useState(false);
  const lastExpandedCard = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

  // Hide/show tab bar during animations
  useEffect(() => {
    if (expandingStock || isContractingBack) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      // Restore tab bar
      navigation.setOptions({
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          marginLeft: 20,
          marginRight: 20,
          elevation: 0,
          backgroundColor: 'white',
          borderRadius: 40,
          height: 70,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          borderTopWidth: 0,
        }
      });
    }
  }, [expandingStock, isContractingBack, navigation]);

  // Animation values
  const overlayX = useSharedValue(0);
  const overlayY = useSharedValue(0);
  const overlayWidth = useSharedValue(100);
  const overlayHeight = useSharedValue(100);
  const overlayOpacity = useSharedValue(0);
  const overlayRadius = useSharedValue(16);

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: overlayX.value,
    top: overlayY.value,
    width: overlayWidth.value,
    height: overlayHeight.value,
    backgroundColor: '#fff',
    borderRadius: overlayRadius.value,
    opacity: overlayOpacity.value,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  }));

  // Detect when returning from stock page and trigger reverse animation
  useFocusEffect(
    React.useCallback(() => {
      // Check if we're returning from a navigation (not initial load)
      if (lastExpandedCard.current && !expandingStock) {
        setIsContractingBack(true);

        // Start from full screen
        overlayX.value = 0;
        overlayY.value = 0;
        overlayWidth.value = SCREEN_WIDTH;
        overlayHeight.value = SCREEN_HEIGHT;
        overlayRadius.value = 0;
        overlayOpacity.value = 1;

        // Animate to card position with iOS-style easing (smooth, same as expansion)
        const layout = lastExpandedCard.current;
        const duration = 280;
        const easing = Easing.out(Easing.cubic); // Match expansion easing

        overlayX.value = withTiming(layout.x, { duration, easing });
        overlayY.value = withTiming(layout.y, { duration, easing });
        overlayWidth.value = withTiming(layout.width, { duration, easing });
        overlayHeight.value = withTiming(layout.height, { duration, easing });
        overlayRadius.value = withTiming(16, { duration: duration * 0.7, easing });

        // Clean up after animation
        setTimeout(() => {
          setIsContractingBack(false);
          overlayOpacity.value = 0;
          lastExpandedCard.current = null;
        }, duration + 50);
      }
    }, [expandingStock])
  );

  const handleCardExpand = (stock: Stock, layout: { x: number; y: number; width: number; height: number }) => {
    // Store card position for reverse animation
    lastExpandedCard.current = layout;
    setExpandingStock(stock);

    // Set initial position and size
    overlayX.value = layout.x;
    overlayY.value = layout.y;
    overlayWidth.value = layout.width;
    overlayHeight.value = layout.height;
    overlayRadius.value = 16;
    overlayOpacity.value = 1;

    // Animate to full screen with iOS-style easing (fast, smooth)
    const duration = 280;
    const easing = Easing.out(Easing.cubic);

    overlayX.value = withTiming(0, { duration, easing });
    overlayY.value = withTiming(0, { duration, easing });
    overlayWidth.value = withTiming(SCREEN_WIDTH, { duration, easing });
    overlayHeight.value = withTiming(SCREEN_HEIGHT, { duration, easing });
    overlayRadius.value = withTiming(0, { duration: duration * 0.7, easing });

    // Navigate after expansion (fast)
    setTimeout(() => {
      // Clear overlay immediately to prevent covering stock page
      setExpandingStock(null);
      overlayOpacity.value = 0;

      // Use push to maintain navigation stack for back button
      router.push({
        pathname: '../stock/[symbol]',
        params: {
          symbol: stock.symbol,
          // Pass layout info for reverse animation
          cardX: layout.x.toString(),
          cardY: layout.y.toString(),
          cardWidth: layout.width.toString(),
          cardHeight: layout.height.toString(),
        }
      });
    }, duration);
  };

  return (
    <>
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
          <StockCard item={dummyStocks[0]} onExpand={handleCardExpand} />
          <StockCard item={dummyStocks[1]} onExpand={handleCardExpand} />
        </View>

        <Text style={styles.sectionTitle}>Watch List</Text>
        <View className='flex-row justify-around'>
          <StockCard item={dummyStocks[0]} onExpand={handleCardExpand} />
          <StockCard item={dummyStocks[1]} onExpand={handleCardExpand} />
        </View>
      </SafeAreaView>

      {/* Expansion/Contraction Overlay - positioned outside SafeAreaView to cover navigation bar */}
      {(expandingStock || isContractingBack) && (
        <Animated.View style={[animatedOverlayStyle, { zIndex: 99999 }]} />
      )}
    </>
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
  loadingText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
